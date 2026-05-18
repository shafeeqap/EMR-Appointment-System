import React from "react";
import { PieChart } from "../../../../components/charts";

// #region Sample data
const data = [
  { name: "New Patients", value: 50 },
  { name: "Old Patients", value: 200 },
  { name: "Total Patients", value: 250 },
];
// #endregion
const PatientSummary = () => {
  return (
    <div className="w-full h-[300px]">
      <PieChart data={data} />
    </div>
  );
};

export default React.memo(PatientSummary);
