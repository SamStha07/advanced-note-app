import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';
import { ChildrenProp } from '../types';

const PublicRoute: React.FC<ChildrenProp> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to='/' />;
  }

  return children;
};

export default PublicRoute;
