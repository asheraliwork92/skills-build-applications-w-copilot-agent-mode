import React, { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Activities() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    fetchJson('activities')
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {items.map((a) => (
          <li key={a._id}>{a.type} — {a.durationMinutes} min</li>
        ))}
      </ul>
    </div>
  );
}
