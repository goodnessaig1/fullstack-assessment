import { Loader2 } from "lucide-react";

interface DeclineLeaveModalProps {
  isOpen: boolean;
  declineReason: string;
  declineError: string;
  actionLoading: string | null;
  onReasonChange: (reason: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function DeclineLeaveModal({
  isOpen,
  declineReason,
  declineError,
  actionLoading,
  onReasonChange,
  onClose,
  onSubmit,
}: DeclineLeaveModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Decline Leave Request
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Please provide a reason for declining this leave request. This will be
          visible to the staff member.
        </p>

        <textarea
          value={declineReason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder="Reason for rejection (min 5 characters)..."
          className={`w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500/20 text-sm ${
            declineError
              ? "border-red-400 focus:border-red-500"
              : "border-slate-300 focus:border-slate-400"
          }`}
        />

        {declineError && (
          <p className="text-xs text-red-500 mt-1 font-medium">
            {declineError}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!!actionLoading}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {actionLoading && <Loader2 size={16} className="animate-spin" />}
            Confirm Decline
          </button>
        </div>
      </div>
    </div>
  );
}
