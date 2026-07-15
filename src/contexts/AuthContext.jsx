import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as loginApi, getMe } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing token on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isLogoutRedirect = params.get('logout') === '1';

    if (isLogoutRedirect) {
      localStorage.removeItem('token');
      setUser(null);
      params.delete('logout');
      const cleanQuery = params.toString();
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ''}`,
      );
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      getMe()
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await loginApi({ username: email, password });
    const { token, ...userData } = res.data || {};
    if (!token) throw new Error(res.message || 'Dang nhap that bai');
    localStorage.setItem('token', token);
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
