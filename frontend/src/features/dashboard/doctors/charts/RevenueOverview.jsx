import React from "react";
import { PieChart } from "../../../../components/charts";

// #region Sample data
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
// #endregion
const RevenueOverview = () => {
  return (
    <div className="w-full h-[300px]">
      <PieChart data={data} />
    </div>
  );
};

export default React.memo(RevenueOverview);
