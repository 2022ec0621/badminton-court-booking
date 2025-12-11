import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CourtCard from '../components/CourtCard';
import { getCourts } from '../api/courts';
import { useNavigate } from 'react-router-dom';

export default function Home(){
  const [courts, setCourts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    getCourts()
      .then(setCourts)
      .catch(err => setError(err.message || 'Failed to load courts'));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Courts</h1>
        </div>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courts.map(c => (
            <CourtCard
              key={c._id}
              court={c}
              onBook={() => navigate(`/book?court=${c._id}`)}
            />
          ))}
          {courts.length === 0 && !error && (
            <div className="text-gray-500 text-sm">No courts available.</div>
          )}
        </div>
      </main>
    </div>
  );
}
