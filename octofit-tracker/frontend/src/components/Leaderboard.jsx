import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
    : `http://localhost:8000/api/leaderboard`;

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, [baseUrl]);

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
