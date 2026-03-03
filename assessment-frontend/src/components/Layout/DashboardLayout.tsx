import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useMemo, useState } from "react";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile sliding */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 flex-shrink-0 shadow-xl`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Topbar
          title={title}
          subtitle={subtitle}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1 relative z-0 overflow-y-auto outline-none custom-scrollbar pb-10">
          <div className="md:py-8 md:px-8 py-4 px-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
