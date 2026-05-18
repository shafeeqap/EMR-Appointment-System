import React from "react";
import Info from "./Info";
import { Button } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../components/modal/modalSlice";
import { useStartConsultationMutation } from "../../../appointments/appointmentApiSlice";
import { handleApiError } from "../../../../utils/handleApiError";

const PatientDetails = () => {
  const { appointmentData } = useSelector(
    (state) => state.modal.modalProps || {}
  );
  console.log(appointmentData, "Patient Data...");


  const dispatch = useDispatch();

  const [startConsultation] = useStartConsultationMutation();

  const handleStartConsultation = async () => {
    // if (!status || status === currentStatus) {
    //   toast.info("No changes detected");
    //   return;
    // }

    try {
      const res = await startConsultation({
        appointmentId: appointmentData._id,
        doctorId: appointmentData.doctorId,
        date: appointmentData.date,
      }).unwrap();
      console.log(res, "Start doctor consultation...");

      // dispatch(
      //   setSuccessFeedback({
      //     message: res.message || "Appointment status updated successfully",
      //   })
      // );

      // setTimeout(() => {
      //   dispatch(closeModal());
      //   dispatch(resetSuccessFeedback());
      // }, 1500);

      dispatch(closeModal());
    } catch (error) {
      console.error(error);
      handleApiError(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
      <div className="flex justify-between space-x-2 px-3 py-2 rounded-lg">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-lg">
          {appointmentData?.name?.split("")[0]}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-start">
            <h3 className="text-lg font-semibold text-gray-900">
              {appointmentData?.name}
            </h3>

            <p className="text-sm text-gray-800">{appointmentData.notes}</p>
          </div>

          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg">
            {appointmentData.patientId}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <Info label="Age" value={appointmentData.age} />
        <Info label="Gender" value={appointmentData.gender} />
        <Info label="Weight" value={"65 kg"} />
        <Info label="Height" value={"165 cm"} />
        <Info label="Date of Birth" value={"23-05-2000"} />
        <Info label="Last Appointment" value={"23-04-2026"} />
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={() => dispatch(closeModal())} variant="secondary">
          Close
        </Button>

        <Button onClick={handleStartConsultation}>Start Consultation</Button>
      </div>
    </div>
  );
};

export default PatientDetails;
