import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f7fb] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          <img
            src="/icons.svg"
            alt=""
            className="absolute right-10 top-10 h-28 w-28 opacity-10"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,118,110,0.88),rgba(15,23,42,0.94)),url('/icons.svg')]" />
          <div className="relative flex w-full flex-col justify-center gap-12 px-12 py-10 xl:px-16">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-teal-50">
              <GraduationCap className="h-4 w-4" />
              LeoEducation Admin Portal
            </div>

            <div className="max-w-xl">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-xl">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h1 className="text-5xl font-semibold leading-tight text-white">
                Quản trị trung tâm gọn hơn, rõ ràng hơn.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-teal-50/80">
                Đăng nhập để theo dõi khóa học, học viên, liên hệ và các hoạt động vận hành của LeoEducation trong một màn hình tập trung.
              </p>
            </div>

            <div className="grid max-w-xl grid-cols-1 gap-3 text-white xl:grid-cols-3">
              {[
                ['Realtime', 'Dữ liệu cập nhật nhanh'],
                ['Bảo mật', 'JWT và phân quyền'],
                ['Tập trung', 'Một cổng quản trị'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-teal-50/70">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
          <div className="w-full max-w-[430px] min-w-0">
            <div className="mb-6 flex items-center justify-between sm:mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/25">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900">LeoEducation</p>
                  <p className="text-xs text-slate-500">Đăng nhập quản trị</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-teal-700 shadow-sm ring-1 ring-slate-200">
                <Sparkles className="h-3.5 w-3.5" />
                Secure
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/80 sm:rounded-[1.75rem] sm:p-8">
              <div className="mb-6 sm:mb-7">
                <h2 className="text-2xl font-semibold text-slate-950">Đăng nhập</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Nhập tài khoản admin để tiếp tục vào hệ thống quản trị.
                </p>
              </div>

              {error && (
                <div className="mb-5 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@leoeducation.vn"
                      required
                      autoComplete="email"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100 sm:h-12 sm:rounded-2xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      required
                      minLength={6}
                      autoComplete="current-password"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100 sm:h-12 sm:rounded-2xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((value) => !value)}
                      className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={showPw ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-2 sm:h-12 sm:rounded-2xl"
                >
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  {!loading && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />}
                </button>
              </form>

              <div className="mt-5 text-center sm:mt-6">
                <Link to="/register" className="text-sm font-medium text-teal-700 hover:text-teal-800 hover:underline">
                  Chưa có tài khoản? Đăng ký
                </Link>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-slate-400 sm:mt-6">
              Copyright 2026 LeoEducation. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};
