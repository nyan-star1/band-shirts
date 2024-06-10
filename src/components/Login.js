import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
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
      // Send login request to the backend
      const response = await axios.post(`${config.apiBaseUrl}/api/auth/login`, { username: loginUsername, password }, { withCredentials: true });
      if (response.status === 200) {
        const { userId, role, token } = response.data;
        setIsLoggedIn(true);
        setUsername(loginUsername);
        setUserId(userId);
        setRole(role);
        setToken(token);

        // Set cookies
        const expiryTime = config.cookieExpiryMinutes / (24 * 60); // Convert minutes to days
        Cookies.set('isLoggedIn', true, { expires: expiryTime, sameSite: 'Strict' });
        Cookies.set('userId', userId, { expires: expiryTime, sameSite: 'Strict' });
        Cookies.set('role', role, { expires: expiryTime, sameSite: 'Strict' });
        Cookies.set('token', token, { expires: expiryTime, sameSite: 'Strict' });

        navigate('/');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      // Handle login error
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
