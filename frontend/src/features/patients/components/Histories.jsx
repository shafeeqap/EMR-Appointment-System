import React from "react";
import { History } from "lucide-react";

const Histories = () => {
  return (
    <div className="flex items-center gap-2 mb-5">
      <History className="text-green-600" />

      <h3 className="font-semibold text-lg text-green-600">
        Appointment History
      </h3>
    </div>
  );
};

export default Histories;
