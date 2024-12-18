import React from 'react';

// MedicineCard component that displays a single medicine's details
const MedicineCard = ({ medicine, onAcknowledge }) => {
  return (
    <div className="medicine-card">
      <h3>{medicine.name}</h3>
      <p>Dosage: {medicine.dosage}</p>
      <p>Scheduled Time: {medicine.scheduleTime}</p>
      <button onClick={() => onAcknowledge(medicine.id)}>Mark as Taken</button>
    </div>
  );
};

export default MedicineCard;
