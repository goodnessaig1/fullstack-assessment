import { GraduationCap, UsersRound, Activity, TrendingUp } from "lucide-react";

export function StudentHeadcount() {
  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Student Headcount
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time attendance and enrolment metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <UsersRound size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Total Enrolled
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              1,248
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Present Today
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              1,190
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Average Attendance
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              94.8%
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Weekly Trend</p>
            <h3 className="text-2xl font-bold text-emerald-600 tracking-tight mt-1">
              +2.4%
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <UsersRound size={32} className="text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          Detailed Headcount Charts
        </h3>
        <p className="text-slate-500 max-w-sm">
          Class-by-class visual breakdowns and historical headcount charts are
          currently being generated for today's snapshot.
        </p>
      </div>
    </div>
  );
}
