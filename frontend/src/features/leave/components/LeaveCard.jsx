import React from "react";
import { STATUS_UI } from "../../appointments/components";
import { CircleX } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../components/modal/modalSlice";

const LeaveCard = ({
  leaveId,
  month,
  leaveCategory,
  leavePeriod,
  leaveType,
  reason,
  status,
}) => {
  const dispatch = useDispatch();

  const handleCancelModalOpen = (id) => {
    dispatch(
      openModal({
        modalType: "CANCEL_LEAVE_REQUEST",
        modalProps: { leaveId: id },
      })
    );
  };

  return (
    <div className="py-3 px-5">
      <h1 className="text-gray-600 font-semibold text-xl">{month}</h1>
      <div className="border mt-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 space-y-2">
          <div>
            <p className="font-medium capitalize">{leaveCategory} Leave</p>
            <p className="text-sm text-gray-500">{leavePeriod}</p>

            <div className="flex flex-col sm:flex-row gap-2">
              <span className="text-sm capitalize text-gray-600 bg-gray-200 rounded px-2 py-0.5">
                {leaveType}
              </span>
              <p className="text-sm capitalize  text-primary border rounded px-2 py-0.5 ">
                Reason: <span className="text-red-500">{reason}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center">
            {STATUS_UI[status] && (
              <span
                className={`text-sm capitalize w-full text-center ${STATUS_UI[status].className} rounded px-2 py-1`}
              >
                {STATUS_UI[status].label}
              </span>
            )}
            {status === "pending" && (
              <CircleX
                onClick={()=>handleCancelModalOpen(leaveId)}
                title="Cancel Leave Request"
                className="text-red-600 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCard;
