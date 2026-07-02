import { findAppointment } from "../repositories/appointmentRepository.js";
import { findDoctorOne } from "../repositories/doctorRepository.js";
import { findOneLeave } from "../repositories/leaveRepository.js";
import { formattedDate } from "../utils/formattedDate.js";

// =============> generate available slots <=============
export const generateAvailableSlots = async (data) => {
  const { doctorId, date } = data;

  const { startTime, endTime } = formattedDate(date);

  const doctor = await findDoctorOne({ _id: doctorId });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // const leave = await findOneLeave({
  //   employeeId: doctorId,
  //   startDate: { $lte: date },
  //   endDate: { $gte: date },
  //   status: "approved",
  // });

  // console.log(leave, 'Leave');
  

  const appointments = await findAppointment(
    {
      doctorId,
      date: { $gte: startTime, $lt: endTime },
    },
    { slotTime: 1, _id: 0 }
  ).lean();

  const bookedSlots = new Set(appointments.map((a) => a.slotTime));

  const allSlots = generateSlots(
    doctor.workingHours.start,
    doctor.workingHours.end,
    doctor.slotDuration
  );

  const now = new Date();

  const slotsWithoutBreaks = removeBreakTimeSlots(allSlots, doctor.breakTimes);

  const availableSlots = slotsWithoutBreaks.filter(
    (slot) => !bookedSlots.has(slot)
  );

  const pastSlots = now.toTimeString().slice(0, 5);

  const slotsAfterCurrentTime = availableSlots.filter(
    (slot) => slot > pastSlots
  );

  const today = new Date().toISOString().split("T")[0];

  return {
    availableSlots: date === today ? slotsAfterCurrentTime : availableSlots,
    bookedSlots: Array.from(bookedSlots),
  };
};

// =============> Generate time slots <=============
function generateSlots(start, end, slotDuration) {
  const slots = [];

  let [startHours, startMinutes] = start.split(":").map(Number);
  let [endHours, endMinutes] = end.split(":").map(Number);

  let currentTime = new Date();
  currentTime.setHours(startHours, startMinutes, 0);

  const endTime = new Date();
  endTime.setHours(endHours, endMinutes, 0);

  while (currentTime < endTime) {
    const time = currentTime.toTimeString().slice(0, 5);

    slots.push(time);

    currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
  }

  return slots;
}

// =============> Remove break time slots from the available slots <=============
function removeBreakTimeSlots(slots, breakTimes) {
  return slots.filter((slot) => {
    for (const breakTime of breakTimes) {
      if (slot >= breakTime.start && slot < breakTime.end) {
        return false; // remove this slot if it falls within the break time
      }
    }

    return true; // keep this slot if it does not fall within any break time
  });
}
