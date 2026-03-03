import { Package, Monitor, BookOpen, AlertCircle } from "lucide-react";

const assetsData = [
  {
    id: 101,
    tag: "AST-2023-001",
    name: "HP ProBook Laptops",
    category: "Electronics",
    quantity: 45,
    status: "Good",
  },
  {
    id: 102,
    tag: "AST-2023-045",
    name: "Laboratory Microscopes",
    category: "Scientific",
    quantity: 12,
    status: "Needs Repair",
  },
  {
    id: 103,
    tag: "AST-2022-112",
    name: "Student Desks",
    category: "Furniture",
    quantity: 350,
    status: "Good",
  },
  {
    id: 104,
    tag: "AST-2024-003",
    name: "Smart Boards",
    category: "Electronics",
    quantity: 8,
    status: "Excellent",
  },
  {
    id: 105,
    tag: "AST-2021-089",
    name: "Library Books (Science)",
    category: "Educational",
    quantity: 1200,
    status: "Depreciated",
  },
];

export function Assets() {
  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Asset Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track school inventory, electronics, and furnishings
          </p>
        </div>
        <button className="bg-[#1d5ac3] hover:bg-[#15469b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
          <Package size={18} /> Register Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <br />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Total Assets Registered
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              1,615
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Monitor size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Electronics</p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              142
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Educational Materials
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              1,200
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Needs Maintenance
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              12
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">
            Inventory Registry
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
                <th className="px-6 py-4">Asset Tag</th>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Qty</th>
                <th className="px-6 py-4">Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {assetsData.map((asset) => (
                <tr
                  key={asset.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    {asset.tag}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {asset.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{asset.category}</td>
                  <td className="px-6 py-4 text-right font-medium">
                    {asset.quantity}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        asset.status === "Excellent" || asset.status === "Good"
                          ? "bg-emerald-100 text-emerald-700"
                          : asset.status === "Needs Repair"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
