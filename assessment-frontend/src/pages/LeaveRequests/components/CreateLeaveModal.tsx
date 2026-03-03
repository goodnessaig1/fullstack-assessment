import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import api from "../../../lib/axios";

export type LeaveType =
  | "sick"
  | "annual"
  | "maternity"
  | "paternity"
  | "unpaid"
  | "other";

interface CreateLeaveModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateLeaveModal({
  onClose,
  onSuccess,
}: CreateLeaveModalProps) {
  const [createData, setCreateData] = useState({
    leaveType: "sick" as LeaveType,
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [createError, setCreateError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");

    if (!createData.startDate || !createData.endDate) {
      setCreateError("Please select both start and end dates.");
      return;
    }

    if (new Date(createData.endDate) < new Date(createData.startDate)) {
      setCreateError("End date cannot be earlier than start date.");
      return;
    }

    if (createData.reason.trim().length < 5) {
      setCreateError("Reason must be at least 5 characters long.");
      return;
    }

    try {
      setCreateLoading(true);
      await api.post("/leave", createData);
      onSuccess();
    } catch (error: any) {
      console.error("Failed to create leave request:", error);
      setCreateError(
        error.response?.data?.error || "Failed to submit request.",
      );
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Request Time Off
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Submit a new leave request for approval.
        </p>

        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Leave Type
            </label>
            <select
              value={createData.leaveType}
              onChange={(e) =>
                setCreateData({
                  ...createData,
                  leaveType: e.target.value as LeaveType,
                })
              }
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] text-sm capitalize"
            >
              <option value="sick">Sick</option>
              <option value="annual">Annual</option>
              <option value="maternity">Maternity</option>
              <option value="paternity">Paternity</option>
              <option value="unpaid">Unpaid</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={createData.startDate}
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    startDate: e.target.value,
                  })
                }
                required
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={createData.endDate}
                onChange={(e) =>
                  setCreateData({ ...createData, endDate: e.target.value })
                }
                required
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Reason
            </label>
            <textarea
              value={createData.reason}
              onChange={(e) =>
                setCreateData({ ...createData, reason: e.target.value })
              }
              placeholder="Min 5 characters..."
              required
              className="w-full h-24 p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1d5ac3]/20 focus:border-[#1d5ac3] text-sm"
            />
          </div>

          {createError && (
            <p className="text-xs text-red-500 font-medium">{createError}</p>
          )}

          <div className="flex justify-end gap-3 mt-6 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createLoading}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#1d5ac3] hover:bg-[#15469b] rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {createLoading && <Loader2 size={16} className="animate-spin" />}
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
