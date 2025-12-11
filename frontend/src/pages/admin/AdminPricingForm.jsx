import React, { useState } from 'react';
import { createPricingRule } from '../../api/pricing';

export default function AdminPricingForm(){
  const [name, setName] = useState('Holiday Surcharge');
  const [days, setDays] = useState(''); // comma sep
  const [surcharge, setSurcharge] = useState(100);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleCreate(){
    setError('');
    if (!days) return setError('Please provide days (e.g., 0,6).');
    if (!surcharge) return setError('Please provide a surcharge amount.');
    try{
      setSaving(true);
      const daysArr = days.split(',').map(d => Number(d.trim())).filter(d => !Number.isNaN(d));
      const payload = { name, type: 'day_of_week', config: { days: daysArr, surcharge: Number(surcharge) }, isActive: true };
      await createPricingRule(payload);
      alert('Rule created');
    }catch(err){
      setError(err.response?.data?.error || err.message);
    }finally{
      setSaving(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl mb-3 font-semibold">Add Holiday Pricing Rule</h2>
      {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
      <label className="block text-sm mb-1">Rule Name</label>
      <input className="w-full border p-2 rounded" value={name} onChange={e=>setName(e.target.value)} />
      <label className="block text-sm mt-3 mb-1">Days (0=Sun ... 6=Sat)</label>
      <input className="w-full border p-2 rounded" placeholder="e.g., 0,6" value={days} onChange={e=>setDays(e.target.value)} />
      <label className="block text-sm mt-3 mb-1">Surcharge (₹)</label>
      <input className="w-full border p-2 rounded" type="number" value={surcharge} onChange={e=>setSurcharge(e.target.value)} />
      <button className="mt-3 btn-primary" onClick={handleCreate} disabled={saving}>
        {saving ? 'Creating...' : 'Create Rule'}
      </button>
    </div>
  );
}
