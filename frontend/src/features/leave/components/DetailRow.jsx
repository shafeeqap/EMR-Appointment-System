import React from "react";

const DetailRow = ({ label, value }) => {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm border-b last:border-none">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right text-gray-800 capitalize">
        {value || "-"}
      </span>
    </div>
  );
};

export default DetailRow;
