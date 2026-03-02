import { AlertItem } from "../../components/ui/AlertItem";

const Alerts = () => {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col h-[650px] lg:h-auto">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900 tracking-tight">
          Alerts & Actions
        </h2>
        <button className="text-[13px] font-semibold text-[#1d6cc2] hover:text-[#113a84] transition-colors">
          All alerts
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          <AlertItem
            type="danger"
            title="Low Stock:"
            text="Exercise books — 12 classes need restock"
            meta="Asset Management · 2 hrs ago"
            hasBorder={true}
          />
          <AlertItem
            type="warning"
            title="Leave Pending:"
            text="Mr. Okafor (Biology) — 3-day medical leave"
            meta="HR · Awaiting approval"
            hasBorder={true}
          />
          <AlertItem
            type="warning"
            title="Headcount Gap:"
            text="JS3C reports 9 students absent today"
            meta="Student Attendance · This morning"
            hasBorder={true}
          />
          <AlertItem
            type="success"
            title="Fund Received:"
            text="₦480,000 Q1 state disbursement"
            meta="Funds (EdFMS) · Yesterday"
            hasBorder={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Alerts;
