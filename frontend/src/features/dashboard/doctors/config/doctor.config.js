import { CalendarCheck, CalendarDays, Activity, HeartHandshake } from "lucide-react";

export const statusCardItems = [
  {
    id: 1,
    title: "Total Patients",
    key: "totalPatients",
    icon: Activity,
  },
  {
    id: 2,
    title: "Today's Appointments",
    key: "todaysAppointments",
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Today's Patients",
    key: "todaysPatients",
    icon: HeartHandshake ,
    // value: 350,
  },
  {
    id: 4,
    title: "Total Completed",
    key: "todaysCompleted",
    icon: CalendarCheck,
    // value: 350,
  },
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

export const statusPriority = {
  ongoing: 1,
  waiting: 2,
  arrived: 3,
  completed: 4,
};