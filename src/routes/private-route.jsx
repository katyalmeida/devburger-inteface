import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('devburger:userData'));

  return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};
