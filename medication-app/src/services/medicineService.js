import axios from 'axios';

// The base URL of your backend API (you can put this in .env file for easier configuration)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Function to fetch the medicine schedule
export const getMedicineSchedule = async () => {
  try {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('http://localhost:5000/api/medicines', {
      headers: {
        Authorization: `Bearer ${token}`,  // Attach token to Authorization header
      },
    });
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error('Error fetching medicine schedule:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};


// Function to add a new medicine schedule
export const addMedicineSchedule = async (medicineData) => {
  try {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    const response = await axios.post('http://localhost:5000/api/medicines', medicineData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send token in the Authorization header
      },
    });
console.log("resp000",response);

    return response.data;
  } catch (error) {
    console.error("Error adding medicine schedule:", error);
    throw error;
  }
};

export const acknowledgeMedicine = async (medicineId) => {
  try {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    const response = await axios.post('http://localhost:5000/api/medicines/acknowledge', 
      { medicineId }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Send token in the Authorization header
        },
      }
    );
    console.log("Medicine acknowledged:", response);
    return response.data;
  } catch (error) {
    console.error("Error acknowledging medicine:", error);
    throw error;
  }
};
