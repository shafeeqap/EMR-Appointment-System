import { Users, Stethoscope, CalendarCheck, Activity } from "lucide-react";

export const statusCardItems = [
  {
    id: 1,
    title: "Total User",
    key: "totalUsers",
    icon: Users,
    color: "red",
  },
  {
    id: 2,
    title: "Total Patients",
    key: "totalPatients",
    icon: Activity,
    color: "green",
  },
  {
    id: 3,
    title: "Total Doctors",
    key: "totalDoctors",
    icon: Stethoscope,
    color: "blue",
  },
  {
    id: 4,
    title: "Total Appointments",
    key: "totalAppointments",
    icon: CalendarCheck,
    color: "orange",
  },
];

export const superAdminDashboard = [
  {
    id: "appointments",
    type: "chart",
    title: "Appointment Trends",
    chartType: "bar",
    dataKey: "appointments",
    config: {
      xKey: "name",
      bars: [
        { dataKey: "pv", color: "#8884d8" },
        { dataKey: "uv", color: "#82ca9d" },
      ],
    },
  },
  {
    id: "revenue",
    type: "chart",
    title: "Revenue Overview",
    chartType: "pie",
    dataKey: "revenue",
    config: {
      xKey: "month",
      lines: [{ dataKey: "value", color: "#4CAF50" }],
    },
  },
  {
    id: "totalPatients",
    type: "stat",
    title: "Total Patients",
    chartType: "line",
    dataKey: "patients",
  },
];

export const superAdminData = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 5900,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  // {
  //   name: "Jul",
  //   uv: 6490,
  //   pv: 5300,
  //   amt: 2100,
  // },
  // {
  //   name: "Aug",
  //   uv: 3370,
  //   pv: 4390,
  //   amt: 2400,
  // },
  // {
  //   name: "Sep",
  //   uv: 3490,
  //   pv: 8300,
  //   amt: 2100,
  // },
  // {
  //   name: "Oct",
  //   uv: 5490,
  //   pv: 7300,
  //   amt: 2100,
  // },
  // {
  //   name: "Nov",
  //   uv: 7490,
  //   pv: 4300,
  //   amt: 2100,
  // },
  // {
  //   name: "Dec",
  //   uv: 3200,
  //   pv: 4370,
  //   amt: 2190,
  // },
];

export const statusData = [
  { name: "Appointments" },
  { name: "completed" },
  { name: "Canceled" },
  { name: "No show" },
];
