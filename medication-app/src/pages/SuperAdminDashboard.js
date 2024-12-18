import React, { useState, useEffect } from 'react';
import { getAcknowledgmentLogs } from '../services/logService'; // Assume this service fetches logs from API

const SuperAdminDashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAcknowledgmentLogs();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching acknowledgment logs:', error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Super Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Medicine ID</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.userId}</td>
              <td>{log.medicineId}</td>
              <td>{log.status}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminDashboard;
