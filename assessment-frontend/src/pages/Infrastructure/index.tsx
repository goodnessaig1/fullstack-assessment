import { Building2, Home, Droplets, Zap, Wrench } from "lucide-react";

export function Infrastructure() {
  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Infrastructure Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Classroom conditions, utilities, and maintenance
          </p>
        </div>
        <button className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
          <Wrench size={18} /> Report Issue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Total Buildings
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              8
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Home size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Active Classrooms
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              45
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Droplets size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Water Supply</p>
            <h3 className="text-2xl font-bold text-emerald-600 tracking-tight mt-1">
              Stable
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Power Grid</p>
            <h3 className="text-2xl font-bold text-amber-600 tracking-tight mt-1">
              Generator
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Ongoing Maintenance</h3>
          <div className="space-y-4">
            <div className="p-4 border border-slate-100 rounded-lg bg-slate-50/50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-700 text-sm">
                  Roof Leakage Repair
                </h4>
                <span className="bg-amber-100 text-amber-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                  In Progress
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Block B, Senior Secondary Wing.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">
            Facility Health Score
          </h3>
          <div className="flex items-center justify-center p-8">
            <div className="relative w-32 h-32 rounded-full border-8 border-emerald-100 flex items-center justify-center">
              <span className="text-3xl font-black text-emerald-600">85%</span>
              <svg
                className="absolute inset-0 w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-emerald-500"
                  strokeDasharray="289"
                  strokeDashoffset="43"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
