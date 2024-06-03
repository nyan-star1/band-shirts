import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [username, setUsername] = useState(() => localStorage.getItem("username") || '');
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || '');
  const [role, setRole] = useState(() => localStorage.getItem("role") || 'user'); // Add role
  const [token, setToken] = useState(() => localStorage.getItem("token") || ''); // Add token

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserId('');
    setRole('user');
    setToken('');
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
  };
  
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, userId, setUserId, role, setRole, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
