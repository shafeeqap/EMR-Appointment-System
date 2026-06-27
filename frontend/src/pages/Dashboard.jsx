import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/ui/Loader";
import SuperAdminDashboard from "../features/dashboard/superAdmin/SuperAdminDashboard";
import DoctorDashboard from "../features/dashboard/doctors/DoctorDashboard";
import ReceptionistDashboard from "../features/dashboard/receptionist/ReceptionistDashboard";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="p-6">
        <Loader />
      </div>
    );
  }

  switch (user.role) {
    case "super_admin":
      return <SuperAdminDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "receptionist":
      return <ReceptionistDashboard />;
    default:
      return <div className="p-6">Unauthorized</div>;
  }
};

export default Dashboard;
