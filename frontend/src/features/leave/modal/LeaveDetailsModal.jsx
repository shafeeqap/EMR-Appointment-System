import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetLeaveByIdQuery } from "../leaveApiSlice";
import { formatDate } from "../../../utils/formatDate";
import { Button, DetailRow, Loader, StatusBadge } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import {
  CalendarDays,
  CircleX,
  ClipboardList,
  SquareArrowRightExit,
  UserCheck,
  X,
} from "lucide-react";
import { getFullName } from "../../../utils/userHelpers";
import { closeModal } from "../../../components/modal/modalSlice";
import ModalHeader from "../../../components/modal/ModalHeader";
import clsx from "clsx";
import { colorMap } from "../../../constants/colorMap";

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

  const fullName = getFullName(leave?.employeeId);

  const initials = fullName
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  // Details
  const details = [
    {
      title: "Leave Information",
      icon: ClipboardList,
      color: "violet",
      fields: [
        { label: "Leave Category", value: () => leave?.leaveCategory },
        { label: "Leave Type", value: () => leave?.leaveType },
        { label: "Total Days", value: () => `${totalDays || "-"} Days` },
        { label: "Reason", value: () => leave?.reason },
      ],
    },
    {
      title: "Leave Duration",
      icon: CalendarDays,
      color: "green",
      fields: [
        { label: "Start Date", value: () => formatDate(leave.startDate) },
        { label: "End Date", value: () => formatDate(leave.endDate) },
        { label: "Duration", value: () => `${totalDays || "-"} Days` },
        { label: "Session", value: () => leave?.leaveType },
      ],
    },
    {
      title: "Approval Information",
      icon: UserCheck,
      color: "blue",
      colSpan: 2,
      fields: [
        {
          label: "Approver",
          value: () => getFullName(leave.approvedBy) || "-",
        },
        {
          label: "Designation",
          value: () => leave.approvedBy?.role.replace(/_/g, " ") || "-",
        },
        {
          label: "Approval Status",
          value: () => <StatusBadge data={{ status: leave?.status }} />,
        },
        { label: "Approved On", value: () => formatDate(leave.updatedAt) },
        { label: "Comments", value: () => leave?.comment || "-" },
      ],
    },
  ];

  // Approval
  const Approval = [];

  return (
    <div className="w-[80vw] max-w-5xl">
      {/* Header */}
      <ModalHeader
        title="Leave Details"
        icon={<SquareArrowRightExit size={40} className="text-primary" />}
        description="View leave information, duration and status"
      />

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

              <p className="text-gray-500 text-sm mt-1">Department</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase">Status</p>

            <StatusBadge data={{ status: leave?.status }} />

            <p className="mt-1 text-sm text-gray-500">
              Applied on {formatDate(leave.createdAt)}
            </p>
          </div>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {details.map((item) => {
            const Icon = item?.icon;
            const colors = colorMap[item?.color];

            return (
              <div
                key={item.title}
                className={clsx(
                  "border rounded p-4",
                  item.colSpan === 2 && "lg:col-span-2"
                )}
              >
                <div className="flex items-center gap-2 mb-5">
                  <Icon className={colors.text} />
                  <h3 className={clsx(colors.text, "font-semibold text-lg")}>
                    {item.title}
                  </h3>
                </div>

                {item.render
                  ? item.render()
                  : item.fields.map((field) => (
                      <DetailRow
                        key={field.label}
                        label={field.label}
                        value={field.value()}
                      />
                    ))}
              </div>
            );
          })}
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
