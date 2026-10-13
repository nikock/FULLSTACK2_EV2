import { ordenesDB, productosDB } from '../data/db';
import { construirOrden, ESTADO_FALLIDA, ESTADO_PAGADA, generarNumeroOrden, simularPago } from './ordenes';

function descontarStock(items) {
  items.forEach((item) => {
    const producto = productosDB.obtenerPorId(item.productoId);
    if (producto) {
      productosDB.actualizar(producto.id, { stock: Math.max(producto.stock - item.cantidad, 0) });
    }
  });
}

export function confirmarCompra({ cliente, direccion, detalle, totales, usuarioId = null, forzarRechazo = false }) {
  const estado = simularPago({ forzarRechazo });
  const base = construirOrden({ cliente, direccion, detalle, totales, usuarioId, estado });
  const creada = ordenesDB.crear(base);
  const orden = ordenesDB.actualizar(creada.id, { numero: generarNumeroOrden(creada.id, new Date(creada.fecha)) });
  if (estado === ESTADO_PAGADA) descontarStock(orden.items);
  return orden;
}

export function reintentarPago(ordenId) {
  const orden = ordenesDB.obtenerPorId(ordenId);
  if (!orden || orden.estado !== ESTADO_FALLIDA) return null;
  const pagada = ordenesDB.actualizar(orden.id, { estado: ESTADO_PAGADA });
  descontarStock(pagada.items);
  return pagada;
}
