import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/users/register`, userData);
    console.log("response",response);
    
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to login a user and get JWT token
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/users/login`, credentials);
    console.log("response",response);

    return response.data; // This will contain the JWT token
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
