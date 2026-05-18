import React from "react";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import { statusCardItems } from "./config/doctor.config";
import { StatusCard, ChartWrapper, ProfileCard } from "../components/index";
import DailyAppointmentsTimelineChart from "./charts/DailyAppointmentsTimelineChart";
import { useGetDoctorDashboardDataQuery } from "./doctorsApiSlice";
import TodayAppointments from "./components/TodayAppointments";
import NextPatient from "./components/NextPatient";

const statusPriority = {
  ongoing: 1,
  waiting: 2,
  arrived: 3,
  completed: 4,
};

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const fullName = getFullName(user);

  const { data } = useGetDoctorDashboardDataQuery({ id: user._id });
  // console.log(data, "Dashboard data...");

  const appointmentsByDay = data?.data?.charts?.appointmentsByDay;
  const todaysAppointmentsList =
    data?.data?.stats?.todaysAppointmentsList || [];

  const sortedAppointments = [...todaysAppointmentsList].sort((a, b) => {
    return statusPriority[a.status] - statusPriority[b.status];
  });

  const nextData = sortedAppointments[1];

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <ProfileCard fullName={fullName} />

        <StatusCard
          statusCardItems={statusCardItems}
          role={user.role}
          data={data}
        />
      </div>

      <div className="text-center mt-5 w-full grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
        <ChartWrapper
          title="Daily Appointments Timeline"
          data={appointmentsByDay}
        >
          <DailyAppointmentsTimelineChart data={appointmentsByDay} />
        </ChartWrapper>

        <TodayAppointments data={sortedAppointments} />

        <NextPatient nextData={nextData} />
      </div>
    </>
  );
};

export default DoctorDashboard;
