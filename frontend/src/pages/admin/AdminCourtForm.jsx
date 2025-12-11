import React, { useEffect, useState } from 'react';
import { getCourts, updateCourt } from '../../api/courts';

export default function AdminCourtForm(){
  const [courts, setCourts] = useState([]);
  const [selected, setSelected] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(()=>{
    getCourts().then(setCourts).catch(err => setError(err.message || 'Failed to load courts'));
  }, []);

  async function handleUpdate(){
    setError('');
    if(!selected) return setError('Please select a court.');
    if(!price) return setError('Please enter a price.');
    try{
      setSaving(true);
      const res = await updateCourt(selected, { basePrice: Number(price) });
      alert('Court updated');
      setCourts(cs => cs.map(c => c._id === res._id ? res : c));
    }catch(err){
      setError(err.response?.data?.error || err.message);
    }finally{
      setSaving(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl mb-3 font-semibold">Update Court Price</h2>
      {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
      <select
        className="w-full border p-2 rounded"
        value={selected}
        onChange={e=>{ setSelected(e.target.value); const c = courts.find(x=>x._id===e.target.value); setPrice(c?.basePrice || ''); }}
      >
        <option value="">Select court</option>
        {courts.map(c => <option key={c._id} value={c._id}>{c.name} — ₹{c.basePrice}</option>)}
      </select>
      <input
        className="w-full border p-2 mt-3 rounded"
        type="number"
        placeholder="New price"
        value={price}
        onChange={e=>setPrice(e.target.value)}
      />
      <button
        className="mt-3 btn-primary"
        onClick={handleUpdate}
        disabled={saving}
      >
        {saving ? 'Updating...' : 'Update Price'}
      </button>
    </div>
  );
}
