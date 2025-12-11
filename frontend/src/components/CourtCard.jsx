import React from 'react';

export default function CourtCard({ court, onBook }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">{court.name}</h2>
          <div className="text-sm text-gray-500 capitalize">Type: {court.type}</div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-blue-700">₹{court.basePrice}/hr</div>
          <button onClick={onBook} className="mt-2 btn-primary text-sm">Book</button>
        </div>
      </div>
    </div>
  )
}
