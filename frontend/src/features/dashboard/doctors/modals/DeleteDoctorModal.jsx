import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../components/modal/modalSlice";
import { Trash2 } from "lucide-react";
import { useDeleteDoctorMutation } from "../doctorsApiSlice";
import { handleApiError } from "../../../../utils/handleApiError";
import { toast } from "react-toastify";
import { getFullName } from "../../../../utils/userHelpers";

const DeleteDoctorModal = () => {
  const { doctorData } = useSelector((state) => state.modal.modalProps || {});
  const [deleteDoctor] = useDeleteDoctorMutation();

  const fullName = getFullName(doctorData);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const res = await deleteDoctor(doctorData._id).unwrap();
      toast.success(res.message || "Doctor deleted successfully");

      dispatch(closeModal());
    } catch (error) {
      console.error("Error deleting doctor:", error);
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

export default DeleteDoctorModal;
