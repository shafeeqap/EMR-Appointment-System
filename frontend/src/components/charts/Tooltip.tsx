import React from 'react';

const DoctorTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
  
    const doctor = payload[0].payload;
  
    return (
      <div className="bg-white p-3 border rounded shadow">
        <p>
          <strong>{doctor.name}</strong>
        </p>
  
        <p>Department: {doctor.department}</p>
  
        <p>Appointments: {doctor.value}</p>
      </div>
    );
  };

export default DoctorTooltip;

  