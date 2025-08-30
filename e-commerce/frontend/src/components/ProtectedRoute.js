// frontend/src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && auth.user.role !== 'admin') {
    return <Navigate to="/" />; // Or a 'Not Authorized' page
  }

  return children;
};

export default ProtectedRoute;