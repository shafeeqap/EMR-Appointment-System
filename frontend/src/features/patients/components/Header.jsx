import React from "react";
import { Button } from "../../../components/ui";

const Header = ({ initials, patient }) => {
  return (
    <div className="border rounded-xl p-5">
      <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between">
        <div className="flex flex-col sm:items-center sm:flex-row gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-100 flex items-center justify-center text-xl md:text-2xl font-bold text-indigo-700">
            {initials}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h3 className="md:text-xl font-semibold">{patient?.name}</h3>
              <span className="hidden md:block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {patient?.patientId}
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-1">Active</p>
          </div>
        </div>

        <div className="bgre space-x-4">
          <Button>Book Appointment</Button>
        </div>
      </div>

      <div className="border-t mt-5 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <p className="font-medium text-gray-800">Phone</p>
            <span className="text-gray-500">{patient?.mobile}</span>
          </div>
          <div>
            <p className="font-medium text-gray-800">Age</p>
            <span className="text-gray-500">{patient?.age}</span>
          </div>
          <div>
            <p className="font-medium text-gray-800">Gender</p>
            <span className="text-gray-500 capitalize">{patient?.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
