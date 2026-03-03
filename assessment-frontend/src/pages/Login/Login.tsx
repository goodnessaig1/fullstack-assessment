import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../lib/axios";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setGlobalError(null);
      try {
        const response = await api.post("/auth/login", values);
        if (response.data.status === "success") {
          login(response.data.token);
          navigate("/");
        } else {
          setGlobalError(response.data.error || "Login failed");
        }
      } catch (error: any) {
        const message =
          error.response?.data?.error || "Server error. Please try again.";
        if (message.includes("Incorrect password")) {
          setFieldError("password", message);
        } else if (message.includes("Account does not exist")) {
          setFieldError("email", message);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-[#1b76d2] mb-2">
            School Portal
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Sign in to your account to continue
          </p>
        </div>

        {globalError && (
          <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-100 flex items-start gap-3">
            <span className="text-red-500 mt-0.5">⚠️</span>
            <p className="text-[13px] font-medium text-red-700">
              {globalError}
            </p>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-4 py-3 text-gray-500 rounded-lg border bg-gray-50 text-sm outline-none transition-all ${
                formik.touched.email && formik.errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-[#1b76d2] focus:ring-4 focus:ring-blue-50 focus:bg-white"
              }`}
              placeholder="name@school.edu"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="mt-1.5 text-xs font-semibold text-red-500">
                {formik.errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-4 py-3 text-gray-500 rounded-lg border bg-gray-50 text-sm outline-none transition-all ${
                formik.touched.password && formik.errors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-[#1b76d2] focus:ring-4 focus:ring-blue-50 focus:bg-white"
              }`}
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="mt-1.5 text-xs font-semibold text-red-500">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full py-3.5 px-4 bg-[#1b76d2] hover:bg-[#115091] active:bg-[#0b3b6e] text-white font-bold text-sm tracking-wide rounded-lg transition-colors flex justify-center items-center shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "SECURE LOGIN"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
