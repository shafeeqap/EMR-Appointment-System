import React from "react";
import clsx from "clsx";
import { colorMap } from "../../../constants/colorMap";

const StatusCard = ({ statusCardItems = [], data }) => {
  const stats = data?.data?.stats;

  return (
    <div className="bg-white min-h-28 grid grid-cols-1 sm:grid-cols-4 px-4 py-2 border shadow">
      {statusCardItems.map((item, index) => {
        const colors = colorMap[item?.color];
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
            <div className={clsx(colors?.bg, "w-10 h-10 flex justify-center items-center bg-blue-100 rounded-lg")}>
              <Icon size={25} className={colors?.text} />
            </div>
            <div className="w-full text-center">
              <h2 className="text-lg font-bold">{stats?.[item.key] || 0}</h2>
              <p className="text-textPrimary text-sm truncate">{item.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusCard;
