import { CircleDollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function Funds() {
  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Financial Management (EdFMS)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track subventions, PTA levies, and disbursements
          </p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
          Record Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-lg border border-slate-700 text-white space-y-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
            <CircleDollarSign size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-300">
              Total Available Balance
            </p>
            <h3 className="text-3xl font-bold tracking-tight mt-1 font-serif">
              ₦ 4,250,000
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ArrowDownRight size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Monthly Inflow
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              ₦ 1,500,000
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <ArrowUpRight size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Monthly Outflow
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              ₦ 845,200
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <br />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          Transaction Ledger Secure
        </h3>
        <p className="text-slate-500 max-w-sm">
          The EdFMS ledger system requires additional authorization pin
          verification to display recent transactions.
        </p>
        <button className="mt-6 px-6 py-2 border-2 border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-sm">
          Authenticate EdFMS
        </button>
      </div>
    </div>
  );
}
