// src/pages/auth/Login.jsx
import React, { useContext, useState } from 'react';
import Navbar from '../../components/Navbar';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login(){
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@demo.com'); // for easy testing
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || '/';

  async function handleSubmit(e){
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    try {
      setLoading(true);
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6 flex justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
          <h1 className="text-xl font-semibold text-center">Login</h1>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Seeded users: <br />
            <span className="font-mono">admin@demo.com / password</span> (admin) <br />
            <span className="font-mono">test@example.com / password</span> (user)
          </p>
        </form>
      </main>
    </div>
  );
}
