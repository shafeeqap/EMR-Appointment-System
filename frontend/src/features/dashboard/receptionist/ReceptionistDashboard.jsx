import React from "react";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";
import { ChartWrapper, ProfileCard, StatusCard } from "../components/index.js";
import { statusCardItems } from "./config/receptionist.config.js";
import TodayAppointmentDistribution from "./charts/TodayAppointmentDistribution.jsx";
import DoctorWorkload from "./charts/DoctorWorkload.jsx";
import { useGetReceptionistDashboardQuery } from "./receptionistApiSlice.js";

const ReceptionistDashboard = () => {
  const { user } = useSelector((state) => state.auth);


  const fullName = getFullName(user);

  const { data } = useGetReceptionistDashboardQuery();

  console.log(data, "Receptionist data...");

  const deptAppointmentDistribution =
    data?.data?.charts?.departmentAppointmentDistribution || [];

  const doctorWorkload = data?.data?.charts?.doctorWorkload || [];

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
      <ProfileCard fullName={fullName} />
      <StatusCard statusCardItems={statusCardItems} data={data} />

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Department Appointment Distribution" data={"3"}>
          <TodayAppointmentDistribution data={deptAppointmentDistribution} />
        </ChartWrapper>
      </div>

      <div className="text-center mt-5 w-full">
        <ChartWrapper title="Doctor Workload" data={"5"}>
          <DoctorWorkload data={doctorWorkload} />
        </ChartWrapper>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
