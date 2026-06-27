import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import { handleApiError } from "../../../utils/handleApiError";
import { closeModal } from "../../../components/modal/modalSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";
import { Trash2 } from "lucide-react";
import { useCancelLeaveMutation, useGetLeaveByIdQuery } from "../leaveApiSlice";
import { formatDate } from "../../../utils/formatDate";

const CancelLeaveRequestModal = () => {
  const { leaveId } = useSelector((state) => state.modal.modalProps || {});
  const { isSuccess, message } = useSelector((state) => state.successFeedback);
  const dispatch = useDispatch();

  const [cancelLeaveRequest] = useCancelLeaveMutation();
  const { data: leaveData } = useGetLeaveByIdQuery(leaveId);

  const leaveDataForCancel = leaveData?.leave || {};

  const handleCancel = async () => {
    try {
      const res = await cancelLeaveRequest(leaveId).unwrap();

      dispatch(
        setSuccessFeedback({
          message: res.message || "Leave request cancelled successfully",
        })
      );
      setTimeout(() => {
        dispatch(closeModal());
        dispatch(resetSuccessFeedback());
      }, 1500);
    } catch (error) {
      console.error("Error cancel leave request:", error);
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

      <h1 className="text-2xl">{isSuccess ? "Cancelled!" : "Are you sure?"}</h1>

      <p className="text-textSecondary text-center">
        {isSuccess ? (
          message || "Leave request cancelled successfully."
        ) : (
          <>
            Are you sure you want to cancel{" "}
            <span className="text-red-600">{`${formatDate(
              leaveDataForCancel?.startDate
            )} - ${formatDate(leaveDataForCancel?.endDate)}`}</span>{" "}
            <span className="text-sm capitalize text-gray-600 bg-gray-200 rounded px-2 py-0.5 mr-1">
              {leaveDataForCancel?.leaveType}
            </span>
            leave request? This action cannot be undone.
          </>
        )}
      </p>

      {!isSuccess && (
        <div className="flex justify-between w-full gap-2 mt-5">
          <button
            onClick={() => dispatch(closeModal())}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            No, Keep It
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Yes, Cancel It
          </button>
        </div>
      )}
    </div>
  );
};

export default CancelLeaveRequestModal;
