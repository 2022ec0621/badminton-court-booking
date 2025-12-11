// src/api/index.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
const TOKEN_KEY = 'cb_token';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { TOKEN_KEY };
export default api;

