import React from "react";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import { ChartWrapper, ProfileCard, StatusCard } from "../components/index.js";
import {
  receptionistData,
  statusCardItems,
} from "./config/receptionist.config.js";
import TodayAppointment from "./charts/TodayAppointment.jsx";
import DoctorAvailability from "./charts/DoctorAvailability.jsx";

const ReceptionistDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const fullName = getFullName(user);

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <ProfileCard fullName={fullName} />
      <StatusCard statusCardItems={statusCardItems} />

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Appointment Status" data={"3"}>
          <TodayAppointment />
        </ChartWrapper>
      </div>

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Doctor Availability" data={"5"}>
          <DoctorAvailability data={receptionistData} />
        </ChartWrapper>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
