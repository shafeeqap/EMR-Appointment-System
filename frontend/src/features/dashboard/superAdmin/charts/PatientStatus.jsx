import React from "react";
import { useGetAdminDashboardDataQuery } from "../adminDashboardApiSlice";
import { PieChart } from "../../../../components/charts";

const PatientStatus = () => {
  const { data } = useGetAdminDashboardDataQuery();

  const totalStatus = data?.data?.charts?.appointmentsByStatus || [];

  const statusData = totalStatus?.map((item) => ({
    name:
      item._id.charAt(0).toUpperCase() + item._id.slice(1).replace("_", " "),
    value: item.total,
  }));

  return (
    <div className="w-full h-full">
      <PieChart data={statusData} />
    </div>
  );
};

export default React.memo(PatientStatus);
