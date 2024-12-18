const db = require('../database-config/db');

// Log acknowledgment for a medicine schedule (whether "Taken" or not)
exports.logAcknowledgment = (req, res) => {
  const { medicineId, status } = req.body;  // status can be 'taken' or 'not_taken'
  const userId = req.user.id;

  const newLog = { userId, medicineId, status, timestamp: new Date() };

  db.query('INSERT INTO acknowledgment_logs SET ?', newLog, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(201).json({ message: 'Acknowledgment logged successfully' });
  });
};

// Get acknowledgment logs (Super Admin)
exports.getAcknowledgmentLogs = (req, res) => {
  const { userId, startDate, endDate } = req.query;  // Optional filters for Super Admin

  let query = 'SELECT * FROM acknowledgment_logs';
  let params = [];

  if (userId) {
    query += ' WHERE userId = ?';
    params.push(userId);
  }

  if (startDate && endDate) {
    query += userId ? ' AND' : ' WHERE';
    query += ' timestamp BETWEEN ? AND ?';
    params.push(startDate, endDate);
  }

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(result);
  });
};
