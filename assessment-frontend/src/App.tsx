import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/Layout/DashboardLayout";
import { Profile } from "./pages/Profile/index";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./components/Routing/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

import { StaffAttendance } from "./pages/StaffAttendance";
import { StudentHeadcount } from "./pages/StudentHeadcount";
import { Assets } from "./pages/Assets";
import { Funds } from "./pages/Funds";
import { Infrastructure } from "./pages/Infrastructure";
import { Qualifications } from "./pages/Qualifications";
import { Performance } from "./pages/Performance";
import { LeaveRequests } from "./pages/LeaveRequests";

function AuthRoot() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Root Route Handler */}
        <Route path="/" element={<AuthRoot />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="staff-attendance" element={<StaffAttendance />} />
            <Route path="student-headcount" element={<StudentHeadcount />} />
            <Route path="assets" element={<Assets />} />
            <Route path="funds" element={<Funds />} />
            <Route path="infrastructure" element={<Infrastructure />} />
            <Route path="qualifications" element={<Qualifications />} />
            <Route path="performance" element={<Performance />} />
            <Route path="leave-requests" element={<LeaveRequests />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
