import { useState } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { LoaderCircle, X, KeyRound } from "lucide-react";
import axiosInstance from "../../../lib/axios";
import { useAuth } from "../../../contexts/AuthContext";

interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function SecuritySection() {
  const { logout } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleChangePassword = async (
    values: PasswordFormValues,
    {
      setSubmitting,
      resetForm,
      setFieldError,
    }: FormikHelpers<PasswordFormValues>,
  ) => {
    setPasswordSuccessMsg("");
    setPasswordErrorMsg("");
    try {
      await axiosInstance.put("/auth/change-password", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      setPasswordSuccessMsg(
        "Password updated successfully! Logging you out...",
      );
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        resetForm();
        setPasswordSuccessMsg("");
        logout();
      }, 1500);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      const message = err.response?.data?.error || "Failed to update password";

      if (message.includes("Incorrect password")) {
        setFieldError("oldPassword", message);
      } else {
        setPasswordErrorMsg(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
            Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-semibold text-slate-700">Change Password</h4>
              <p className="text-sm text-slate-500 mt-1">
                Ensure your account is using a long, random password to stay
                secure.
              </p>
            </div>
            <div className="col-span-1 flex items-center md:justify-end">
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="px-6 py-2 border-2 border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-sm w-full md:w-auto"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPasswordModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <KeyRound size={20} />
                  </div>
                  <h3 className="text-lg font-bold">Change Password</h3>
                </div>
                <button
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setPasswordSuccessMsg("");
                    setPasswordErrorMsg("");
                  }}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {passwordSuccessMsg && (
                  <div className="mb-5 p-3.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {passwordSuccessMsg}
                  </div>
                )}
                {passwordErrorMsg && (
                  <div className="mb-5 p-3.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100">
                    {passwordErrorMsg}
                  </div>
                )}

                <Formik
                  initialValues={{
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  validationSchema={passwordSchema}
                  onSubmit={handleChangePassword}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">
                          Current Password
                        </label>
                        <Field
                          type="password"
                          name="oldPassword"
                          placeholder="Enter current password"
                          className="text-gray-500 w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] transition-all bg-slate-50 focus:bg-white"
                        />
                        <ErrorMessage
                          name="oldPassword"
                          component="p"
                          className="text-red-500 text-[11px] mt-1 font-semibold uppercase tracking-wide"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">
                          New Password
                        </label>
                        <Field
                          type="password"
                          name="newPassword"
                          placeholder="Min. 6 characters"
                          className="text-gray-500 w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] transition-all bg-slate-50 focus:bg-white"
                        />
                        <ErrorMessage
                          name="newPassword"
                          component="p"
                          className="text-red-500 text-[11px] mt-1 font-semibold uppercase tracking-wide"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">
                          Confirm New Password
                        </label>
                        <Field
                          type="password"
                          name="confirmPassword"
                          placeholder="Re-enter new password"
                          className="text-gray-500 w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] transition-all bg-slate-50 focus:bg-white"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="p"
                          className="text-red-500 text-[11px] mt-1 font-semibold uppercase tracking-wide"
                        />
                      </div>

                      <div className="pt-4 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setIsPasswordModalOpen(false);
                            setPasswordSuccessMsg("");
                            setPasswordErrorMsg("");
                          }}
                          className="px-5 py-2.5 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex items-center justify-center min-w-[140px] px-5 py-2.5 bg-[#1d5ac3] text-white font-bold rounded-lg hover:bg-[#15469b] transition-all disabled:opacity-70 shadow-sm"
                        >
                          {isSubmitting ? (
                            <LoaderCircle className="animate-spin" size={18} />
                          ) : (
                            "Update Password"
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
