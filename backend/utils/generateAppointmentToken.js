import { TokenCounter } from "../models/TokenCounter.js";

export const generateAppointmentToken = async (doctorId, date) => {
  // console.log(`Generating token for doctorId: ${doctorId}, date: ${date}...`);
  
  const appointmentToken = await TokenCounter.findOneAndUpdate(
    { doctorId, date },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  );

  return appointmentToken.seq;
};
