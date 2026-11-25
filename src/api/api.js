const API = import.meta.env.VITE_API_URL;

export async function getEntregas() {
  const res = await fetch(`${API}/entregas`);
  if (!res.ok) throw new Error('Error al cargar entregas');
  return res.json();
}