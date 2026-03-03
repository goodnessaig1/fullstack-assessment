import { Plus, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileDetails } from "./components/ProfileDetails";
import { UpdateProfileForm } from "./components/UpdateProfileForm";
import { SecuritySection } from "./components/SecuritySection";

export function Profile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          {user.role === "principal" && (
            <button className="flex items-center gap-2 bg-[#1d5ac3] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#15469b] transition-all shadow-sm">
              <Plus size={18} />
              Create User
            </button>
          )}
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-100 transition-all border border-red-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <ProfileDetails user={user} />
        <UpdateProfileForm user={user} />
      </div>

      <SecuritySection />
    </div>
  );
}
