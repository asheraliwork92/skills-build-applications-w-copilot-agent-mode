import React, { useEffect, useState } from 'react';

export default function Users() {
  const [items, setItems] = useState([]);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users`
    : `http://localhost:8000/api/users`;

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, [baseUrl]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {items.map((u) => (
          <li key={u._id}>{u.username} — {u.fullName}</li>
        ))}
      </ul>
    </div>
  );
}
