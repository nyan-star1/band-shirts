import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import '../css/AuthForm.css';
import { useNavigate, Link } from 'react-router-dom';
import config from '../config';
import Cookies from 'js-cookie';

function Login() {
  const { setIsLoggedIn, setUsername, setUserId, setRole, setToken } = useAuth();
  const [loginUsername, setLoginUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiBaseUrl}/api/auth/login`, { username: loginUsername, password });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUsername(loginUsername);
        setUserId(response.data.userId);
        setRole(response.data.role);
        setToken(response.data.token);

        // Set cookies instead of localStorage
        const expiryTime = config.cookieExpiryMinutes / (24 * 60); // Convert minutes to days
        Cookies.set('userId', response.data.userId, { expires: expiryTime, sameSite: 'Strict' });
        Cookies.set('role', response.data.role, { expires: expiryTime, sameSite: 'Strict' });
        Cookies.set('token', response.data.token, { expires: expiryTime, sameSite: 'Strict' });

        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Error logging in');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <label>
          Username:
          <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        {errorMessage && <div className="feedback-message">{errorMessage}</div>}
      </form>
      <div className="redirect">
        <p>Don't have an account?</p>
        <Link to="/signup"><button>Sign Up</button></Link>
      </div>
    </div>
  );
}

export default Login;
