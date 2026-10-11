import { precioFinal } from './formato';

const sinTildes = (texto) => String(texto ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function filtrarProductos(productos, { q = '', categoriaId = '', soloOfertas = false, orden = 'relevancia' } = {}) {
  const termino = sinTildes(q).trim();
  let resultado = productos.filter((p) => {
    if (termino && !sinTildes(`${p.nombre} ${p.descripcion}`).includes(termino)) return false;
    if (categoriaId !== '' && p.categoriaId !== Number(categoriaId)) return false;
    if (soloOfertas && !(p.oferta > 0)) return false;
    return true;
  });

  if (orden === 'precio-asc') resultado = [...resultado].sort((a, b) => precioFinal(a) - precioFinal(b));
  else if (orden === 'precio-desc') resultado = [...resultado].sort((a, b) => precioFinal(b) - precioFinal(a));
  else if (orden === 'nombre') resultado = [...resultado].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  return resultado;
}
