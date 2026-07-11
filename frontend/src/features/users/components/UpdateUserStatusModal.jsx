import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
} from "../userApiSlice";
import { getFullName } from "../../../utils/userHelpers";
import { Loader } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { closeModal } from "../../../components/modal/modalSlice";
import { handleApiError } from "../../../utils/handleApiError";
import { OctagonAlert } from "lucide-react";
import {
  resetSuccessFeedback,
  setSuccessFeedback,
} from "../../../components/successFedback/successFeedbackSlice";
import SuccessFeedback from "../../../components/successFedback/SuccessFeedback";

const UpdateUserStatusModal = () => {
  const { userId } = useSelector((state) => state.modal.modalProps || {});
  const { isSuccess, message } = useSelector((state) => state.successFeedback);

  const { data: userData, isLoading, error } = useGetUserByIdQuery(userId);

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const user = userData?.user;
  const status = !user?.isActive;

  const fullName = getFullName(user);

  const dispatch = useDispatch();

  const handleUpdateStatus = async () => {
    try {
      const res = await updateUserStatus({
        id: user._id,
        status,
      }).unwrap();

      dispatch(
        setSuccessFeedback({
          message: res.message || "User status updated successfully",
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

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
          message || "User status has been updated successfully."
        ) : (
          <>
            Do you really want to update{" "}
            <span className="text-red-600">{fullName}'s</span> status? It will
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
  );
};

export default UpdateUserStatusModal;
