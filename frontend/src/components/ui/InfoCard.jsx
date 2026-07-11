import React from "react";
import { colorMap } from "../../constants/colorMap";

const InfoCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  onClick,
  className = "",
}) => {
  const colors = colorMap[color];

  return (
    <div className={`flex py-4 ${className}`} onClick={onClick}>
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.bg}`}
        >
          <Icon size={28} className={colors.text} />
        </div>

        <div>
          <small className="text-textPrimary">{title}</small>

          <div className="font-semibold capitalize">{value}</div>

          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
