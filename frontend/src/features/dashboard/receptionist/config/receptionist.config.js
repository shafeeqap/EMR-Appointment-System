import { Stethoscope, CalendarCheck, CheckLine, CircleX } from "lucide-react";

export const statusCardItems = [
  {
    id: 1,
    title: "Today's Appointments",
    key: "todaysAppointments",
    icon: CalendarCheck,
    // value: 150,
  },
  {
    id: 2,
    title: "Checked-in Patients",
    key: "checkedInPatients",
    icon: CheckLine,
    // value: 100,
  },
  {
    id: 3,
    title: "Cancelled Appointments",
    key: "cancelledAppointments",
    icon: CircleX,
    // value: 100,
  },
  {
    id: 4,
    title: "Doctor Availability",
    key: "doctorsAvailable",
    icon: Stethoscope,
    // value: 50,
  },
];

export const receptionistData = [
  {
    name: "Cardiology",
    available: 9,
    busy: 4,
  },
  {
    name: "Neurology",
    available: 8,
    busy: 4,
  },
  {
    name: "Traumatology",
    available: 5,
    busy: 2,
  },
  {
    name: "Pediatrics",
    available: 8,
    busy: 1,
  },
  {
    name: "Orthopedics",
    available: 8,
    busy: 2,
  },
  // {
  //   name: "General Surgery",
  //   uv: 2390,
  //   pv: 3800,
  //   amt: 2500,
  // },
];
