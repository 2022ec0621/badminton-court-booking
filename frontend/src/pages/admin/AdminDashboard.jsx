import React from 'react';

export default function AdminDashboard(){
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white p-4 rounded shadow">
          <p className="font-medium mb-1">Courts</p>
          <p className="text-gray-600">Update court prices and status.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="font-medium mb-1">Pricing Rules</p>
          <p className="text-gray-600">Add holiday and special pricing rules.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="font-medium mb-1">Coaches</p>
          <p className="text-gray-600">Mark coaches available/unavailable.</p>
        </div>
      </div>
    </div>
  );
}
