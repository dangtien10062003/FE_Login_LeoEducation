import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000';

const buildAdminUrl = (token) => {
  const url = new URL(ADMIN_URL, window.location.origin);
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    url.hostname = window.location.hostname;
  }
  url.searchParams.set('token', token || '');
  return url.toString();
};

const LoadingScreen = () => (
  <div className="flex h-screen items-center justify-center text-gray-400">Đang tải...</div>
);

const RedirectToAdmin = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    window.location.replace(buildAdminUrl(token));
  }, []);

  return <LoadingScreen />;
};

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children || <RedirectToAdmin />;
};

export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) return <RedirectToAdmin />;
  return children;
};
