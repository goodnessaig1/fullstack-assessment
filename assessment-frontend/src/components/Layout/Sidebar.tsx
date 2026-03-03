import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  LayoutDashboard,
  ClipboardList,
  UsersRound,
  Package,
  CircleDollarSign,
  Building2,
  GraduationCap,
  BarChart3,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const navGroups = [
    {
      title: "OVERVIEW",
      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
          iconSvg: "⬛️",
        },
        {
          name: "Staff Attendance",
          path: "/dashboard/staff-attendance",
          icon: ClipboardList,
          iconSvg: "📋",
        },
        {
          name: "Student Headcount",
          path: "/dashboard/student-headcount",
          icon: UsersRound,
          iconSvg: "👥",
        },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        {
          name: "Assets",
          path: "/dashboard/assets",
          icon: Package,
          badge: 3,
          iconSvg: "📦",
        },
        {
          name: "Funds (EdFMS)",
          path: "/dashboard/funds",
          icon: CircleDollarSign,
          iconSvg: "💰",
        },
        {
          name: "Infrastructure",
          path: "/dashboard/infrastructure",
          icon: Building2,
          iconSvg: "📐",
        },
      ],
    },
    {
      title: "WORKFORCE",
      items: [
        {
          name: "Qualifications",
          path: "/dashboard/qualifications",
          icon: GraduationCap,
          iconSvg: "🎓",
        },
        {
          name: "Performance",
          path: "/dashboard/performance",
          icon: BarChart3,
          iconSvg: "📊",
        },
        {
          name: "Leave Requests",
          path: "/dashboard/leave-requests",
          icon: CalendarDays,
          iconSvg: "🗓️",
          badge: 2,
        },
      ],
    },
  ];

  return (
    <div className="w-64 bg-[var(--bg-sidebar)] text-white flex flex-col h-full font-sans tracking-wide">
      <div className="pt-8 pb-5 px-6">
        <h1 className="text-2xl font-serif font-extrabold tracking-tight text-white mb-2 shadow-sm">
          School Core
        </h1>
        <div className="inline-flex items-center bg-white/15 px-[10px] py-[3px] rounded-full text-[10px] font-bold tracking-[0.05em] text-[#d6e5ff]">
          Tier 2 <span className="opacity-40 mx-1.5 text-white">•</span>{" "}
          <span className="capitalize">{user?.role}</span>
        </div>
      </div>

      <div className="border-t border-white/10 w-full" />

      <nav className="flex-1 overflow-y-auto pt-6 pb-4 flex flex-col gap-6 custom-scrollbar">
        {navGroups.map((group) => (
          <div key={group.title}>
            <h2 className="px-6 text-[10.5px] uppercase font-bold text-[#89a8de] mb-1.5 tracking-wider">
              {group.title}
            </h2>
            <div className="space-y-[1px] px-3 relative">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      "flex items-center justify-between px-3 py-2.5 text-[13.5px] rounded-lg transition-all relative group",
                      isActive
                        ? "bg-white/10 text-white font-bold"
                        : "text-[#b2c8ed] hover:bg-white/5 hover:text-white font-semibold",
                    )}
                  >
                    <div className="flex items-center">
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[16px] bg-white rounded-r-md shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                      )}

                      {item.iconSvg ? (
                        <div className="mr-2.5 text-[17px]">{item.iconSvg}</div>
                      ) : (
                        <Icon
                          className={clsx(
                            "w-[17px] h-[17px] mr-3.5 transition-colors",
                            isActive
                              ? "text-white fill-black/10"
                              : "text-[#739fdf] group-hover:text-[#a1bdec]",
                          )}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      )}
                      <span className="tracking-wide">{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className="bg-[#f04438] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-md">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-4 w-full">
        <Link to="/dashboard/profile" className="block">
          <div className="bg-white/10 rounded-xl p-[10px] flex items-center gap-3 hover:bg-white/15 cursor-pointer transition-colors border border-white/5 shadow-inner">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-[34px] h-[34px] rounded-full object-cover shrink-0 border border-white/10"
              />
            ) : (
              <div className="w-[34px] h-[34px] rounded-full bg-[#5a8cdf] flex items-center justify-center text-xs font-bold font-sans text-white border border-white/10 shadow-sm leading-none shrink-0">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-white truncate leading-tight tracking-wide">
                {user?.firstName?.[0]}. {user?.lastName}
              </p>
              <p className="text-[11px] text-[#89a8de] font-medium truncate mt-[1px] capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
