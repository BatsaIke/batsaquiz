// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling
import QuizModal from '../QuizModal';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth', formData);
      const token = response.data.token; // Token received from the backend
      localStorage.setItem('token', token);
      console.log('User logged in successfully!');
      navigate('/quiz')
    } catch (error) {
      console.error(error.response.data); // Handle error messages here
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="label-container">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="label-container">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Log In</button>
      </form>

      {/* Render the modal component */}
      <QuizModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Login;
