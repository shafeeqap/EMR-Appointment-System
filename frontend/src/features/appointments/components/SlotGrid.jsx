import React from "react";
import { Button, Loader } from "../../../components/ui";
import { formatTime } from "../../../utils/formatHours";
import StatusColors from "./StatusColors";

const SlotGrid = ({
  availableSlots = [],
  bookedSlots = [],
  isLoading,
  selectedSlot,
  setSelectedSlot,
}) => {
  const allSlots = [...availableSlots, ...bookedSlots].sort((a, b) =>
    a.localeCompare(b)
  );

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {allSlots?.length > 0 ? (
        <div className="flex flex-col px-5 py-5 border border-gray-300 rounded">
          <h2 className="font-semibold text-lg py-3 uppercase">
            Available Time Slots
          </h2>

          {/* Status Colors */}
          <StatusColors />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 py-5 px-5 bg-white border border-gray-300 rounded h-52 overflow-y-auto">
            {allSlots?.map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              const isSelected = selectedSlot === slot;

              let variant = "slotAvailable";

              if (isBooked) {
                variant = "slotBooked";
              } else if (isSelected) {
                variant = "slotSelected";
              }

              return (
                <Button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  disabled={isBooked}
                  variant={variant}
                  className="text-xs"
                >
                  {formatTime(slot)}
                </Button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="py-5">
          <p className="text-gray-500 col-span-full text-center">
            Please select department, doctor and date to view available slots
          </p>
        </div>
      )}
    </>
  );
};

export default SlotGrid;
