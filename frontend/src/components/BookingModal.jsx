// src/components/BookingModal.jsx
import React, { useContext, useEffect, useState } from 'react';
import { calculatePrice } from '../services/price';
import api from '../api';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function BookingModal({ isOpen, onClose, slot, court, coaches = [], equipmentList = [] }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [addRacket, setAddRacket] = useState(false);
  const [addCoach, setAddCoach] = useState(false);
  const [selectedCoachId, setSelectedCoachId] = useState('');
  const [qtyRackets, setQtyRackets] = useState(1);
  const [preview, setPreview] = useState({ basePrice: 0, modifiers: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (!isOpen) reset(); }, [isOpen]);

  useEffect(() => {
    setError('');
    if (!slot || !court) return;
    (async () => {
      try {
        const equipment = [];
        if (addRacket) {
          const racketObj = equipmentList.find(e => e.name.toLowerCase().includes('racket')) || equipmentList[0];
          if (racketObj) equipment.push({ ...racketObj, quantity: qtyRackets });
        }
        const coachObj = addCoach ? coaches.find(c => c._id === selectedCoachId) : null;
        const p = await calculatePrice({ court, startTime: slot.start, endTime: slot.end, equipment, coach: coachObj });
        setPreview(p);
      } catch (err) {
        setError('Failed to calculate price. Please try again.');
      }
    })();
  }, [slot, court, addRacket, qtyRackets, addCoach, selectedCoachId, equipmentList, coaches]);

  function reset() {
    setAddRacket(false);
    setAddCoach(false);
    setSelectedCoachId('');
    setQtyRackets(1);
    setPreview({ basePrice: 0, modifiers: [], total: 0 });
    setError('');
  }

  if (!isOpen || !slot || !court) return null;

  const coachRequiredButMissing = addCoach && !selectedCoachId;
  const notLoggedIn = !user;
  const confirmDisabled = loading || coachRequiredButMissing || notLoggedIn;

  async function handleConfirm() {
    setError('');
    try {
      setLoading(true);
      const payload = {
        courtId: court._id,
        coachId: addCoach ? selectedCoachId : null,
        equipment: addRacket ? [{
          equipmentId: (equipmentList.find(e=>e.name.toLowerCase().includes('racket')) || equipmentList[0])._id,
          quantity: qtyRackets
        }] : [],
        startTime: slot.start,
        endTime: slot.end
      };
      const res = await api.post('/bookings', payload);
      alert('Booking confirmed! ₹' + (res.data.booking.pricingBreakdown?.total || 'N/A'));
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-2xl p-6">
        <h3 className="text-lg font-semibold">Confirm Booking</h3>
        <div className="mt-3 space-y-3 text-sm">
          <div><strong>Court:</strong> {court?.name} — ₹{court?.basePrice}/hr</div>
          <div><strong>Slot:</strong> {new Date(slot.start).toLocaleString()} — {new Date(slot.end).toLocaleTimeString()}</div>

          {!user && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-2 rounded text-xs">
              Please login to complete your booking.
              <button
                className="ml-2 text-blue-600 underline"
                onClick={() => navigate('/login', { state: { from: '/book' } })}
              >
                Go to login
              </button>
            </div>
          )}

          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={addRacket} onChange={e=>setAddRacket(e.target.checked)} />
            <span>Add Racket? (+ ₹5 each)</span>
            {addRacket && (
              <input
                type="number"
                min="1"
                value={qtyRackets}
                onChange={e=>setQtyRackets(Math.max(1, Number(e.target.value) || 1))}
                className="ml-2 w-20 border rounded p-1"
              />
            )}
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={addCoach} onChange={e=>setAddCoach(e.target.checked)} />
            <span>Add Coach?</span>
          </label>

          {addCoach && (
            <select
              value={selectedCoachId}
              onChange={e=>setSelectedCoachId(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Select Coach</option>
              {coaches.map(c => <option key={c._id} value={c._id}>{c.name} — ₹{c.hourlyRate}/hr</option>)}
            </select>
          )}

          {coachRequiredButMissing && (
            <div className="text-red-600 text-xs">Please select a coach or uncheck "Add Coach".</div>
          )}

          <div className="border-t pt-3">
            <div className="flex justify-between text-sm">
              <span>Estimated total</span>
              <strong>₹{preview.total}</strong>
            </div>
            <div className="text-xs text-gray-600 mt-2 space-y-1">
              {preview.modifiers && preview.modifiers.map((m,i) => (
                <div key={i}>{m.name}: ₹{m.amount}</div>
              ))}
            </div>
          </div>


          {error && <div className="text-red-600 text-xs mt-2">{error}</div>}

          <div className="flex justify-end space-x-2 mt-4">
            <button onClick={onClose} className="btn-secondary text-sm">Cancel</button>
            <button
              className="btn-primary text-sm"
              disabled={confirmDisabled}
              onClick={handleConfirm}
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
