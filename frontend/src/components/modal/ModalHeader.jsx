import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "./modalSlice";
import { X } from "lucide-react";

const ModalHeader = ({ title, icon, description }) => {
  const dispatch = useDispatch();
  return (
    <header className="flex items-center justify-between px-1 border-b pb-4">
      <div className="flex items-center gap-3">
        {icon && (
        <div className="hidden sm:inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        )}

        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description &&(
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => dispatch(closeModal())}
        aria-label="Close modal"
        className="text-gray-500 hover:text-black"
      >
        <X size={20} />
      </button>
    </header>
  );
};

export default ModalHeader;
