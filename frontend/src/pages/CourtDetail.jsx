import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getCourts } from '../api/courts';
import SlotSelector from '../components/SlotSelector';
import BookingModal from '../components/BookingModal';

export default function CourtDetail(){
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [slot, setSlot] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    getCourts()
      .then(list => {
        const found = list.find(c=>c._id === id);
        setCourt(found || null);
      })
      .catch(console.error);
  }, [id]);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">{court?.name || 'Court'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded shadow">
            <label className="block mb-2 text-sm font-medium">Pick date</label>
            <input
              type="date"
              className="border p-2 rounded"
              value={date}
              onChange={e=>setDate(e.target.value)}
            />
            <div className="mt-4">
              <SlotSelector date={date} onSelectSlot={(s)=>{ setSlot(s); setOpen(true); }} />
            </div>
          </div>
          <aside className="bg-white p-6 rounded shadow text-sm">
            <div><span className="font-semibold">Type:</span> {court?.type}</div>
            <div><span className="font-semibold">Price:</span> ₹{court?.basePrice}/hr</div>
          </aside>
        </div>
        <BookingModal isOpen={open} onClose={()=>setOpen(false)} slot={slot} court={court} />
      </main>
    </div>
  );
}
