import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();
  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default PrivateRoute;
