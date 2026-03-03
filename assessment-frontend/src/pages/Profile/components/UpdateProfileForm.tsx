import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { Camera, LoaderCircle } from "lucide-react";
import axiosInstance from "../../../lib/axios";

export interface UserProfile {
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  profilePicture?: string | null;
}

interface UpdateProfileFormProps {
  user: UserProfile;
}

interface UpdateFormValues {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  profilePicture: File | null;
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const updateSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().min(2, "Too short").required("Required"),
    lastName: Yup.string().min(2, "Too short").required("Required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
  });

  const handleUpdate = async (
    values: UpdateFormValues,
    { setSubmitting }: FormikHelpers<UpdateFormValues>,
  ) => {
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("gender", values.gender);
      formData.append("dateOfBirth", values.dateOfBirth);

      if (values.profilePicture instanceof File) {
        formData.append("profilePicture", values.profilePicture);
      }

      await axiosInstance.put("/auth/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg("Profile updated successfully! Refreshing...");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      setErrorMsg(err.response?.data?.error || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-slate-50/50">
      <h3 className="text-lg font-bold text-slate-800 mb-6">
        Update Information
      </h3>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100">
          {errorMsg}
        </div>
      )}

      <Formik
        initialValues={
          {
            title: user.title || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            gender: user.gender || "",
            dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
            profilePicture: null,
          } as UpdateFormValues
        }
        validationSchema={updateSchema}
        onSubmit={handleUpdate}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Title
                </label>
                <Field
                  as="select"
                  name="title"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] transition-all bg-white text-slate-700 disabled:opacity-50 appearance-none"
                >
                  <option value="">Select Title</option>
                  <option value="mr">Mr.</option>
                  <option value="mrs">Mrs.</option>
                  <option value="miss">Miss.</option>
                  <option value="ms">Ms.</option>
                </Field>
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Gender
                </label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] transition-all bg-white text-slate-700 disabled:opacity-50 appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="p"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] transition-all"
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] transition-all"
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Date of Birth
                </label>
                <Field
                  type="date"
                  name="dateOfBirth"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] transition-all"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="p"
                  className="text-red-500 text-xs mt-1 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Profile Picture
                </label>
                <div
                  className="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-600 font-medium">
                    {values.profilePicture
                      ? values.profilePicture.name
                      : "Click to upload a new picture"}
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFieldValue("profilePicture", e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full md:w-auto px-8 py-2.5 bg-[#1d5ac3] text-white font-bold rounded-lg hover:bg-[#15469b] transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" size={18} />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
