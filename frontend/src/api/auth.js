// src/api/auth.js
import api from './index';

export const loginApi = (email, password) =>
  api.post('/auth/login', { email, password }).then(r => r.data);

export const registerApi = (name, email, password) =>
  api.post('/auth/register', { name, email, password }).then(r => r.data);

export const meApi = () =>
  api.get('/auth/me').then(r => r.data);
