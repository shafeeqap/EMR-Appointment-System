import React from "react";
import Loader from "../../../components/ui/Loader";

const ChartWrapper = ({ title, isLoading, error, data, children }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">{title}</h2>
      </div>

      {/* Content */}
      <div className="h-[300px] w-full min-w-0 ">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">Something went wrong</p>
        ) : !data || data.length === 0 ? (
          <p>No data available</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default ChartWrapper;
