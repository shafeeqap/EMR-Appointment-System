import React from "react";
import { Button, InfoCard } from "../../../components/ui";
import { Smartphone, UsersRound, VenusAndMars } from "lucide-react";

const PatientInfo = ({ initials, patient }) => {
  // Cards
  const cards = [
    {
      title: "Phone",
      value: patient?.mobile || "N/A",
      icon: Smartphone,
      color: "blue",
    },
    {
      title: "Age",
      value: patient?.age || "N/A",
      icon: UsersRound,
      color: "orange",
    },
    {
      title: "Gender",
      value: patient?.gender || "N/A",
      icon: VenusAndMars,
      color: "pink",
    },
  ];
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

      <div className="border-t mt-5 ">
        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
          {cards.map((card, index) => (
            <InfoCard
              key={card.title}
              {...card}
              className={` ${
                index !== cards.length - 1
                  ? "sm:border-r-2 border-b-2 sm:border-b-0"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
