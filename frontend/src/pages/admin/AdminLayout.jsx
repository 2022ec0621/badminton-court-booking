import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout(){
  return (
    <div>
      <div className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="font-bold">Admin Panel</div>
          <div className="space-x-3 text-sm">
            <Link to="/admin" className="text-gray-200 hover:text-white">Dashboard</Link>
            <Link to="/admin/courts" className="text-gray-200 hover:text-white">Courts</Link>
            <Link to="/admin/pricing" className="text-gray-200 hover:text-white">Pricing</Link>
            <Link to="/admin/coaches" className="text-gray-200 hover:text-white">Coaches</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
}
