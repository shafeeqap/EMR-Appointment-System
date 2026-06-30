import { Trash2, PenLine, Eye } from "lucide-react";
import { getFullName } from "../../utils/userHelpers";
import { STATUS_UI } from "../../components/ui";
import { formatTime } from "../../utils/formatHours";
import { colorMap } from "../../constants/colorMap";
import clsx from "clsx";

export const getColumns = ({ onEdit, onDelete, onDetails }) => [
  {
    header: "SL",
    render: (_, index) => index + 1,
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Age",
    accessor: "age",
  },
  {
    header: "Mobile",
    accessor: "mobile",
  },
  {
    header: "PatientID",
    accessor: "patientId",
  },

  {
    header: "Actions",
    render: (row) => (
      <span className="flex gap-5">
        <PenLine onClick={() => onEdit(row)} className="cursor-pointer" />

        <Trash2
          onClick={() => onDelete(row)}
          className="text-red-700 cursor-pointer"
        />
      </span>
    ),
  },
  {
    header: "Details",
    render: (row) => (
      <span className="flex gap-5">
        <Eye onClick={() => onDetails(row)} className="cursor-pointer" />
      </span>
    ),
  },
];

// Get appointment history
export const getAptHistoryColumns = () => [
  {
    header: "SL",
    render: (_, index) => index + 1,
  },
  {
    header: "Date",
    render: (row) => {
      const today = new Date().toISOString().split("T")[0];
      const date = new Date(row.date).toISOString().split("T")[0];

      return (
        <span className={`${date >= today ? "text-black font-semibold" : ""}`}>
          {new Date(row.date).toISOString().split("T")[0]}
        </span>
      );
    },
  },
  {
    header: "Doctor",
    render: (row) => getFullName(row?.doctor),
  },
  {
    header: "Time",
    render: (row) => formatTime(row?.slotTime),
  },
  {
    header: "Status",
    render: (row) => {
      const statusConfig = STATUS_UI[row?.status];
      const color = statusConfig?.color;
      const Icon = statusConfig?.icon;
      const colors = colorMap[color];

      return (
        <button
          // onClick={() => onUpdateStatus(row)}
          // disabled={isFinalState}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <span
            className={clsx(
              colors.bg,
              colors.text,
              "inline-flex items-center gap-2 px-2 py-1 text-xs font-medium text-center rounded-full cursor-pointer uppercase"
            )}
          >
            {Icon && <Icon size={16} className={colors.text} />}
            {statusConfig?.label}
          </span>
        </button>
      );
    },
  },
];
