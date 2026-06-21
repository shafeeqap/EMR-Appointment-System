import { Trash2, PenLine, Eye } from "lucide-react";

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
