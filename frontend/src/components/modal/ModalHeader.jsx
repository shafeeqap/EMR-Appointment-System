import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "./modalSlice";
import { X } from "lucide-react";

const ModalHeader = ({ title, icon, description }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <small className="text-gray-500">{description}</small>
        </div>
      </div>

      <button
        onClick={() => dispatch(closeModal())}
        className="text-gray-500 hover:text-black"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ModalHeader;
