import { Trash2, PenLine } from "lucide-react";

export const getColumns = ({ onEdit, onDelete, onUpdateStatus }) => [
  {
    header: "SL",
    render: (_, index) => index + 1,
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Description",
    accessor: "description",
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
      <span className="flex gap-5">
        <PenLine onClick={() => onEdit(row)} className="cursor-pointer" />

        <Trash2
          onClick={() => onDelete(row)}
          className="text-red-700 cursor-pointer"
        />
      </span>
    ),
  },
];
