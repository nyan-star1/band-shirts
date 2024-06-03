import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Header.css'; 

const Header = () => {
  const { isLoggedIn, username, role, logout } = useAuth(); // Add role

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img src="/path/to/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="header-title">
        {isLoggedIn ? (
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            [Site Title] - {username}
          </Link>
        ) : (
          '[Site Title]'
        )}
      </div>
      <div className="header-auth">
        {isLoggedIn ? (
          <>
            {role === 'admin' && <Link to="/admin" className="auth-link">Make an item</Link>}
            <button onClick={logout} className="auth-link">Log Out</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="auth-link">Sign Up</Link>
            <Link to="/login" className="auth-link">Log In</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
