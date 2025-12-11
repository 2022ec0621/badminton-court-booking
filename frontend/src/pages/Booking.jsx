import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SlotSelector from '../components/SlotSelector';
import BookingModal from '../components/BookingModal';
import { getCourts } from '../api/courts';
import { getCoaches } from '../api/coaches';
import { getEquipment } from '../api/equipment';
import { useSearchParams } from 'react-router-dom';

export default function Booking(){
  const [courts, setCourts] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [equipment, setEquipmentList] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,10));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [params] = useSearchParams();

  useEffect(()=>{
    getCourts().then(setCourts).catch(err => setError(err.message || 'Failed to load courts'));
    getCoaches().then(setCoaches).catch(err => setError(err.message || 'Failed to load coaches'));
    getEquipment().then(setEquipmentList).catch(err => setError(err.message || 'Failed to load equipment'));
  }, []);

  useEffect(()=>{
    const qCourt = params.get('court');
    if (qCourt && courts.length) {
      const c = courts.find(x=>x._id === qCourt);
      if (c) setSelectedCourt(c);
    }
  }, [params, courts]);

  function handleSelectSlot(slot){
    setSelectedSlot(slot);
    setOpen(true);
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Book a Court</h1>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded shadow">
              <label className="block mb-2 text-sm font-medium">Select Court</label>
              <select
                className="w-full border p-2 rounded"
                value={selectedCourt?._id || ''}
                onChange={e=>setSelectedCourt(courts.find(c=>c._id===e.target.value))}
              >
                <option value="">Choose court</option>
                {courts.map(c=> <option key={c._id} value={c._id}>{c.name} — ₹{c.basePrice}/hr</option>)}
              </select>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <label className="block mb-2 text-sm font-medium">Select Date</label>
              <input
                type="date"
                className="border p-2 rounded"
                value={selectedDate}
                onChange={e=>setSelectedDate(e.target.value)}
              />
              <div className="mt-4">
                {selectedCourt ? (
                  <SlotSelector date={selectedDate} onSelectSlot={handleSelectSlot} />
                ) : (
                  <div className="text-gray-500 text-sm">Choose a court to view available slots.</div>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white p-6 rounded shadow text-sm">
              <h3 className="font-medium mb-2">Your selection</h3>
              <div><span className="font-semibold">Court:</span> {selectedCourt?.name || '—' }</div>
              <div><span className="font-semibold">Date:</span> {selectedDate}</div>
              <div>
                <span className="font-semibold">Slot:</span>{' '}
                {selectedSlot
                  ? `${new Date(selectedSlot.start).toLocaleString()} - ${new Date(selectedSlot.end).toLocaleTimeString()}`
                  : '—'}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded text-xs text-blue-800">
              Tip: You can add rackets and a coach in the confirmation step.
            </div>
          </aside>
        </div>

        <BookingModal
          isOpen={open}
          onClose={()=>setOpen(false)}
          slot={selectedSlot}
          court={selectedCourt}
          coaches={coaches}
          equipmentList={equipment}
          userId={null}
        />
      </main>
    </div>
  );
}
