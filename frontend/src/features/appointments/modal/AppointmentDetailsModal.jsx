import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAppointmentDetailsQuery } from "../appointmentApiSlice";
import { getFullName } from "../../../utils/userHelpers";
import { closeModal, openModal } from "../../../components/modal/modalSlice";
import { Button, DetailRow, Loader } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { STATUS_UI } from "../../../components/ui/StatusBadge";
import { formatTime } from "../../../utils/formatHours";
import {
  Calendar,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  Clock,
  NotepadText,
  ReceiptText,
  Rows4,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";
import ModalHeader from "../../../components/modal/ModalHeader";
import clsx from "clsx";
import { formatDate, formatDay } from "../../../utils/formatDate";
import InfoCard from "../components/InfoCard";
import { colorMap } from "../../../constants/colorMap";

const AppointmentDetailsModal = () => {
  const { appointmentId } = useSelector(
    (state) => state.modal.modalProps || {}
  );

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const {
    data: appointment,
    isLoading,
    error,
  } = useGetAppointmentDetailsQuery(
    {
      id: appointmentId,
      page,
      limit: 5,
    },
    {
      skip: !appointmentId,
    }
  );

  const appointmentData = appointment?.appointment;
  const patient = appointmentData?.patient;
  const doctor = appointmentData?.doctor;

  console.log(appointmentData, "Appointment");
  // console.log(appointment, "appointment...");

  const statusConfig = STATUS_UI[appointmentData?.status];
  const Icon = statusConfig?.icon;
  const colors = colorMap[statusConfig?.color];

  const handleStatusModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "UPDATE_APPOINTMENT_STATUS",
        modalProps: { appointment: row },
      })
    );
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) return <ErrorMessage />;

  // Cards
  const cards = [
    {
      title: "Status",
      value: (
        <span
          // onClick={() => handleStatusModalOpen(appointmentData)}
          className={clsx(
            colors.bg,
            colors.text,
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase ${statusConfig.className}"
          )}
        >
          <Icon size={16} className={colors.text} />
          {statusConfig.label}
        </span>
      ),
      icon: NotepadText,
      color: "orange",
    },

    {
      title: "Token Number",
      value: `#${appointmentData?.tokenNumber}`,
      icon: ReceiptText,
      color: "violet",
    },

    {
      title: "Appointment Date",
      value: formatDate(appointmentData.date),
      subtitle: formatDay(appointmentData.date),
      icon: Calendar,
      color: "green",
    },

    {
      title: "Slot Time",
      value: formatTime(appointmentData.slotTime),
      subtitle: `${doctor.slotDuration} mins`,
      icon: Clock,
      color: "purple",
    },

    {
      title: "Department",
      value: appointmentData.department.name,
      icon: Rows4,
      color: "sky",
    },
  ];

  // Details
  const details = [
    {
      title: "Patient information",
      icon: ClipboardList,
      color: "violet",
      fields: [
        { label: "Patient Name", value: () => patient?.name },
        { label: "UHID", value: () => patient?.patientId },
        { label: "Age", value: () => patient?.age },
        { label: "Mobile", value: () => patient?.mobile },
      ],
    },
    {
      title: "Doctor information",
      icon: Stethoscope,
      color: "green",
      fields: [
        { label: "Doctor", value: () => getFullName(doctor) },
        { label: "Email", value: () => doctor?.email },
        { label: "Slot Duration", value: () => doctor?.slotDuration },
        { label: "Mobile", value: () => doctor?.mobile },
      ],
    },
    {
      title: "Appointment information",
      icon: CalendarDays,
      color: "sky",
      fields: [
        { label: "Date", value: () => formatDate(appointmentData?.date) },
        {
          label: "Slot Time",
          value: () => formatTime(appointmentData?.slotTime),
        },
        { label: "Token Number", value: () => appointmentData?.tokenNumber },
        {
          label: "Booked On",
          value: () => formatDate(appointmentData?.createdAt),
        },
      ],
    },
  ];

  return (
    <div className="bg-white w-[80vw] max-w-6xl">
      <div className="w-full p-4">
        <ModalHeader
          title="Appointment Details"
          icon={<CalendarClock size={40} className="text-primary" />}
          description="View appointment information and status"
        />

        <div className="py-3">
          {/* Info cards */}
          <div className="min-h-28 grid grid-cols-1 sm:grid-cols-2 sm:py-3 xl:grid-cols-5 gap-5 px-4 border shadow">
            {cards.map((card, index) => (
              <InfoCard
                key={card.title}
                {...card}
                className={
                  index !== cards.length - 1
                    ? "sm:border-r-2 border-b-2 sm:border-b-0"
                    : ""
                }
              />
            ))}
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-5">
          {details.map((item) => {
            const Icon = item?.icon;
            const colors = colorMap[item?.color];

            return (
              <div key={item.title} className="border rounded p-4">
                <div className="flex items-center gap-2 mb-5">
                  <Icon className={colors.text} />
                  <h3 className={clsx(colors.text, "font-semibold text-lg")}>
                    {item.title}
                  </h3>
                </div>

                {item.fields.map((field) => (
                  <DetailRow
                    key={field.label}
                    label={field.label}
                    value={field.value()}
                  />
                ))}
              </div>
            );
          })}

          <div className="mb-4 col-span-2 border border-gray-300 rounded p-4">
            <div className="flex gap-2">
              <NotepadText className="text-orange-600" />
              <h3 className="font-semibold text-lg text-orange-600">Notes</h3>
            </div>
            <p className="text-sm mt-3 bg-gray-100 min-h-[5rem] p-3 rounded-lg capitalize">
              {appointmentData?.notes || "No notes available"}
            </p>
          </div>

          <div className="mb-4 border border-gray-300 rounded p-4">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="text-green-600" />
              <h3 className="font-semibold text-lg text-green-600">
                Status Information
              </h3>
            </div>

            <DetailRow
              label="Status"
              value={
                <span
                  // onClick={() => handleStatusModalOpen(appointmentData)}
                  className={clsx(
                    colors.bg,
                    colors.text,
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase cursor-pointer"
                  )}
                >
                  {Icon && <Icon size={16} className={colors.text} />}
                  {statusConfig?.label}
                </span>
              }
            />
            <DetailRow
              label="Updated On"
              value={formatDate(appointmentData?.createdAt)}
            />
            <DetailRow label="Updated On" value={"Admin"} />
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-2 border-t pt-3">
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
          <Button>Edit</Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
