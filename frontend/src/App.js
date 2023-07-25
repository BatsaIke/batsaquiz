import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Quiz from './components/Quiz';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import './App.css'; // Import the CSS file for external styling

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check if the user is already logged in (e.g., by checking if a token is present in local storage)
    const token = localStorage.getItem('token'); // Replace 'token' with the actual name of your token key
    if (token) {
      // If the user is logged in, navigate directly to the /quiz page
      navigate('/quiz');
      setIsLoggedIn(true); // Update login status to true
    } else {
      setIsLoggedIn(false); // Update login status to false
    }
  }, [navigate]);

  // Function to handle the logout action
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setIsLoggedIn(false); // Update login status to false
  };

  // Function to render the navigation links based on user authentication status
  const renderNavigationLinks = () => {
    if (isLoggedIn) {
      // User is logged in, show "Home" and "Logout" buttons
      return (
        <>
          <li>
            <Link to="/quiz">Home</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      );
    } else {
      // User is logged out, show "Login" and "Sign Up" buttons
      return (
        <>
          <li>
            <Link to="/">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>
      );
    }
  };

  return (
    <div className="container">
      <nav>
        <ul>
          {renderNavigationLinks()}
        </ul>
      </nav>

      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
