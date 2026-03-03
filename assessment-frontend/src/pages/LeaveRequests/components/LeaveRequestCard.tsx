import { format, parseISO } from "date-fns";
import { CalendarDays, CheckCircle2, Loader2, XCircle } from "lucide-react";
import type { LeaveType } from "./CreateLeaveModal";

type LeaveStatus = "pending" | "approved" | "declined";

export interface LeaveRequestItem {
  id: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  reviewer?: {
    firstName: string;
    lastName: string;
  };
  reviewReason?: string;
}

interface LeaveRequestCardProps {
  leave: LeaveRequestItem;
  userRole?: string;
  actionLoading: string | null;
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
}

export function LeaveRequestCard({
  leave,
  userRole,
  actionLoading,
  onApprove,
  onDecline,
}: LeaveRequestCardProps) {
  const isPending = leave.status === "pending";
  const isApproved = leave.status === "approved";
  const isDeclined = leave.status === "declined";

  const start = new Date(leave.startDate);
  const end = new Date(leave.endDate);
  const diffDays =
    Math.ceil(
      Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col h-full relative overflow-hidden transition-all ${
        !isPending ? "bg-slate-50/50 opacity-90" : ""
      }`}
    >
      <div
        className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full -z-0 ${
          isPending ? "bg-amber-50" : isApproved ? "bg-emerald-50" : "bg-red-50"
        }`}
      ></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="font-bold text-slate-800 capitalize">
            {leave.leaveType} Leave
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Submitted {format(parseISO(leave.createdAt), "MMM d, yyyy")}
          </p>
        </div>

        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
            isPending
              ? "bg-amber-100 text-amber-700"
              : isApproved
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {isApproved && <CheckCircle2 size={12} />}
          {isDeclined && <XCircle size={12} />}
          {leave.status}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
          {leave.user?.firstName?.[0] || ""}
          {leave.user?.lastName?.[0] || ""}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">
            {leave.user?.firstName} {leave.user?.lastName}
          </p>
          <p className="text-xs text-slate-500 capitalize">
            {leave.user?.role}
          </p>
        </div>
      </div>

      <div
        className={`text-sm text-slate-600 p-3 rounded-lg flex-1 mb-4 ${
          isPending ? "bg-slate-50" : "bg-white border border-slate-100"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays size={16} className="text-slate-400" />
          <span className="font-medium">
            {format(start, "MMM d")} - {format(end, "MMM d, yyyy")} ({diffDays}{" "}
            Days)
          </span>
        </div>
        <p className="text-xs text-slate-600 italic border-l-2 border-slate-200 pl-2">
          "{leave.reason}"
        </p>

        {!isPending && (
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-500">
              Reviewed by: {leave.reviewer?.firstName}{" "}
              {leave.reviewer?.lastName}
            </span>
            {leave.reviewReason && (
              <p className="text-slate-700 mt-1 font-medium bg-slate-50 p-2 rounded">
                Note: {leave.reviewReason}
              </p>
            )}
          </div>
        )}
      </div>

      {isPending && (userRole === "principal" || userRole === "admin") && (
        <div className="flex gap-2 w-full mt-auto">
          <button
            onClick={() => onDecline(leave.id)}
            disabled={actionLoading === leave.id}
            className="flex-1 bg-white border border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-100 font-semibold py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            Decline
          </button>
          <button
            onClick={() => onApprove(leave.id)}
            disabled={actionLoading === leave.id}
            className="flex-1 bg-[#1d5ac3] text-white hover:bg-[#15469b] font-semibold py-2 rounded-lg text-sm transition-colors shadow-sm flex justify-center items-center disabled:opacity-50"
          >
            {actionLoading === leave.id ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Approve"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
