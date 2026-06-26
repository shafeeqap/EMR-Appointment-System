import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({
  data,
  xKey,
  bars,
  xAxisProps = {},
  tooltipContent,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} {...xAxisProps} />

        <YAxis />
        <Tooltip content={tooltipContent} />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            fill={bar.color}
            radius={[10, 10, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
