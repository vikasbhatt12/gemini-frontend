// src/components/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    // If no token is found, redirect to the login page
    return <Navigate to="/auth" replace />;
  }

  // If a token exists, render the child component (the dashboard)
  return children;
}