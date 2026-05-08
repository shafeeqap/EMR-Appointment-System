import React from "react";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import {
  appointmentTimelineData,
  statusCardItems,
  statusData,
} from "./config/doctor.config";
import { StatusCard, ChartWrapper, ProfileCard } from "../components/index";
import DailyAppointmentsTimelineChart from "./charts/DailyAppointmentsTimelineChart";
import PatientStatus from "./charts/PatientStatus";
import { useGetDashboardDataQuery } from "../adminDashboardApiSlice";

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const fullName = getFullName(user);
  console.log(user, "User...");

  const { data } = useGetDashboardDataQuery();
  console.log(data, "Dashboard data...");

  const appointmentsByDay = data?.data?.charts?.appointmentsByDay;

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <ProfileCard fullName={fullName} />
      <StatusCard statusCardItems={statusCardItems} role={user.role} />

      <div className="text-center mt-5 w-full">
        <ChartWrapper
          title="Daily Appointments Timeline"
          data={appointmentsByDay}
        >
          <DailyAppointmentsTimelineChart data={appointmentsByDay} />
        </ChartWrapper>
      </div>

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Patient Status" data={statusData}>
          <PatientStatus statusData={statusData} />
        </ChartWrapper>
      </div>
    </div>
  );
};

export default DoctorDashboard;
