import { OctagonAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FilterOption } from "../../../components/ui";
import { appointmentUpdateStatus } from "../appointmentOptions";
import { closeModal } from "../../../components/modal/modalSlice";
import { useUpdateAppointmentStatusMutation } from "../appointmentApiSlice";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/handleApiError";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";

const TRANSITIONS = {
  booked: ["arrived", "cancelled", "no_show"],
  arrived: ["ongoing"],
  ongoing: ["completed"],
  completed: [],
  cancelled: [],
  no_show: [],
};

const UpdateAppointmentStatusModal = () => {
  const { appointment } = useSelector((state) => state.modal.modalProps || {});
  const { isSuccess, message } = useSelector((state) => state.successFeedback);
  
  const dispatch = useDispatch();

  const [status, setStatus] = useState(appointment?.status || "");

  const currentStatus = appointment?.status;

  const allowedNext = TRANSITIONS[currentStatus] || [];

  const filteredOptions = appointmentUpdateStatus.filter((option) =>
    allowedNext.includes(option.value)
  );

  const [updateAppointmentStatus, { isLoading }] =
    useUpdateAppointmentStatusMutation();

  useEffect(() => {
    if (appointment?.status) {
      const allowed = TRANSITIONS[appointment.status] || [];

      if (allowed.length > 0) {
        setStatus(allowed[0]);
      }
    }
  }, [appointment]);

  const handleUpdateStatus = async () => {
    if (!status || status === currentStatus) {
      toast.info("No changes detected");
      return;
    }

    // const today = new Date().toISOString().split("T")[0];
    // const date = new Date(appointment.date).toISOString().split("T")[0];

    // if (date < today) {
    //   toast.info("Cannot update status of past appointments");
    //   return;
    // }

    try {
      const res = await updateAppointmentStatus({
        id: appointment._id,
        status: status,
      }).unwrap();
      // console.log(res, "Appointment status updated successfully");

      dispatch(
        setSuccessFeedback({
          message: res.message || "Appointment status updated successfully",
        })
      );

      setTimeout(() => {
        dispatch(closeModal());

        setTimeout(() => {
          dispatch(resetSuccessFeedback());
        }, 200);
      }, 1500);
    } catch (error) {
      console.error(error);
      handleApiError(error);
    }
  };

  return (
    <div className="flex flex-col items-center px-5 py-5 space-y-3 w-64 sm:w-fit max-w-sm">
      {isSuccess ? (
        <SuccessFeedback />
      ) : (
        <OctagonAlert strokeWidth={1.25} size={72} className="text-red-600" />
      )}

      <h1 className="text-2xl">{isSuccess ? "Updated!" : "Update appointment"}</h1>

      <p className="text-textSecondary text-center">
        {isSuccess ? (
          message || "Appointment status has been updated successfully."
        ) : (
          <>
            This action cannot be undone. Please confirm that you want to
            proceed. Do you really want to update {""}
            <span className="text-red-600">{appointment?.patient?.name || appointment?.name}'s</span>
            {""} appointment status?
          </>
        )}
      </p>

      {!isSuccess && (
        <div className="mb-4 w-full">
          <FilterOption
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={filteredOptions}
            disabled={filteredOptions.length === 0}
            className={
              "w-full" +
              (filteredOptions.length === 0
                ? " opacity-50 cursor-not-allowed"
                : "")
            }
          />
        </div>
      )}

      {!isSuccess && (
        <div className="flex justify-between w-full gap-2 mt-5">
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button onClick={handleUpdateStatus}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpdateAppointmentStatusModal;
