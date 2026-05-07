import React from "react";
import clsx from "clsx";
import { useGetDashboardDataQuery } from "../adminDashboardApiSlice";

const StatusCard = ({ statusCardItems, role }) => {
  const { data } = useGetDashboardDataQuery();

  const stats = data?.data?.stats;

  return (
    <div
      className={clsx(
        "bg-white  min-h-28 grid grid-cols-1",
        role === "super_admin" ? "sm:grid-cols-4" : "sm:grid-cols-3",
        "px-4 py-2 border shadow"
      )}
    >
      {statusCardItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={clsx(
              "flex flex-col justify-center items-center px-2 py-2 sm:border-b-0 cursor-pointer",
              index !== statusCardItems.length - 1 && "sm:border-r-2 border-b-2"
            )}
          >
            {/* Icon */}
            <Icon size={30} className="text-icon" />
            <p className="text-textPrimary text-sm">{item.title}</p>
            <h2 className="text-lg font-bold">{stats?.[item.key] || 0}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default StatusCard;
