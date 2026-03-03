import { GraduationCap, Award, BookOpenCheck } from "lucide-react";

export function Qualifications() {
  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Staff Qualifications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verify credentials, certifications, and academic degrees
          </p>
        </div>
        <button className="bg-[#1d5ac3] hover:bg-[#15469b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors">
          Audit Credentials
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Degree Holders
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              100%
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Award size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Master's / Ph.D.
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              35%
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <BookOpenCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              TRCN Certified
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              92%
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">
            Recent Certificate Uploads
          </h3>
        </div>
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Award size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            No pending verifications
          </h3>
          <p className="text-slate-500 max-w-sm text-sm">
            All uploaded staff credentials and TRCN certificates have been
            verified by the administration board.
          </p>
        </div>
      </div>
    </div>
  );
}
