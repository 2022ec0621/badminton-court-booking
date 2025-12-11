import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getCoaches } from '../api/coaches';
import CoachCard from '../components/CoachCard';

export default function Coaches(){
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState('');

  useEffect(()=>{
    getCoaches()
      .then(setCoaches)
      .catch(err => setError(err.message || 'Failed to load coaches'));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Coaches</h1>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coaches.map(c => <CoachCard key={c._id} coach={c} />)}
          {coaches.length === 0 && !error && (
            <div className="text-gray-500 text-sm">No coaches found.</div>
          )}
        </div>
      </main>
    </div>
  );
}
