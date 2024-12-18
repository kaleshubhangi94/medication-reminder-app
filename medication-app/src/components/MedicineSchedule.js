import React, { useState, useEffect } from 'react';
import { getMedicineSchedules, markMedicineAsTaken } from '../services/medicineService'; // Assume you have these service functions

const MedicineSchedule = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getMedicineSchedules();
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchMedicines();
  }, []);

  const handleAcknowledge = async (medicineId) => {
    try {
      await markMedicineAsTaken(medicineId);
      // Optionally, update the UI to reflect the change immediately
      setMedicines(medicines.map(m => 
        m.id === medicineId ? { ...m, status: 'Taken' } : m
      ));
    } catch (error) {
      console.error("Error acknowledging medicine:", error);
    }
  };

  return (
    <div>
      <h2>Medicine Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Schedule Time</th>
            <th>Status</th>
            <th>Acknowledge</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map(medicine => (
            <tr key={medicine.id}>
              <td>{medicine.name}</td>
              <td>{medicine.dosage}</td>
              <td>{medicine.scheduleTime}</td>
              <td>{medicine.status || 'Pending'}</td>
              <td>
                <button onClick={() => handleAcknowledge(medicine.id)}>Mark as Taken</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineSchedule;
