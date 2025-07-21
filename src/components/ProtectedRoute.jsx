import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '../hooks/useAuth.js';

const ProtectedRoute = ({ children, roles = [], requireAll = false }) => {
  const { isAuthenticated, isLoading, isRefreshing, hasRole, hasAnyRole } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication or refreshing token
  if (isLoading || isRefreshing) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <Spin size="large" tip="Verifying authentication..." />
      </div>
    );
  }

  // If not authenticated, redirect to login with return url
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Check role-based access if roles are specified
  if (roles.length > 0) {
    const hasRequiredRole = requireAll
      ? roles.every(role => hasRole(role))
      : hasAnyRole(roles);

    if (!hasRequiredRole) {
      return (
        <Navigate
          to="/unauthorized"
          state={{ from: location }}
          replace
        />
      );
    }
  }

  return children;
};

export default ProtectedRoute;
