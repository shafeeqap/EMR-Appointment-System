import React from "react";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import { statusCardItems, statusData } from "./config/doctor.config";
import { StatusCard, ChartWrapper, ProfileCard } from "../components/index";
import DailyAppointmentsTimelineChart from "./charts/DailyAppointmentsTimelineChart";
import RevenueOverview from "./charts/PatientSummary";
import { useGetDoctorDashboardDataQuery } from "./doctorsApiSlice";
import TodayAppointments from "./components/TodayAppointments";
import NextPatient from "./components/NextPatient";

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const fullName = getFullName(user);

  const { data } = useGetDoctorDashboardDataQuery({ id: user._id });
  console.log(data, "Dashboard data...");

  const appointmentsByDay = data?.data?.charts?.appointmentsByDay;

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

      <div className="text-center mt-5 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ChartWrapper
          title="Daily Appointments Timeline"
          data={appointmentsByDay}
        >
          <DailyAppointmentsTimelineChart data={appointmentsByDay} />
        </ChartWrapper>

        {/* <ChartWrapper title="Patient Summary" data={statusData}>
          <RevenueOverview />
        </ChartWrapper> */}

        {/* </div>

<div className="text-center mt-5 w-full flex flex-col gap-4"> */}

        <TodayAppointments />

        <NextPatient />
      </div>
    </>
  );
};

export default DoctorDashboard;
