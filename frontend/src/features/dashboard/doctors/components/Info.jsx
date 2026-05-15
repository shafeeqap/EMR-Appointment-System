import React from "react";

const Info = ({ label, value }) => {
  return (
    <div className="bg-gray-50 rounded-lg  text-center py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800 mt-1 capitalize">{value}</p>
    </div>
  );
};

export default Info;
