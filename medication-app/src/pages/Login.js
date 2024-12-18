import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';  // Import useHistory for react-router-dom v5
import { registerUser, loginUser } from '../services/authService';  // Importing API functions

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);  // Toggle between login and registration
  const history = useHistory();  // Initialize useHistory hook for navigation

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      if (isLoginMode) {
        // If in login mode, call the login API
        const data = await loginUser(userData);
        // Store the JWT token in localStorage
        localStorage.setItem('token', data.token);
        console.log("data==", data);

        // Redirect to the medicine schedule page after successful login
        history.push('/schedule');  // Use history.push for navigation (react-router-dom v5)
        
      } else {
        // If in registration mode, call the register API
        const data = await registerUser(userData);
        console.log("data==", data);
        alert(data);
        
        setIsLoginMode(true);  // Switch to login mode after successful registration
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  // Handle toggle between login and registration
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="login-container">
      <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={toggleMode} style={{ cursor: 'pointer', color: 'blue' }}>
        {isLoginMode ? 'Don\'t have an account? Register here' : 'Already have an account? Login here'}
      </p>
    </div>
  );
};

export default Login;
