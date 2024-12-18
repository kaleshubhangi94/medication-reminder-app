// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database-config/db');  // Your MySQL database setup

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) return res.status(500).json({ message: 'Database query error' });

    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ token });  // Send the token in the response
  });
};

// User registration
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
  const newUser = { name, email, password: hashedPassword, role: 'user' };

  db.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database query error' });

    res.status(201).json({ message: 'User registered successfully' });
  });
};
