import React, { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Workouts() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    fetchJson('workouts')
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {items.map((w) => (
          <li key={w._id}>{w.title} — {w.difficulty}</li>
        ))}
      </ul>
    </div>
  );
}
