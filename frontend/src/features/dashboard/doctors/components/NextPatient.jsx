import React from "react";
import Table from "../../../../components/table/Table";
const columns1 = [
  {
    header: "Name",
    accessor: "name",
    description: "notes",
  },
  {
    header: "Age",
    accessor: "age",
  },
  {
    header: "Patient ID",
    accessor: "patientId",
  },
];
const columns2 = [
  {
    header: "D.O.B",
    accessor: "dob",
  },
  {
    header: "Sex",
    accessor: "sex",
  },
  {
    header: "Weight",
    accessor: "weight",
  },
];
const columns3 = [
  {
    header: "Last Appoint",
    accessor: "lastAppoint",
  },
  {
    header: "Height",
    accessor: "height",
  },
  {
    header: "Reg, Date",
    accessor: "regDate",
  },
];

const data1 = [
  {
    id: 1,
    name: "Muhammed",
    notes: "Report",
    age: 55,
    patientId: "PAT 2026/009",
  },
];
const data2 = [
  {
    id: 1,
    dob: "22-01-1990",
    sex: "Male",
    weight: "69 kg",
  },
];
const data3 = [
  {
    id: 1,
    lastAppoint: "22-01-1990",
    height: "169 cm",
    regDate: "22-05-1989",
  },
];

const NextPatient = () => {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow p-4 w-full">
      <h1 className="text-lg font-semibold">Next Patient Details</h1>

      <Table
        columns={columns1}
        data={data1}
        className="bg-gray-300 text-gray-600"
        layoutStyle="mt-6"
        columnStyle="px-4 py-3"
      />

      <Table columns={columns2} data={data2} columnStyle="px-4" />

      <Table columns={columns3} data={data3} columnStyle="px-4" />
    </div>
  );
};

export default NextPatient;
