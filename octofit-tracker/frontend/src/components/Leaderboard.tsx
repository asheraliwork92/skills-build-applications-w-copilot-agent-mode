import React, { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Leaderboard() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    fetchJson('leaderboard')
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {items.map((e) => (
          <li key={e._id}>{e.rank}. {e.user?.username || e.user} — {e.points} pts</li>
        ))}
      </ol>
    </div>
  );
}
