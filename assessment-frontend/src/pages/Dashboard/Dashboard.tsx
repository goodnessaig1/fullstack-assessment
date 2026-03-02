import { ArrowUp } from "lucide-react";
import { StatCard } from "../../components/ui/StatCard";
import { ProgressBar } from "../../components/ui/ProgressBar";
import Alerts from "./Alerts";

export function Dashboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = today.getHours();
  let greeting = "Good Evening";
  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          {greeting}, Mrs. Peterside <span className="text-3xl">👋</span>
        </h1>
        <p className="text-sm font-medium text-[#889db1] mt-1 flex items-center">
          {formattedDate}
          <span className="mx-1">•</span>Week 6 of Term 2
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="TEACHING STAFF PRESENT"
          value="32"
          highlightText={
            <>
              <ArrowUp className="w-3 h-3 mr-1" strokeWidth={3} />
              94% of 34 teachers
            </>
          }
          highlightColorClass="text-green-600"
          barColorClass="bg-[#4e7dd4]"
          iconSvg={<>👩‍🏫</>}
        />

        <StatCard
          title="NON-TEACHING STAFF"
          value="6"
          highlightText={
            <>
              <ArrowUp className="w-3 h-3 mr-1" strokeWidth={3} />
              100% of 6 staff
            </>
          }
          highlightColorClass="text-green-600"
          barColorClass="bg-[#4ade80]"
          iconSvg={<>🧹</>}
        />

        <StatCard
          title="STUDENTS — TODAY"
          value="1,183"
          highlightText="95% of 1,240 enrolled"
          highlightColorClass="text-gray-600"
          barColorClass="bg-[#f59e0b]"
          iconSvg={<>🎓</>}
        />

        <StatCard
          title="PENDING ACTIONS"
          value="5"
          highlightText="2 leave · 3 asset alerts"
          highlightColorClass="text-red-600"
          barColorClass="bg-[#ef4444]"
          iconSvg={<>⚠️</>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Staff Attendance — Teaching & Non-Teaching
            </h2>
            <button className="text-[13px] font-semibold text-[#1d6cc2]  hover:text-[#113a84] transition-colors flex items-center">
              View full log <span className="ml-1 text-lg leading-none">→</span>
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="h-44 flex items-end justify-between gap-1 border-b border-gray-200 pb-3 relative">
              {[
                { label: "Mon", height: "65%", active: false },
                { label: "Tue", height: "80%", active: false },
                { label: "Wed", height: "70%", active: false },
                { label: "Thu", height: "60%", active: false },
                { label: "Today", height: "100%", active: true },
              ].map((bar, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col justify-end items-center gap-2 h-full group cursor-pointer"
                >
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${bar.active ? "bg-[#1b76d2]" : "bg-[#bbdffb] group-hover:bg-[#a6d5fa]"}`}
                    style={{ height: bar.height }}
                  />
                  <span
                    className={`text-[12px] font-bold ${bar.active ? "text-[#1874d3]" : "text-[#889db1]"}`}
                  >
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-4">
                  TEACHING STAFF
                </h3>
                <div className="space-y-4">
                  <ProgressBar
                    label="Sciences"
                    percentage={96}
                    colorClass="bg-[#22c55e]"
                  />
                  <ProgressBar
                    label="Arts & Humanities"
                    percentage={91}
                    colorClass="bg-[#3b82f6]"
                  />
                  <ProgressBar
                    label="Mathematics"
                    percentage={88}
                    colorClass="bg-[#3b82f6]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-4">
                  NON-TEACHING STAFF
                </h3>
                <div className="space-y-4">
                  <ProgressBar
                    label="Admin / Clerical"
                    percentage={100}
                    colorClass="bg-[#22c55e]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Alerts />
      </div>
    </div>
  );
}
