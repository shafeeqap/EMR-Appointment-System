// import {
//   Calendar,
//   CalendarClock,
//   Clock,
//   NotepadText,
//   ReceiptText,
//   Rows4,
// } from "lucide-react";
// import { STATUS_UI } from "../../../components/ui";
// import { formatDate } from "../../../utils/formatDate";
// import { formatTime } from "../../../utils/formatHours";

// const appointmentData = null;
// const statusConfig = STATUS_UI[appointmentData?.status];
// const Icon = statusConfig?.icon;

// export const cards = ({ handleStatusModalOpen, doctor }) => [
//   {
//     title: "Status",
//     value: (
//       <span
//         onClick={() => handleStatusModalOpen(appointmentData)}
//         className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase ${statusConfig.className}`}
//       >
//         <Icon size={16} />
//         {statusConfig.label}
//       </span>
//     ),
//     icon: NotepadText,
//     color: "green",
//   },

//   {
//     title: "Token Number",
//     value: `#${appointmentData.tokenNumber}`,
//     icon: ReceiptText,
//     color: "violet",
//   },

//   {
//     title: "Appointment Date",
//     value: formatDate(appointmentData.date),
//     // subtitle: formatDay(appointmentData.date),
//     icon: Calendar,
//     color: "green",
//   },

//   {
//     title: "Slot Time",
//     value: formatTime(appointmentData.slotTime),
//     subtitle: `${doctor.slotDuration} mins`,
//     icon: Clock,
//     color: "purple",
//   },

//   {
//     title: "Department",
//     value: appointmentData.department.name,
//     icon: Rows4,
//     color: "sky",
//   },
// ];
