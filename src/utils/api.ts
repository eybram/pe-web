export const API_ROOT = import.meta.env.DEV ? 'http://localhost:8000/api' : '/api';

export async function fetchJson(path: string, opts?: RequestInit) {
  const res = await fetch(`${API_ROOT}${path}`, opts);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }
  return res.json();
}
