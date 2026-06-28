import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteAppointmentMutation } from "../appointmentApiSlice";
import { closeModal } from "../../../components/modal/modalSlice";
import { handleApiError } from "../../../utils/handleApiError";
import { Trash2 } from "lucide-react";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";

const DeleteAppointmentModal = () => {
  const { appointmentData } = useSelector(
    (state) => state.modal.modalProps || {}
  );
  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const dispatch = useDispatch();

  const patient = appointmentData?.patient;

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteAppointment(appointmentData._id).unwrap();

      dispatch(
        setSuccessFeedback({
          message: res.message || "Appointment deleted successfully",
        })
      );
      setTimeout(() => {
        dispatch(closeModal());

        setTimeout(() => {
          dispatch(resetSuccessFeedback());
        }, 200);
      }, 1500);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      handleApiError(error);
    }
  };

  return (
    <div className="flex flex-col items-center px-5 py-5 space-y-3 w-64 sm:w-fit max-w-sm">
      {isSuccess ? (
        <SuccessFeedback />
      ) : (
        <Trash2 strokeWidth={1.25} size={60} className="text-red-600" />
      )}

      <h1 className="text-2xl">{isSuccess ? "Deleted!" : "Are you sure?"}</h1>

      <p className="text-textSecondary text-center">
        {isSuccess ? (
          message || "Department has been deleted successfully."
        ) : (
          <>
            Are you sure you want to delete{" "}
            <span className="text-red-600">{patient?.name}'s</span> appointment?
            This process cannot be undone.
          </>
        )}
      </p>

      {!isSuccess && (
        <div className="flex justify-between w-full gap-2 mt-5">
          <button
            onClick={() => dispatch(closeModal())}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAppointmentModal;
