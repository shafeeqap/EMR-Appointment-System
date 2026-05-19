import React from "react";
import Table from "../../../../components/table/Table";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../components/modal/modalSlice";
import { getTodayAppointmentColumns } from "../TableColumns";

const TodayAppointments = ({ data }) => {
  const dispatch = useDispatch();

  const handleDetailsModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "PATIENT_DETAILS",
        modalProps: { appointmentData: row },
      })
    );
    console.log("DETAILS CLICKED", row);
  };

  const handleStatusModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "UPDATE_APPOINTMENT_STATUS",
        modalProps: { appointment: row },
      })
    );
    console.log("UPDATE APPOINTMENT STATUS CLICKED", row);
  };

  const columnData = getTodayAppointmentColumns({
    onDetails: handleDetailsModalOpen,
    onUpdateStatus: handleStatusModalOpen,
  });

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h1 className="text-lg font-semibold text-gray-800 mb-5">
        Today Appointments
      </h1>
      <Table columns={columnData} data={data} />
    </div>
  );
};

export default TodayAppointments;
