import { BarChart3, TrendingUp, Target, Users } from "lucide-react";

export function Performance() {
  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Teacher Performance
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Academic results, evaluations, and KPI metrics
          </p>
        </div>
        <button className="bg-[#1d5ac3] hover:bg-[#15469b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors">
          Start Evaluation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <BarChart3 size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              School Avg Score
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              78.4%
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Target size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">KPI Met</p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              32 / 45
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Syllabus Coverage
            </p>
            <h3 className="text-2xl font-bold text-emerald-600 tracking-tight mt-1">
              82%
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <Users size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Evaluations Done
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              100%
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-6">
        <h3 className="font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
          Top Performing Departments
        </h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1.5 font-medium text-sm">
              <span className="text-slate-700">
                Sciences (Physics, Chem, Bio)
              </span>
              <span className="text-slate-900 font-bold">92%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 font-medium text-sm">
              <span className="text-slate-700">Social Sciences</span>
              <span className="text-slate-900 font-bold">88%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: "88%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 font-medium text-sm">
              <span className="text-slate-700">Languages</span>
              <span className="text-slate-900 font-bold">85%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
