import React, { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Teams() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    fetchJson('teams')
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {items.map((t) => (
          <li key={t._id}>{t.name} — {t.score} pts</li>
        ))}
      </ul>
    </div>
  );
}
