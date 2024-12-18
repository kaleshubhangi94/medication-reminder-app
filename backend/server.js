const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; // The port your backend is running on

// Enable CORS for all domains (you can restrict it later if needed)
app.use(cors());

// For specific domain (if you want to restrict which domain can access your API)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only requests from React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true,  // Allow cookies to be sent along with requests
}));

// Middlewares
app.use(express.json());  // Parse incoming requests with JSON payloads

// Define your routes
// app.post('/api/users/register', (req, res) => {
//   // Registration logic
//   res.send("User registered successfully");
// });
// app.post('/api/users/login', (req, res) => {
//     // Registration logic
//     res.send("User login successfully");
//   });
//   app.use('/api/users', userRoutes);  // This will make routes like /api/users/login work


// Define routes
const userRoutes = require("./routes/userRoutes.js");
const medicineRoutes = require("./routes/medicineRoutes.js");
const logRoutes = require("./routes/logRoutes");

app.use("/api/users", userRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/logs", logRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
