import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import MedicineSchedule from "./pages/MedicineSchedule"; // Import MedicineSchedule page
import Login from "./pages/Login"; // Import Login page

const App = () => {
  const [userRole, setUserRole] = useState(null); // Holds the user's role (e.g., 'user', 'admin')

  useEffect(() => {
    // Fetch user role from localStorage or context
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the JWT token
      setUserRole(decoded.role); // Set the user's role
    }
  }, []);

  // Protected Route logic for Version 5
  const ProtectedRoute = ({ component: Component, roleRequired, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        if (!userRole) {
          // Redirect if no user role
          return <Redirect to="/login" />;
        }
        if (roleRequired && roleRequired !== userRole) {
          // Redirect if role does not match
          return <Redirect to="/schedule" />;
        }
        return <Component {...props} />;
      }}
    />
  );

  return (
    <Router>
      <Switch>
        {/* Public Routes */}
        <Route exact path="/login" component={Login} />

        {/* Protected Routes */}
        <ProtectedRoute
          exact
          path="/schedule"
          roleRequired="user"
          component={MedicineSchedule}
        />

        {/* Default Route */}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
