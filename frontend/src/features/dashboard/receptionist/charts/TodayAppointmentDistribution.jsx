import React from "react";
import PieChartWithCustomized from "../../../../components/charts/PieChartCustom";

const TodayAppointmentDistribution = ({ data }) => {
  return (
    <div className="w-full h-full">
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-gray-500">No data available</p>
        </div>
      ) : (
        <PieChartWithCustomized data={data} />
      )}
    </div>
  );
};

export default React.memo(TodayAppointmentDistribution);
