import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Navbar(){
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-blue-700">Court Booking</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Courts</Link>
          <Link to="/coaches" className="text-gray-600 hover:text-gray-900">Coaches</Link>
          <Link to="/book" className="text-gray-600 hover:text-gray-900">Book</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-gray-600 hover:text-gray-900">Admin</Link>
          )}
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Hi, {user.name}</span>
              <button className="btn-secondary text-sm" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="btn-primary text-sm" onClick={() => navigate('/login')}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
