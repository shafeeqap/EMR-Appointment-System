import React from "react";
import { BarChart } from "../../../../components/charts";
import DoctorTooltip from "../../../../components/charts/Tooltip";

const DoctorWorkload = ({ data }) => {
  return (
    <div className="h-full w-full">
      <BarChart
        data={data}
        xKey="name"
        tooltipContent={<DoctorTooltip/>}
        xAxisProps={{
          angle: -30,
          textAnchor: "end",
          height: 60,
        }}
        bars={[
          { dataKey: "value", color: "#82ca9d" },
          // { dataKey: "department", color: "#8884d8" },
        ]}
      />
    </div>
  );
};

export default React.memo(DoctorWorkload);
