import React from "react";
import { StatusCard, ProfileCard } from "../components/index.js";
import { statusCardItems } from "./config/superAdmin.config";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import ChartWrapper from "../components/ChartWrapper";
import AppointmentTrends from "./charts/AppointmentTrends";
import { useGetAdminDashboardDataQuery } from "./adminDashboardApiSlice.js";
import PatientStatus from "./charts/PatientStatus.jsx";

const SuperAdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user, "User on admin...");

  const { data } = useGetAdminDashboardDataQuery();
  console.log(data, "data...");

  const appointmentsByMonth = data?.data?.charts?.appointmentsByMonth;

  const fullName = getFullName(user);

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <ProfileCard fullName={fullName} />
      <StatusCard statusCardItems={statusCardItems} role={user.role} />

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Appointment Trends" data={appointmentsByMonth}>
          <AppointmentTrends data={appointmentsByMonth} />
        </ChartWrapper>
      </div>

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Patient Status" data={'5'}>
          <PatientStatus />
        </ChartWrapper>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
