import React from "react";
import { LineChart } from "../../../../components/charts";

const DailyAppointmentsTimelineChart = ({ data }) => {
  // console.log(data, 'Data daily appointment...');
  
  return (
    <div className="w-full h-full">
      <LineChart
        data={data}
        xKey="name"
        lines={[
          { dataKey: "appointment", stroke: "var(--color-chart-1)" },
          // { dataKey: "appointment", stroke: "var(--color-chart-2)" },
        ]}
      />
    </div>
  );
};

export default React.memo(DailyAppointmentsTimelineChart);
