import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Booking from './pages/Booking';
import CourtDetail from './pages/CourtDetail';
import Coaches from './pages/Coaches';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourtForm from './pages/admin/AdminCourtForm';
import AdminPricingForm from './pages/admin/AdminPricingForm';
import AdminCoachForm from './pages/admin/AdminCoachForm';

import Login from './pages/auth/Login';
import { UserContext } from './context/UserContext';

function RequireAdmin({ children }) {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/court/:id" element={<CourtDetail />} />
      <Route path="/coaches" element={<Coaches />} />

      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
        <Route index element={<AdminDashboard />} />
        <Route path="courts" element={<AdminCourtForm />} />
        <Route path="pricing" element={<AdminPricingForm />} />
        <Route path="coaches" element={<AdminCoachForm />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
