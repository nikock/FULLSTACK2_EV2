export const CODIGO_PROMOCIONAL = 'FELICES50';
export const DOMINIO_DUOC = '@duocuc.cl';

export function calcularEdad(nacimiento, hoy = new Date()) {
  const fecha = new Date(nacimiento);
  if (Number.isNaN(fecha.getTime())) return 0;
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const aunNoCumple =
    hoy.getMonth() < fecha.getMonth() ||
    (hoy.getMonth() === fecha.getMonth() && hoy.getDate() < fecha.getDate());
  if (aunNoCumple) edad -= 1;
  return edad;
}

export function calcularBeneficios({ nacimiento, codigo = '', correo = '' }, hoy = new Date()) {
  let descuento = 0;
  const mensajes = [];

  if (calcularEdad(nacimiento, hoy) >= 50) {
    descuento = 50;
    mensajes.push('Tienes 50% de descuento de por vida.');
  } else if (codigo.trim().toUpperCase() === CODIGO_PROMOCIONAL) {
    descuento = 10;
    mensajes.push('Código válido: 10% de descuento de por vida.');
  }

  const tortaCumple = correo.trim().toLowerCase().endsWith(DOMINIO_DUOC);
  if (tortaCumple) mensajes.push('Como estudiante Duoc, tendrás una torta gratis en tu cumpleaños.');

  return { descuento, tortaCumple, mensajes };
}
