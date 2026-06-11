import React, { useEffect, useState } from 'react';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
    : `http://localhost:8000/api/workouts`;

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, [baseUrl]);

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
