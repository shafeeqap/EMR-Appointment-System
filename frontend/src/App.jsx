import "./App.css";
import Login from "./features/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthRestore from "./hooks/useAuthRestore";
import Dashboard from "./pages/Dashboard";
import Booking from "./features/appointments/Booking";
import Patients from "./features/patients/Patients";
import DashboardLayout from "./layouts/DashboardLayout";
import Loader from "./components/ui/Loader";
import Doctors from "./features/dashboard/doctors/Doctors";
import Scheduler from "./features/appointments/Scheduler";
import GlobalModal from "./components/modal/GlobalModal";
import Users from "./features/users/Users";
import NotFound from "./pages/NotFound";
import Departments from "./features/departments/Departments";
import Profile from "./pages/Profile";
import LeaveManagement from "./features/leave/LeaveManagement";
import LeaveRequest from "./features/leave/LeaveRequest";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const isLoading = useAuthRestore();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route
                element={<ProtectedRoute allowedRoles={["super_admin"]} />}
              >
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/leaveManagement" element={<LeaveManagement />} />
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["super_admin", "doctor", "receptionist"]}
                  />
                }
              >
                <Route path="/patient" element={<Patients />} />
                <Route path="/appointments" element={<Booking />} />
                <Route path="/shedules" element={<Scheduler />} />
                <Route path="/users" element={<Users />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaveRequest" element={<LeaveRequest />} />
              </Route>
            </Route>
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
        <GlobalModal />
      </BrowserRouter>
    </>
  );
}

export default App;
