import { Trash2, PenLine, Eye } from "lucide-react";
import { getFullName } from "../../utils/userHelpers";
import { STATUS_UI } from "../../components/ui";
import { formatTime } from "../../utils/formatHours";

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
      const Icon = statusConfig?.icon;

      return (
        <button
          // onClick={() => onUpdateStatus(row)}
          // disabled={isFinalState}
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
];
