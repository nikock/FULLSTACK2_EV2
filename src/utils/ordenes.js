export const ESTADO_PAGADA = 'pagada';
export const ESTADO_FALLIDA = 'fallida';

export function generarNumeroOrden(id, fecha = new Date()) {
  const yyyy = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const dd = String(fecha.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}-${String(id).padStart(4, '0')}`;
}

export function simularPago({ forzarRechazo = false } = {}) {
  return forzarRechazo ? ESTADO_FALLIDA : ESTADO_PAGADA;
}

export function construirOrden({ cliente, direccion, detalle, totales, usuarioId = null, estado }, ahora = new Date()) {
  return {
    fecha: ahora.toISOString(),
    usuarioId,
    cliente,
    direccion,
    items: detalle.map((linea) => ({
      productoId: linea.producto.id,
      categoriaId: linea.producto.categoriaId,
      nombre: linea.producto.nombre,
      imagen: linea.producto.imagen,
      precio: linea.precioUnitario,
      cantidad: linea.cantidad,
      subtotal: linea.subtotal,
    })),
    subtotal: totales.subtotal,
    descuento: totales.descuento,
    total: totales.total,
    estado,
  };
}
