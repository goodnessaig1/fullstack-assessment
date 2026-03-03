import { useState, useEffect } from "react";
import api from "../../lib/axios";
import { useAuth } from "../../contexts/AuthContext";
import { CreateLeaveModal } from "./components/CreateLeaveModal";
import { DeclineLeaveModal } from "./components/DeclineLeaveModal";
import { LeaveRequestCard } from "./components/LeaveRequestCard";
import type { LeaveRequestItem } from "./components/LeaveRequestCard";

export function LeaveRequests() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState<LeaveRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState<string | null>(null);
  const [declineReason, setDeclineReason] = useState("");
  const [declineError, setDeclineError] = useState("");

  // Modal State for Creating
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const endpoint =
        user?.role === "principal" || user?.role === "admin"
          ? "/leave/all-requests"
          : "/leave/my-requests";

      const response = await api.get(endpoint);
      setLeaves(response.data.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [user]);

  const handleApprove = async (id: string) => {
    try {
      setActionLoading(id);
      await api.put(`/leave/${id}/respond`, { status: "approved" });
      await fetchLeaves();
    } catch (error) {
      console.error("Failed to approve:", error);
      alert("Failed to approve leave request.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeclineSubmit = async () => {
    if (declineReason.trim().length < 5) {
      setDeclineError("Reason must be at least 5 characters long");
      return;
    }

    if (!selectedLeaveId) return;

    try {
      setActionLoading(selectedLeaveId);
      await api.put(`/leave/${selectedLeaveId}/respond`, {
        status: "declined",
        reviewReason: declineReason,
      });
      setShowDeclineModal(false);
      setDeclineReason("");
      setSelectedLeaveId(null);
      await fetchLeaves();
    } catch (error) {
      console.error("Failed to decline:", error);
      setDeclineError("Server error failed to decline. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const openDeclineModal = (id: string) => {
    setSelectedLeaveId(id);
    setDeclineReason("");
    setDeclineError("");
    setShowDeclineModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin text-slate-400 w-8 h-8 border-4 border-slate-200 border-t-slate-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leave Requests</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage staff time-off, sick leaves, and maternity
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#1d5ac3] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#15469b] transition-colors shadow-sm flex items-center gap-2 text-sm"
        >
          + Request Leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaves.map((leave: LeaveRequestItem) => (
          <LeaveRequestCard
            key={leave.id}
            leave={leave}
            userRole={user?.role}
            actionLoading={actionLoading}
            onApprove={handleApprove}
            onDecline={openDeclineModal}
          />
        ))}

        {leaves.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <h3 className="text-lg font-bold text-slate-700">
              No Leave Requests Found
            </h3>
            <p className="text-slate-500">
              There are currently no leave requests in the system.
            </p>
          </div>
        )}
      </div>

      <DeclineLeaveModal
        isOpen={showDeclineModal}
        declineReason={declineReason}
        declineError={declineError}
        actionLoading={actionLoading}
        onReasonChange={setDeclineReason}
        onClose={() => setShowDeclineModal(false)}
        onSubmit={handleDeclineSubmit}
      />

      {showCreateModal && (
        <CreateLeaveModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchLeaves();
          }}
        />
      )}
    </div>
  );
}
