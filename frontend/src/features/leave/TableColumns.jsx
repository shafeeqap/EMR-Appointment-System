import { Trash2, PenLine, Eye } from "lucide-react";
import { STATUS_UI } from "../../components/ui";
import { colorMap } from "../../constants/colorMap";
import clsx from "clsx";

export const getColumns = ({ onUpdateStatus, onDetails }) => [
  {
    header: "SL",
    render: (_, index) => index + 1,
  },
  {
    header: "First Name",
    render: (row) => row?.employee?.firstName,
  },
  {
    header: "Last Name",
    render: (row) => row?.employee?.lastName,
  },
  // {
  //   header: "Email",
  //   accessor: "email",
  // },
  {
    header: "Mobile",
    render: (row) => row?.employee?.mobile,
  },
  {
    header: "Role",
    render: (row) => (
      <span
        className={`capitalize ${
          row.employeeType === "admin" ? "text-red-700 font-bold" : ""
        }`}
      >
        {row.employeeType.replace(/_/g, " ")}
      </span>
    ),
  },
  {
    header: "Leave Type",
    render: (row) =>
      row.leaveType
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
  },
  {
    header: "Leave Category",
    render: (row) =>
      row.leaveCategory
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
  },
  // {
  //   header: "Start Date",
  //   render: (row) => new Date(row.startDate).toISOString().split("T")[0],
  // },
  // {
  //   header: "End Date",
  //   render: (row) => new Date(row.endDate).toISOString().split("T")[0],
  // },
  {
    header: "Total Days",
    accessor: "totalDays",
  },
  {
    header: "Status",
    render: (row) => {
      const statusConfig = STATUS_UI[row.status];
      const Icon = statusConfig?.icon;
      const color = statusConfig?.color;
      const colors = colorMap[color];
      const isFinalState = ["approved", "cancelled", "rejected"].includes(
        row.status
      );

      return (
        <button
          onClick={() => onUpdateStatus(row)}
          disabled={isFinalState}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <span
            className={clsx(
              colors.bg,
              colors.text,
              "inline-flex items-center gap-2 px-2 py-1 text-xs font-medium text-center rounded-full uppercase"
            )}
          >
            {Icon && <Icon size={16} className={colors.text} />}
            {statusConfig?.label}
          </span>
        </button>
      );
    },
  },
  {
    header: "Details",
    render: (row) => (
      <span className="flex gap-5">
        <Eye
          onClick={() => onDetails(row)}
          className="cursor-pointer text-gray-500"
        />
      </span>
    ),
  },
];
