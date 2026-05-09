import { CalendarCheck, CalendarDays, Activity } from "lucide-react";

export const statusCardItems = [
  {
    id: 1,
    title: "Total Patients",
    key: "totalPatients",
    icon: Activity,
  },
  {
    id: 2,
    title: "Total Appointments",
    key: "totalAppointments",
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Total Completed",
    key: "totalCompleted",
    icon: CalendarCheck,
    // value: 350,
  },
];

export const appointmentTimelineData = [
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
  { name: "Appointments", value: 400 },
  { name: "completed", value: 300 },
  { name: "Canceled", value: 100 },
];

export const statusOptions = [
  { label: "All", value: "" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];