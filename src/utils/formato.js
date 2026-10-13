export function formatearPrecio(valor) {
  const numero = Math.round(Number(valor) || 0);
  const signo = numero < 0 ? '-' : '';
  const miles = Math.abs(numero).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${signo}$${miles}`;
}

export function precioFinal(producto) {
  const oferta = Number(producto?.oferta) || 0;
  const precio = Number(producto?.precio) || 0;
  return Math.round((precio * (100 - oferta)) / 100);
}

export function formatearFecha(iso) {
  if (!iso) return '';
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return '';
  const dd = String(fecha.getDate()).padStart(2, '0');
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${fecha.getFullYear()}`;
}
