import React from "react";
import { BarChart } from "../../../../components/charts";

const AppointmentTrends = ({ data }) => {
  console.log(data, 'Appointment trend...');
  
  return (
    <div className="h-full w-full">
      <BarChart
        data={data}
        xKey="name"
        bars={[
          // { dataKey: "appointment", color: "#8884d8" },
          { dataKey: "appointment", color: "#82ca9d" },
        ]}
      />
    </div>
  );
};

export default React.memo(AppointmentTrends);
