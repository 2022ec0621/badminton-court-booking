import React, { useEffect, useState } from 'react';
import { getCoaches, updateCoach } from '../../api/coaches';

export default function AdminCoachForm(){
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState(null);

  useEffect(()=>{
    getCoaches()
      .then(setCoaches)
      .catch(err => setError(err.message || 'Failed to load coaches'));
  }, []);

  async function toggleCoach(id, value){
    setError('');
    try{
      setSavingId(id);
      const res = await updateCoach(id, { isActive: value });
      setCoaches(cs => cs.map(c => c._id === id ? res : c));
    }catch(err){
      setError(err.response?.data?.error || err.message);
    }finally{
      setSavingId(null);
    }
  }

  return (
    <div>
      <h2 className="text-xl mb-3 font-semibold">Manage Coaches</h2>
      {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
      <ul className="space-y-2">
        {coaches.map(c => (
          <li key={c._id} className="flex items-center justify-between border p-2 rounded text-sm">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-gray-500">₹{c.hourlyRate}/hr</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {c.isActive ? 'Available' : 'Unavailable'}
              </span>
              <button
                onClick={()=>toggleCoach(c._id, !c.isActive)}
                className="btn-primary text-xs"
                disabled={savingId === c._id}
              >
                {savingId === c._id ? 'Updating...' : c.isActive ? 'Mark Unavailable' : 'Mark Available'}
              </button>
            </div>
          </li>
        ))}
        {coaches.length === 0 && !error && (
          <li className="text-gray-500 text-sm">No coaches found.</li>
        )}
      </ul>
    </div>
  );
}
