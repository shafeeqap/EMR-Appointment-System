import { Trash2, PenLine } from "lucide-react";
import { formatTime, formatWorkingHours } from "../../../utils/formatHours";
import { getDuration } from "../../../utils/calculateDuration";
import { STATUS_UI } from "../../appointments/components";

export const getColumns = ({ onEdit, onDelete, onUpdateStatus }) => [
  {
    header: "SL",
    render: (_, index) => index + 1,
  },
  {
    header: "First Name",
    accessor: "firstName",
  },
  {
    header: "Last Name",
    accessor: "lastName",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Department",
    render: (row) => row?.department?.name,
  },
  {
    header: "Working Hours",
    render: (row) => {
      const duration = getDuration(row.workingHours);

      let color = "text-gray-700";

      if (duration <= 240) color = "text-green-600"; // <= 4h
      else if (duration <= 480) color = "text-blue-600"; // <= 8h
      else color = "text-red-600"; // long shift

      return (
        <span className={`${color} font-medium`}>
          {formatWorkingHours(row.workingHours)}
        </span>
      );
    },
  },
  {
    header: "Break Time",
    render: (row) => {
      return row.breakTimes?.length ? (
        <span className="text-gray-500">
          {formatWorkingHours(row.breakTimes[0])}
        </span>
      ) : (
        <span className="text-red-600">No break time</span>
      );
    },
  },
  {
    header: "Slot Duration",
    accessor: "slotDuration",
  },
  {
    header: "Status",
    render: (row) => (
      <span
        onClick={() => onUpdateStatus(row)}
        className={`max-w-16 px-2 py-1 text-xs font-medium cursor-pointer text-center rounded uppercase text-white ${
          row.isActive ? "bg-green-700" : "bg-red-700"
        }`}
      >
        {row.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    header: "Actions",
    render: (row) => (
      <span className="flex gap-5 ">
        <PenLine onClick={() => onEdit(row)} className="cursor-pointer" />

        <Trash2
          onClick={() => onDelete(row)}
          className="text-red-700 cursor-pointer"
        />
      </span>
    ),
  },
];

// Get today appointment columns
export const getTodayAppointmentColumns = ({ onDetails, onUpdateStatus }) => [
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
    header: "Appointment Type",
    render: (row) => {
      const statusConfig = STATUS_UI[row.status];
      const Icon = statusConfig?.icon;
      const isFinalState = ["arrived", "waiting", "completed"].includes(
        row.status
      );

      return (
        <button
          onClick={() => onUpdateStatus(row)}
          disabled={isFinalState}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <span
            className={`inline-flex items-center gap-2 px-2 py-1 text-xs font-medium text-center rounded-full cursor-pointer uppercase ${statusConfig?.className}`}
          >
            {Icon && <Icon size={16} />}
            {statusConfig?.label}
          </span>
        </button>
      );
    },
  },
  {
    header: "Time",
    render: (row) => {
      return (
        <div
          onClick={() => onDetails(row)}
          className="border border-gray-300 w-20 py-2 text-center rounded cursor-pointer hover:bg-gray-300"
        >
          {row.slotTime ? (
            formatTime(row.slotTime)
          ) : (
            <span onClick={""} className="border border-gray-300">
              {row.status}
            </span>
          )}
        </div>
      );
    },
  },
];
