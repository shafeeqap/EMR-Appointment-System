import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";
import { OctagonAlert } from "lucide-react";
import { Button, FilterOption } from "../../../components/ui";
import { closeModal } from "../../../components/modal/modalSlice";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import { handleApiError } from "../../../utils/handleApiError";
import { toast } from "react-toastify";
import {
  useGetLeaveByIdQuery,
  useUpdateLeaveStatusMutation,
} from "../leaveApiSlice";
import { statusManageOptions } from "../config/statusOption";
import { formatDate } from "../../../utils/formatDate";

const UpdateLeaveStatusModal = () => {
  const { leaveId } = useSelector((state) => state.modal.modalProps || {});

  const { isSuccess, message } = useSelector((state) => state.successFeedback);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const { data } = useGetLeaveByIdQuery(leaveId, {
    skip: !leaveId,
  });

  const leave = data?.leave;

  useEffect(() => {
    setStatus(leave?.status || "");
  }, [leave?.status]);

  const [updateLeaveStatus, { isLoading }] = useUpdateLeaveStatusMutation();

  const handleUpdateStatus = async () => {
    if (!leave) return;

    if (status === leave.status) {
      toast.info("No changes detected");
      return;
    }

    try {
      const res = await updateLeaveStatus({
        id: leave._id,
        status: status,
      }).unwrap();

      dispatch(
        setSuccessFeedback({
          message: res.message || "Leave status updated successfully",
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

      <h1 className="text-2xl">
        {isSuccess ? "Updated!" : "Update leave status"}
      </h1>

      <p className="text-textSecondary text-center">
        {isSuccess ? (
          message || "Appointment status has been updated successfully."
        ) : (
          <>
            This action cannot be undone. Please confirm that you want to
            proceed. Do you really want to update {""}
            <span className="text-red-600">
              {leave?.employeeId?.firstName} {leave?.employeeId?.lastName}'s{" "}
              <strong className="text-black">
                {formatDate(leave?.startDate)} - {formatDate(leave?.endDate)}
              </strong>{" "}
            </span>
            {""} leave status?
          </>
        )}
      </p>

      {!isSuccess && (
        <div className="mb-4 w-full">
          <FilterOption
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusManageOptions}
            disabled={statusManageOptions.length === 0}
            className={
              "w-full" +
              (statusManageOptions.length === 0
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

export default UpdateLeaveStatusModal;
