// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get user info without verifying (for UI purposes)
      const user = JSON.parse(atob(token.split('.')[1]));
      setAuth({ token, user });
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const user = JSON.parse(atob(token.split('.')[1]));
    setAuth({ token, user });
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;