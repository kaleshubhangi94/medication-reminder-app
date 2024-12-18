import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAcknowledgmentLogs = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
