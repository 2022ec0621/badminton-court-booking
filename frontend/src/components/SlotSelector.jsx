import React from 'react';

export default function SlotSelector({ date, startHour = 6, endHour = 22, onSelectSlot }) {
  const day = new Date(date);
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    const start = new Date(day);
    start.setHours(h, 0, 0, 0);
    const end = new Date(day);
    end.setHours(h+1, 0, 0, 0);
    slots.push({ start: start.toISOString(), end: end.toISOString(), label: `${String(h).padStart(2,'0')}:00 - ${String(h+1).padStart(2,'0')}:00` });
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {slots.map(slot => (
        <button
          key={slot.start}
          onClick={() => onSelectSlot(slot)}
          className="bg-white shadow rounded p-3 hover:bg-green-50 focus:outline-none"
        >
          <div className="font-medium text-sm text-gray-800">{slot.label}</div>
        </button>
      ))}
    </div>
  );
}
