import React from "react";
import Table from "../../../../components/table/Table";
import { useGetPatientQuery } from "../../../patients/patientsApiSlice";

const getAppointmentColumns = () => [
  {
    header: "Name/diagnosis",
    accessor: "name",
    description: "notes",
  },
  {
    header: "Age",
    accessor: "age",
  },
  {
    header: "Time",
    render: (row) => {
      return (
        <span
          onClick={""}
          className="border border-gray-300 px-2 py-2 rounded cursor-pointer hover:bg-gray-300"
        >
          {row.slotTime ? (
            row.slotTime
          ) : (
            <span onClick={""} className="border border-gray-300">
              On Going
            </span>
          )}
        </span>
      );
    },
  },
];

const todayData = [
  {
    id: 1,
    name: "Unni Krishna",
    notes: "Report",
    age: 55,
    slotTime: "9:30 AM",
  },
  {
    id: 2,
    name: "Unni Krishna",
    notes: "Report",
    age: 50,
    slotTime: "2:45 PM",
  },
  {
    id: 3,
    name: "Unni Krishna",
    notes: "Report",
    age: 65,
    slotTime: "3:00 PM",
  },
];

const TodayAppointments = () => {
  const search = "unni";
  const { data } = useGetPatientQuery({ page: 1, limit: 100, search });
  console.log(data, "Today appointment");
  const patients = data?.patients;

  const columnData = getAppointmentColumns();
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h1 className="text-lg font-semibold">Today Appointments</h1>
      <Table columns={columnData} data={todayData} />
    </div>
  );
};

export default TodayAppointments;
