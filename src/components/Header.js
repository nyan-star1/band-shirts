import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Header.css';

const Header = () => {
  const { isLoggedIn, username, logout, role } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="/TopMakerLogo.webp" alt="Logo" />
      </Link>
      <div className="site-title">
        {isLoggedIn ? `TopMaker - ${username}` : 'TopMaker'}
      </div>
      <nav>
        {isLoggedIn ? (
          <>
            {role === 'admin' && <Link to="/admin">Make an item</Link>}
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
