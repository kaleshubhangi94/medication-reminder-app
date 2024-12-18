// pages/MedicineSchedule.js

import React, { useState, useEffect } from 'react';
import { acknowledgeMedicine, addMedicineSchedule, getMedicineSchedule } from '../services/medicineService';  // Import the API functions

const MedicineSchedule = () => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch medicines when the component mounts
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getMedicineSchedule();  // Call the API to get medicines
        console.log("datarrr", data); // Check the data structure in the console

        // Check if 'data' is an array and update the state
        if (Array.isArray(data)) {
          setMedicines(data);  // Set the medicines state with the actual data array
        } else {
          setError('Medicine data is not in expected format');
        }
      } catch (err) {
        setError('Failed to fetch medicines');
      }
    };

    fetchMedicines();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  const handleAddMedicine = async () => {
    const medicineData = { name, dosage, scheduleTime };

    try {
      const result = await addMedicineSchedule(medicineData);
      setMessage(result.message);  // Display success message
      setMedicines([...medicines, result.data]);  // Add the new medicine to the list
    } catch (err) {
      setError('Failed to add medicine schedule. Please try again.');
    }
  };
  const handleAcknowledge = async (medicineId) => {
    try {
      const response = await acknowledgeMedicine(medicineId); // Call the API to acknowledge medicine
      console.log("Medicine acknowledged:", response);
      // Optionally update the UI to reflect the acknowledgment (e.g., update state)
      setMedicines(prevMedicines =>
        prevMedicines.map(medicine =>
          medicine.id === medicineId ? { ...medicine, acknowledged: true } : medicine
        )
      );
    } catch (err) {
      console.error("Error acknowledging medicine:", err);
      setError('Failed to acknowledge medicine');
    }
  };

  return (
    <div className="medicine-schedule-container">
      <h2>Add Medicine Schedule</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dosage:</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Schedule Time:</label>
          <input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleAddMedicine}>Add Medicine</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Your Medicine Schedule</h3>
      <ul>
        <div>
          {medicines.length === 0 ? (
            <p>No medicines available</p>
          ) : (
            medicines.map((medicine) => (
              <div key={medicine.id}>
                <h3>{medicine.name}</h3>
                <p>Dosage: {medicine.dosage}</p>
                <p>Schedule Time: {new Date(medicine.schedule_time).toLocaleString()}</p>
                <button onClick={() => handleAcknowledge(medicine.id)}>
                  Mark as Taken
                </button>
                {medicine.acknowledged && <span> - Acknowledged</span>}
              </div>
            ))
          )}
        </div>
      </ul>
    </div>
  );
};

export default MedicineSchedule;
