import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Shield, Clock, CheckCircle } from 'lucide-react';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Auto-redirect to FE_Admin after login
  useEffect(() => {
    if (user) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            const token = localStorage.getItem('token');
            // Redirect to FE_Admin with token
            window.location.href = `http://localhost:3000?token=${token}`;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [user]);

  const handleGoToAdmin = () => {
    const token = localStorage.getItem('token');
    window.location.href = `http://localhost:3000?token=${token}`;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">LeoEducation</h1>
            <p className="text-xs text-slate-400">Auth Portal</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" /> Đăng xuất
        </button>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        {/* Success Banner */}
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Đăng nhập thành công!</p>
            <p className="text-sm text-green-600">Tự động chuyển đến Admin Dashboard sau {countdown}s...</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Xin chào, {user?.fullName || 'Admin'}! 👋</h2>
          <p className="text-slate-500 text-sm">Chào mừng bạn đến với LeoEducation</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-teal-600" /> Thông tin tài khoản
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Họ tên:</span>
              <p className="font-medium text-slate-800">{user?.fullName || '—'}</p>
            </div>
            <div>
              <span className="text-slate-500">Email:</span>
              <p className="font-medium text-slate-800">{user?.email || '—'}</p>
            </div>
            <div>
              <span className="text-slate-500">Vai trò:</span>
              <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700 ml-2">Admin</span>
            </div>
            <div>
              <span className="text-slate-500">User ID:</span>
              <p className="font-medium text-slate-800">#{user?.id || '—'}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button onClick={handleGoToAdmin} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-teal-600" />
            </div>
            <h4 className="font-medium text-slate-800 text-sm">Admin Dashboard</h4>
            <p className="text-xs text-slate-500 mt-1">Quản lý hệ thống →</p>
          </button>
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-medium text-slate-800 text-sm">Tài khoản</h4>
            <p className="text-xs text-slate-500 mt-1">Quản lý người dùng</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="font-medium text-slate-800 text-sm">Nhật ký</h4>
            <p className="text-xs text-slate-500 mt-1">Lịch sử hoạt động</p>
          </div>
        </div>
      </main>
    </div>
  );
};
