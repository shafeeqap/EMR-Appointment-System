import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateDepartmentStatusMutation } from '../departmentApiSlice';
import { resetSuccessFeedback, setSuccessFeedback } from '../../../components/successFedback/successFeedbackSlice';
import { closeModal } from '../../../components/modal/modalSlice';
import { handleApiError } from '../../../utils/handleApiError';
import SuccessFeedback from '../../../components/successFedback/SuccessFeedback';
import { OctagonAlert } from 'lucide-react';

const UpdateDepartmentStatusModal = () => {
  const { departmentData } = useSelector((state) => state.modal.modalProps || {});
  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const [updateDepartmentStatus] = useUpdateDepartmentStatusMutation();

  
  const dispatch = useDispatch();

  const status = !departmentData.isActive;

  const handleUpdateStatus = async () => {
    try {
      const res = await updateDepartmentStatus({
        id: departmentData._id,
        status,
      }).unwrap();

      dispatch(
        setSuccessFeedback({
          message: res.message || "Department status updated successfully",
        })
      );
      setTimeout(() => {
        dispatch(closeModal());
        dispatch(resetSuccessFeedback());
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

    <h1 className="text-2xl">{isSuccess ? "Updated!" : "Are you sure?"}</h1>

    <p className="text-textSecondary text-center">
      {isSuccess ? (
        message || "Department status has been updated successfully."
      ) : (
        <>
          Do you really want to update{" "}
          <span className="text-red-600">{departmentData?.name}'s</span> status? It will
          be{" "}
          {status ? (
            <span className="text-green-600">Active</span>
          ) : (
            <span className="text-red-600">Inactive</span>
          )}{" "}
          after the update.
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
          onClick={handleUpdateStatus}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Update
        </button>
      </div>
    )}
  </div>
  )
}

export default UpdateDepartmentStatusModal