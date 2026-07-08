const API_BASE = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.PROD ? 'https://be-leoeducation.onrender.com/api' : '/api');

const buildUrl = (path, params) => {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value);
  });

  const queryString = query.toString();
  return `${API_BASE}${path}${queryString ? `?${queryString}` : ''}`;
};

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(buildUrl(path, options.params), { ...options, headers });
  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401) localStorage.removeItem('token');
    throw new Error(payload?.message || `HTTP ${res.status}`);
  }

  if (payload && payload.success === false) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
}

const body = (data) => JSON.stringify(data);

export const authService = {
  login: (data) => apiRequest('/auth/login', { method: 'POST', body: body(data) }),
  register: (data) => apiRequest('/auth/register', { method: 'POST', body: body(data) }),
  me: () => apiRequest('/auth/me'),
  changePassword: (data) => apiRequest('/auth/change-password', { method: 'POST', body: body(data) }),
};

export const login = authService.login;
export const register = authService.register;
export const getMe = authService.me;
export const changePassword = authService.changePassword;
