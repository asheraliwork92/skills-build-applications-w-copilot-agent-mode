import React, { useEffect, useState } from 'react';

export default function Teams() {
  const [items, setItems] = useState([]);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams`
    : `http://localhost:8000/api/teams`;

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, [baseUrl]);

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
