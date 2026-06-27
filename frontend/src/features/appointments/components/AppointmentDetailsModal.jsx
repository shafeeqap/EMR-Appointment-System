import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAppointmentByIdQuery } from "../appointmentApiSlice";
import { getFullName } from "../../../utils/userHelpers";
import { closeModal, openModal } from "../../../components/modal/modalSlice";
import { Button, Loader } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { STATUS_UI } from "../../../components/ui/StatusBadge";
import { formatTime } from "../../../utils/formatHours";

const AppointmentDetailsModal = () => {
  const { appointmentId } = useSelector(
    (state) => state.modal.modalProps || {}
  );

  const dispatch = useDispatch();

  const {
    data: appointments,
    isLoading,
    error,
  } = useGetAppointmentByIdQuery({
    id: appointmentId,
  });

  const appointment = appointments?.appointments;
  const patient = appointments?.appointments?.patient;
  const doctor = appointments?.appointments?.doctor;

  const statusConfig = STATUS_UI[appointment?.status];
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

  return (
    <div className="bg-white w-64 sm:w-96 md:w-[700px]">
      <div className="w-full p-6 ">
        {/* Header */}
        <h2 className="mb-4 text-xl font-semibold">Appointment Details</h2>

        {/* Patient Info */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500 mb-2">
            Patient Info
          </legend>
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
        </fieldset>

        {/* Appointment Info */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500 mb-2">
            Appointment Info
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Date:</strong> {appointment?.date.split("T")[0]}
            </p>
            <p>
              <strong>Slot:</strong> {formatTime(appointment?.slotTime)}
            </p>
            <p>
              <strong>Token:</strong> {appointment?.tokenNumber}
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
              <strong>Department:</strong> {appointment?.department?.name}
            </p>
          </div>
        </fieldset>

        {/* Notes */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500">Notes</legend>
          <p className="text-sm bg-gray-50 p-3 rounded-lg capitalize">
            {appointment?.notes || "No notes available"}
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
              onClick={() => handleStatusModalOpen(appointment)}
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
