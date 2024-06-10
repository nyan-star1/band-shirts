import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => Cookies.get('isLoggedIn') === 'true');
  const [username, setUsername] = useState(() => Cookies.get('username') || '');
  const [userId, setUserId] = useState(() => Cookies.get('userId') || '');
  const [role, setRole] = useState(() => Cookies.get('role') || 'user');
  const [token, setToken] = useState(() => Cookies.get('token') || '');

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserId('');
    setRole('user');
    setToken('');
    Cookies.remove('userId');
    Cookies.remove('role');
    Cookies.remove('token');
    Cookies.remove('isLoggedIn');
  };

  useEffect(() => {
    Cookies.set('isLoggedIn', isLoggedIn, { expires: 1 });
  }, [isLoggedIn]);

  useEffect(() => {
    Cookies.set('username', username, { expires: 1 });
  }, [username]);

  useEffect(() => {
    Cookies.set('userId', userId, { expires: 1 });
  }, [userId]);

  useEffect(() => {
    Cookies.set('role', role, { expires: 1 });
  }, [role]);

  useEffect(() => {
    Cookies.set('token', token, { expires: 1 });
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, userId, setUserId, role, setRole, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
