import React from "react";
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
import clsx from "clsx";
import { colorMap } from "../../constants/colorMap";

const STATUS_UI = {
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

const StatusBadge = ({ data, onClick, disabled }) => {
  const statusConfig = STATUS_UI[data?.status] ?? {
    label: "Unknown",
    color: "gray",
    icon: CircleAlert,
  };

  const Icon = statusConfig?.icon;
  const colors = colorMap[statusConfig?.color];

  return (
    <button
      type="button"
      onClick={() => onClick?.(data)}
      disabled={disabled}
      className={clsx(
        colors.bg,
        colors.text,
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase",
        onClick && !disabled && "cursor-pointer",
        disabled && "cursor-not-allowed"
      )}
    >
      <Icon size={16} />
      {statusConfig.label}
    </button>
  );
};

export default StatusBadge;
