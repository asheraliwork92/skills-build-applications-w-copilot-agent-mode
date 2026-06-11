import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities`
    : `http://localhost:8000/api/activities`;

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, [baseUrl]);

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
