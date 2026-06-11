function codespaceBaseUrl(): string {
  const name = (import.meta as any).env.VITE_CODESPACE_NAME;
  const port = 8000;
  if (name && typeof name === 'string' && name.length > 0) {
    return `https://${name}-${port}.app.github.dev/api`;
  }
  return `http://localhost:${port}/api`;
}

export function apiUrlFor(path: string) {
  const base = codespaceBaseUrl();
  return `${base}/${path}`.replace(/\/\/+/, '/').replace(':/', '://');
}

export async function fetchJson(path: string) {
  const url = apiUrlFor(path);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch error ${res.status}`);
  return res.json();
}

export default { apiUrlFor, fetchJson };
