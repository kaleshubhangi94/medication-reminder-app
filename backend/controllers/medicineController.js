const db = require('../database-config/db');

// Backend code: Add a new medicine schedule
exports.addMedicineSchedule = (req, res) => {
  const { name, dosage, scheduleTime } = req.body;
  const userId = req.user.id;  // Ensure user ID is pulled from the JWT token

  const newMedicine = { user_id: userId, name, dosage, schedule_time: scheduleTime };

  db.query('INSERT INTO medicines SET ?', newMedicine, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(201).json({
      message: 'Medicine schedule added successfully',
      data: { id: result.insertId, ...newMedicine }, // Send the inserted medicine data with its ID
    });
  });
};

// Get all medicine schedules for a user
exports.getMedicineSchedules = (req, res) => {
  const userId = req.user.id;  // This should come from the decoded JWT token

  db.query('SELECT * FROM medicines WHERE user_id = ?', [userId], (err, result) => {  // Changed userId to user_id
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(result);
  });
};

// Update a medicine schedule
exports.updateMedicineSchedule = (req, res) => {
  const { id } = req.params;
  const { name, dosage, scheduleTime } = req.body;

  db.query('UPDATE medicines SET name = ?, dosage = ?, scheduleTime = ? WHERE id = ?', 
    [name, dosage, scheduleTime, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json({ message: 'Medicine schedule updated successfully' });
  });
};

// Delete a medicine schedule
exports.deleteMedicineSchedule = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM medicines WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json({ message: 'Medicine schedule deleted successfully' });
  });
};

exports.acknowledgeMedicine = (req, res) => {
  const { medicineId } = req.body;
  const userId = req.user.id;  // Get the userId from the decoded token

  if (!medicineId) {
    return res.status(400).json({ message: 'Medicine ID is required' });
  }

  // Query to update the medicine status to acknowledged
  db.query('UPDATE medicines SET acknowledged = 1 WHERE id = ? AND user_id = ?', [medicineId, userId], (err, result) => {
    if (err) {
      console.error("Error updating medicine:", err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Medicine not found or not assigned to this user' });
    }

    res.status(200).json({ message: 'Medicine marked as taken successfully' });
  });
};
