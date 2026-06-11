import React, { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Users() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    fetchJson('users')
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, []);

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
