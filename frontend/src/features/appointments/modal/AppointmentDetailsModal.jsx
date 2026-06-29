import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAppointmentDetailsQuery } from "../appointmentApiSlice";
import { getFullName } from "../../../utils/userHelpers";
import { closeModal, openModal } from "../../../components/modal/modalSlice";
import { Button, Loader } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { STATUS_UI } from "../../../components/ui/StatusBadge";
import { formatTime } from "../../../utils/formatHours";
import {
  Calendar,
  CalendarClock,
  Clock,
  NotepadText,
  ReceiptText,
  Rows4,
  X,
} from "lucide-react";
import ModalHeader from "../../../components/modal/ModalHeader";
import clsx from "clsx";
import { formatDate } from "../../../utils/formatDate";
import InfoCard from "../components/InfoCard";

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

  // console.log(appointmentData, "Appointment");
  console.log(appointment, "appointment...");

  const statusConfig = STATUS_UI[appointmentData?.status];
  const Icon = statusConfig?.icon;

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

  const cards = [
    {
      title: "Status",
      value: (
        <span
          onClick={() => handleStatusModalOpen(appointmentData)}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase ${statusConfig.className}`}
        >
          <Icon size={16} />
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
      // subtitle: formatDay(appointmentData.date),
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

  return (
    <div className="bg-white w-64 sm:w-[500px] md:w-[1080px]">
      <div className="w-full p-4">
        <ModalHeader
          title="Appointment Details"
          icon={<CalendarClock size={40} className="text-primary" />}
          description="View appointment information and status"
        />

        <div className="py-3">
          {/* Info cards */}
          <div className="bg-white min-h-28 grid grid-cols-1 sm:grid-cols-2 sm:py-3 md:grid-cols-5 gap-5 px-4 border shadow">
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
            

            {/* Appointment Date */}
            {/* <div className="min-w-44 flex sm:border-b-0 cursor-pointer sm:border-r-2 border-b-2 pb-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-100">
                  <Calendar size={30} className="text-green-600" />
                </div>
                <div>
                  <small className="text-textPrimary">Appointment Date</small>
                  <h2 className="font-semibold">29 Jun 2026</h2>
                  <span className="text-gray-600">Monday</span>
                </div>
              </div>
            </div> */}

            {/* Slot Time */}
            {/* <div className="min-w-44 flex sm:border-b-0 cursor-pointer sm:border-r-2 border-b-2 pb-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-fuchsia-100">
                  <Clock size={30} className="text-fuchsia-600" />
                </div>
                <div>
                  <small className="text-textPrimary">Slot Time</small>
                  <h2 className="font-semibold">11:15 AM</h2>
                  <span className="text-gray-600">15 mins</span>
                </div>
              </div>
            </div> */}

            {/* Department*/}
            {/* <div className="min-w-44 flex sm:border-b-0 cursor-pointer pb-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-sky-100">
                  <Rows4 size={30} className="text-sky-600" />
                </div>
                <div>
                  <small className="text-textPrimary">Department</small>
                  <h2 className="font-semibold">Cardiology</h2>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Patient Info */}
        <div className="mb-4 mt-3 border border-gray-300 rounded p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Name:</strong> {patient?.name}
            </p>
            <p>
              <strong>UHID:</strong> {patient?.patientId}
            </p>
            <p>
              <strong>Age:</strong> {patient?.age}
            </p>
            <p>
              <strong>Mobile:</strong> {patient?.mobile}
            </p>
          </div>
        </div>

        {/* Appointment Info */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500 mb-2">
            Appointment Info
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Date:</strong> {appointmentData?.date?.split("T")[0]}
            </p>
            <p>
              <strong>Slot:</strong> {formatTime(appointmentData?.slotTime)}
            </p>
            <p>
              <strong>Token:</strong> {appointmentData?.tokenNumber}
            </p>
          </div>
        </fieldset>

        {/* Doctor Info */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500 mb-2">
            Doctor Info
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Doctor:</strong> {getFullName(doctor)}
            </p>
            <p>
              <strong>Department:</strong> {appointmentData?.department?.name}
            </p>
          </div>
        </fieldset>

        {/* Notes */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500">Notes</legend>
          <p className="text-sm bg-gray-50 p-3 rounded-lg capitalize">
            {appointmentData?.notes || "No notes available"}
          </p>
        </fieldset>

        {/* Status */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500 ">Status</legend>
          <div className="flex items-center justify-between text-sm">
            <p>
              <strong>Status:</strong>
            </p>
            <span
              onClick={() => handleStatusModalOpen(appointmentData)}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase cursor-pointer ${
                statusConfig?.className || "bg-gray-500 text-white"
              }`}
            >
              {Icon && <Icon size={16} />}
              {statusConfig?.label}
            </span>
          </div>
        </fieldset>

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
