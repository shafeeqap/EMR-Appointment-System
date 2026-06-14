import React from "react";
import { STATUS_UI } from "../appointments/components";
import { Button } from "../../components/ui";
import { CircleX } from "lucide-react";

const LeaveCard = ({
  month,
  leaveCategory,
  leavePeriod,
  leaveType,
  status,
}) => {
  return (
    <div className="py-3 px-5">
      <h1 className="text-gray-600 font-semibold text-xl">{month}</h1>
      <div className="border mt-3">
        <div className="flex justify-between items-center p-3">
          <div>
            <p className="font-medium capitalize">{leaveCategory} Leave</p>
            <p className="text-sm text-gray-500">{leavePeriod}</p>
            <div>
              <span className="text-sm capitalize text-gray-600 bg-gray-200 rounded px-2 py-0.5">
                {leaveType}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center">
            {STATUS_UI[status] && (
              <span
                className={`text-sm capitalize ${STATUS_UI[status].className} rounded px-2 py-1`}
              >
                {STATUS_UI[status].label}
              </span>
            )}
            {status === "pending" && (
              <CircleX name="cancel" className="text-red-600 cursor-pointer" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCard;
