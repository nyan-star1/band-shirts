import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AuthForm.css';
import config from '../config'; 

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role to user
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${config.apiBaseUrl}/api/auth/signup`, { username, password, role });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            setErrorMessage("Username already exists. Please choose a different one.");
            break;
          default:
            setErrorMessage("Error during registration. Please try again later.");
            break;
        }
      } else {
        setErrorMessage("Unable to connect to the server. Please try again later.");
      }
    }
  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className="auth-form">
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <button type="submit">Sign Up</button>
        {errorMessage && <div className="feedback-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default SignUp;
