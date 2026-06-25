import {
  CalendarCheck,
  CheckCheck,
  CircleAlert,
  CircleCheckBig,
  CircleX,
  Clock,
  ClockFading,
  EyeOff,
  RefreshCcw,
  StickyNoteCheck,
} from "lucide-react";

export const STATUS_UI = {
  booked: {
    label: "Booked",
    className: "bg-yellow-100 text-yellow-700",
    icon: CalendarCheck,
  },
  arrived: {
    label: "Arrived",
    className: "bg-blue-100 text-blue-700",
    icon: StickyNoteCheck,
  },
  ongoing: {
    label: "On going",
    className: "bg-orange-100 text-orange-700",
    icon: RefreshCcw,
  },
  waiting: {
    label: "Waiting",
    className: "bg-violet-100 text-violet-700",
    icon: ClockFading,
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700",
    icon: CheckCheck,
  },
  no_show: {
    label: "No Show",
    className: "bg-gray-100 text-gray-700",
    icon: EyeOff,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700",
    icon: CircleX,
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-700",
    icon: CircleCheckBig,
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700",
    icon: CircleAlert,
  },
};
