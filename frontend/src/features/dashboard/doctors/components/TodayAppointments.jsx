import React, { useState } from "react";
import Table from "../../../../components/table/Table";
import { useGetPatientQuery } from "../../../patients/patientsApiSlice";

const columns = [
  // {
  //   header: "Patient",
  //   accessor: "image",
  // },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Time",
    accessor: "slotTime",
  },
];

const TodayAppointments = () => {
  const search='unni'
  const { data } = useGetPatientQuery({ page: 1, limit: 100, search });
  console.log(data, "Today appointment");
  const patients = data?.patients

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h1>Today Appointments</h1>
      <Table columns={columns} data={patients}/>
    </div>
  );
};

export default TodayAppointments;
