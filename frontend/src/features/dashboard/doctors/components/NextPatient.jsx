import React from "react";
import Info from "./Info";
import { Button } from "../../../../components/ui";

const NextPatient = () => {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        Next Patient Details
      </h2>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-lg">
          M
        </div>

        {/* Main Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="text-start">
              <h3 className="text-lg font-semibold text-gray-900">Muhammed</h3>

              <p className="text-sm text-gray-500">General Consultation</p>
            </div>

            <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg">
              PAT 2026/009
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
            <Info label="Age" value="55" />
            <Info label="Gender" value="Male" />
            <Info label="Weight" value="69 kg" />
            <Info label="Height" value="169 cm" />
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            <Info label="Date of Birth" value="22-01-1990" />
            <Info label="Last Appointment" value="22-01-1990" />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button className="px-4 py-2 rounded-lg bg-black text-white text-sm">
              View Details
            </Button>

            <Button variant="secondary">
              Reschedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPatient;
