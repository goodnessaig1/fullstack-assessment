interface UserProfile {
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  role?: string;
  email?: string;
  status?: string;
  createdAt?: string;
  profilePicture?: string | null;
}

interface ProfileDetailsProps {
  user: UserProfile;
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
  const getInitials = () => {
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-center md:items-start relative">
      <div className="relative">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-slate-100 shadow-sm"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#1d5ac3] to-[#5a8cdf] flex items-center justify-center text-white text-4xl font-bold shadow-sm border-4 border-slate-100">
            {getInitials()}
          </div>
        )}
      </div>

      <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          <span className="capitalize">{user.title}</span>. {user.firstName}{" "}
          {user.lastName}
        </h2>
        <p className="text-[#1d5ac3] font-semibold text-sm mt-1 uppercase tracking-wider">
          {user.role}
        </p>

        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500">
          <div className="flex flex-col">
            <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">
              Email Address
            </span>
            <span className="text-slate-700 font-medium">{user.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">
              Status
            </span>
            <span className="text-emerald-600 font-bold capitalize">
              {user.status}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">
              Joined
            </span>
            <span className="text-slate-700 font-medium">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
