const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function fetchJSON(url, options) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers || {}),
  };
  const res = await fetch(url, { ...options, headers });
  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(payload?.message || `HTTP ${res.status}`);
  }

  if (payload && payload.success === false) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
}

// ===== Auth =====
export const login = (data) => fetchJSON(`${API_BASE}/auth/login`, {
  method: 'POST',
  body: JSON.stringify(data),
});

export const register = (data) => fetchJSON(`${API_BASE}/auth/register`, {
  method: 'POST',
  body: JSON.stringify(data),
});

export const getMe = () => fetchJSON(`${API_BASE}/auth/me`);

export const changePassword = (data) => fetchJSON(`${API_BASE}/auth/change-password`, {
  method: 'POST',
  body: JSON.stringify(data),
});
