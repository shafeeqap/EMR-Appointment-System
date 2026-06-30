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
  UserRoundCheck,
} from "lucide-react";

export const STATUS_UI = {
  booked: {
    label: "Booked",
    color: "yellow",
    icon: CalendarCheck,
  },
  arrived: {
    label: "Arrived",
    color: "blue",
    icon: UserRoundCheck,
  },
  ongoing: {
    label: "On going",
    color: "orange",
    icon: RefreshCcw,
  },
  waiting: {
    label: "Waiting",
    color: "violet",
    icon: ClockFading,
  },
  completed: {
    label: "Completed",
    color: "green",
    icon: CheckCheck,
  },
  no_show: {
    label: "No Show",
    color: "gray",
    icon: EyeOff,
  },
  cancelled: {
    label: "Cancelled",
    color: "red",
    icon: CircleX,
  },
  pending: {
    label: "Pending",
    color: "yellow",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    color: "green",
    icon: CircleCheckBig,
  },
  rejected: {
    label: "Rejected",
    color: "red",
    icon: CircleAlert,
  },
};
