import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetLeaveByIdQuery } from "../leaveApiSlice";
import { formatDate } from "../../../utils/formatDate";
import DetailRow from "./DetailRow";
import { Button, Loader, STATUS_UI } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import {
  CalendarDays,
  CircleX,
  ClipboardList,
  UserCheck,
  X,
} from "lucide-react";
import { getFullName } from "../../../utils/userHelpers";
import { closeModal } from "../../../components/modal/modalSlice";

const LeaveDetailsModal = () => {
  const { leaveId } = useSelector((state) => state.modal.modalProps || {});

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetLeaveByIdQuery(leaveId, {
    skip: !leaveId,
  });

  const leave = data?.leave;

  const start = new Date(leave?.startDate);

  const end = new Date(leave?.endDate);

  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (isError) return <ErrorMessage />;

  const statusConfig = STATUS_UI[leave?.status];
  const Icon = statusConfig?.icon;
  const fullName = getFullName(leave?.employeeId);

  const initials = fullName
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="md:w-[700px]">
      {/* Header */}

      <div className="flex items-center justify-between border-b px-2 py-4">
        <h2 className="text-xl font-semibold">Leave Details</h2>

        <button
          onClick={() => dispatch(closeModal())}
          className="text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Employee */}

        <div className="border rounded-xl p-5 flex flex-col sm:flex-row gap-5 justify-between sm:items-start">
          <div className="flex flex-col items-center sm:flex-row gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-100 flex items-center justify-center text-xl md:text-2xl font-bold text-indigo-700">
              {initials}
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h3 className="md:text-xl font-semibold">{fullName}</h3>
                <span className="hidden md:block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  EMP001
                </span>
              </div>

              <p className="text-gray-600 capitalize">{leave?.employeeType}</p>

              <p className="text-gray-500 text-sm mt-1">{"Department"}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase">Status</p>

            {statusConfig && (
              <span
                className={`inline-flex items-center gap-2 mt-1 px-2 py-1 text-sm font-medium text-center rounded-full ${statusConfig.className}`}
              >
                {Icon && <Icon size={16} />}
                {statusConfig.label}
              </span>
            )}

            <p className="mt-1 text-sm text-gray-500">
              Applied on {formatDate(leave.createdAt)}
            </p>
          </div>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leave Information */}
          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <ClipboardList className="text-violet-600" />

              <h3 className="font-semibold text-lg">Leave Information</h3>
            </div>

            <DetailRow label="Leave Category" value={leave.leaveCategory} />

            <DetailRow label="Leave Type" value={leave.leaveType} />

            <DetailRow label="Total Days" value={`${totalDays || "-"} Days`} />

            <DetailRow label="Reason" value={leave.reason} />
          </div>

          {/* Duration */}
          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <CalendarDays className="text-green-600" />

              <h3 className="font-semibold text-lg">Leave Duration</h3>
            </div>

            <DetailRow label="Start Date" value={formatDate(leave.startDate)} />

            <DetailRow label="End Date" value={formatDate(leave.endDate)} />

            <DetailRow label="Duration" value={`${totalDays || "-"} Days`} />

            <DetailRow label="Session" value={leave.leaveType} />
          </div>
        </div>

        {/* Approval */}
        <div className="border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <UserCheck className="text-blue-600" />

            <h3 className="font-semibold text-lg">Approval Information</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <DetailRow
                label="Approver"
                value={getFullName(leave.approvedBy) || "-"}
              />

              <DetailRow
                label="Designation"
                value={leave.approvedBy?.role.replace(/_/g, " ") || "-"}
              />
            </div>

            <div>
              <DetailRow label="Approval Status" value={statusConfig?.label} />

              <DetailRow
                label="Approved On"
                value={formatDate(leave.updatedAt)}
              />

              <DetailRow label="Comments" value={leave.comment || "-"} />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 pt-2">
          {leave?.status === "pending" && (
            <Button variant="danger" className="flex items-center gap-2">
              <CircleX size={18} />
              Cancel Request
            </Button>
          )}

          <Button onClick={() => dispatch(closeModal())} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetailsModal;
