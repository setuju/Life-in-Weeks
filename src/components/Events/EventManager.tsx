import React, { useState } from 'react';
import { LifeEvent } from '../../types';

interface EventManagerProps {
  events: LifeEvent[];
  onAddEvent: (event: LifeEvent) => void;
  onDeleteEvent: (id: string) => void;
}

const EventManager: React.FC<EventManagerProps> = ({ events, onAddEvent, onDeleteEvent }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && year) {
      onAddEvent({ id: Date.now().toString(), name, year: parseInt(year) });
      setName('');
      setYear('');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Life Events</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input type="text" placeholder="Event Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" />
        <input type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} className="border p-2 rounded w-20" />
        <button type="submit" className="bg-slate-800 text-white p-2 rounded">Add</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event.id} className="flex justify-between items-center py-2 border-b">
            {event.name} ({event.year})
            <button onClick={() => onDeleteEvent(event.id)} className="text-red-500 text-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManager;
