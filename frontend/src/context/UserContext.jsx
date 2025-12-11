// src/context/UserContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { loginApi, registerApi, meApi } from '../api/auth';
import { TOKEN_KEY } from '../api/index';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setInitializing(false);
      return;
    }
    meApi()
      .then(u => setUser(u))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setInitializing(false));
  }, []);

  async function login({ email, password }) {
    const res = await loginApi(email, password);
    localStorage.setItem(TOKEN_KEY, res.token);
    setUser(res.user);
    return res.user;
  }

  async function register({ name, email, password }) {
    const res = await registerApi(name, email, password);
    localStorage.setItem(TOKEN_KEY, res.token);
    setUser(res.user);
    return res.user;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout, initializing }}>
      {children}
    </UserContext.Provider>
  );
}
