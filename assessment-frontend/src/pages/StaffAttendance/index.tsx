import { Users, UserX, Clock, MapPin } from "lucide-react";

const attendanceData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Head Teacher",
    status: "Present",
    timeIn: "07:45 AM",
    department: "Administration",
  },
  {
    id: 2,
    name: "Mr. David Smith",
    role: "Math Teacher",
    status: "Late",
    timeIn: "08:15 AM",
    department: "Sciences",
  },
  {
    id: 3,
    name: "Mrs. Emily Davis",
    role: "English Teacher",
    status: "Present",
    timeIn: "07:50 AM",
    department: "Arts",
  },
  {
    id: 4,
    name: "Mr. James Wilson",
    role: "PE Teacher",
    status: "Absent",
    timeIn: "--",
    department: "Physical Ed",
  },
  {
    id: 5,
    name: "Ms. Lisa Anderson",
    role: "Librarian",
    status: "Present",
    timeIn: "07:55 AM",
    department: "Support Staff",
  },
];

export function StaffAttendance() {
  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Staff Attendance
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Daily monitoring of teaching and non-teaching staff
          </p>
        </div>
        <button className="bg-[#1d5ac3] hover:bg-[#15469b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Users size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Total Staff</p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              42
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Present Today
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              38
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <UserX size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Absent</p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              2
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Late Arrivals
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
              2
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Today's Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time In</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {attendanceData.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {record.name}
                    <div className="text-xs text-slate-500 font-normal mt-0.5">
                      {record.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {record.department}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        record.status === "Present"
                          ? "bg-emerald-100 text-emerald-700"
                          : record.status === "Late"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {record.timeIn}
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
