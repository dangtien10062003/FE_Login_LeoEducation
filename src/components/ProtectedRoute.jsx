import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen text-gray-400">Đang tải...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen text-gray-400">Đang tải...</div>;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};
