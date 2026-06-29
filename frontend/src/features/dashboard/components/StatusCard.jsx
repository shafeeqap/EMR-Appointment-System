import React from "react";
import clsx from "clsx";

const StatusCard = ({ statusCardItems=[], data }) => {
  const stats = data?.data?.stats;

  return (
    <div className="bg-white min-h-28 grid grid-cols-1 sm:grid-cols-4 px-4 py-2 border shadow">
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
            <div className="w-full">
              <p className="text-textPrimary text-sm truncate text-center">
                {item.title}
              </p>
            </div>
            <h2 className="text-lg font-bold">{stats?.[item.key] || 0}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default StatusCard;
