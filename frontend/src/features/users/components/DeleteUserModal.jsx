import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteUserMutation } from "../userApiSlice";
import { toast } from "react-toastify";
import { closeModal } from "../../../components/modal/modalSlice";
import { handleApiError } from "../../../utils/handleApiError";
import { Trash2 } from "lucide-react";
import { getFullName } from "../../../utils/userHelpers";

const DeleteUserModal = () => {
  const { userData } = useSelector((state) => state.modal.modalProps || {});
  console.log(userData, "User data...");

  const fullName = getFullName(userData);
  const [deleteUser] = useDeleteUserMutation();

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const res = await deleteUser(userData._id).unwrap();
      toast.success(res.message || "User deleted successfully");

      dispatch(closeModal());
    } catch (error) {
      console.error("Error deleting user:", error);
      handleApiError(error);
    }
  };

  return (
    <div className="flex flex-col items-center px-5 py-5 space-y-3 w-64 sm:w-fit max-w-sm">
      <Trash2 strokeWidth={1.25} size={60} className="text-red-600" />
      <h1 className="text-2xl">Are you sure?</h1>
      <p className="text-textSecondary text-center">
        Are you sure you want to delete{" "}
        <span className="text-red-600">{fullName}'s</span> records? This process
        cannot be undone.
      </p>

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
    </div>
  );
};

export default DeleteUserModal;
