import React from 'react';

export default function CoachCard({ coach }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">{coach.name}</h2>
          <div className="text-sm text-gray-500">₹{coach.hourlyRate}/hr</div>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${coach.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {coach.isActive ? 'Available' : 'Unavailable'}
        </span>
      </div>
    </div>
  );
}
