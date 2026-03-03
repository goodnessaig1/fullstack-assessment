import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useMemo } from "react";

export function DashboardLayout() {
  const location = useLocation();

  const { title, subtitle } = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return {
          title: "Principal Dashboard",
          subtitle: "Govt. Secondary School, Maitama — FCT",
        };
      case "/staff-attendance":
        return {
          title: "Staff Attendance",
          subtitle: "Overview of all teaching and non-teaching staff",
        };
      case "/student-headcount":
        return {
          title: "Student Headcount",
          subtitle: "Daily attendance and enrolment metrics",
        };
      case "/assets":
        return { title: "Assets", subtitle: "School inventory and management" };
      case "/funds":
        return {
          title: "Funds (EdFMS)",
          subtitle: "Financial records and disbursements",
        };
      case "/profile":
        return {
          title: "User Profile",
          subtitle: "Manage your personal information",
        };
      case "/settings":
        return {
          title: "Settings",
          subtitle: "Application preferences and configurations",
        };
      default:
        return {
          title: "Dashboard",
          subtitle: "Govt. Secondary School, Maitama — FCT",
        };
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-[var(--bg-main)] overflow-hidden font-sans">
      <div className="hidden md:flex md:flex-shrink-0 shadow-xl z-20">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Topbar title={title} subtitle={subtitle} />

        <main className="flex-1 relative z-0 overflow-y-auto outline-none custom-scrollbar">
          <div className="py-8 px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
