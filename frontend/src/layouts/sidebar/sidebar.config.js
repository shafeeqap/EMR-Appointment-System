import {
  LayoutDashboard,
  ClipboardPlus,
  CalendarDays,
  CalendarCheck,
  Hospital,
  Users,
  GitFork,
} from "lucide-react";

export const sidebarItems = [
  {
    id: 1,
    icons: LayoutDashboard,
    name: "Dashboard",
    path: "/dashboard",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 2,
    icons: ClipboardPlus,
    name: "Doctors",
    path: "/doctors",
    roles: ["super_admin"],
  },
  {
    id: 3,
    icons: GitFork,
    name: "Departments",
    path: "/departments",
    roles: ["super_admin"],
  },
  {
    id: 4,
    icons: Hospital,
    name: "Patients",
    path: "/patient",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 5,
    icons: CalendarDays,
    name: "Doctor Schedules",
    path: "shedules",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 6,
    icons: CalendarCheck,
    name: "Patient Appointments",
    path: "/appointments",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 7,
    icons: Users,
    name: "Users",
    path: "/users",
    roles: ["super_admin"],
  },
];
