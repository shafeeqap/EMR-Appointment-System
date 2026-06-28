import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_COMPONENTS } from "./ModalRegistry";
import { closeModal } from "./modalSlice";
import { AnimatePresence, motion } from "framer-motion";

const GlobalModal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        dispatch(closeModal());
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // if (!isOpen || !modalType) return null;

  const Component = MODAL_COMPONENTS[modalType];

  if (modalType && !Component) {
    console.warn(`Unknown modal type: ${modalType}`);
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && modalType && (
        <div className="fixed inset-0 flex pl-10 justify-center items-center z-50">
          {/* Overlay */}
          <motion.div
            // onClick={() => dispatch(closeModal())}
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal Content */}
          <motion.div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-lg shadow-lg sm:p-6 max-h-[580px] overflow-y-auto z-10"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
          >
            <Component {...modalProps} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalModal;
