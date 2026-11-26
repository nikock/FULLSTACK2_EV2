import { request } from './client';
import { aOrden, tipoEntregaParaApi } from './mapeadores';

export const listarOrdenes = async () => (await request('/orden')).map(aOrden);
// Cualquier usuario autenticado
export const listarMisOrdenes = async () => (await request('/orden/mis-ordenes')).map(aOrden);
export const buscarOrden = async (id) => aOrden(await request(`/orden/${id}`));

export const crearOrden = async ({ tipoEntrega, detalle, forzarRechazo = false }) =>
  aOrden(
    await request('/orden', 'POST', {
      tipoEntrega: tipoEntregaParaApi(tipoEntrega),
      items: detalle.map((linea) => ({ productoId: linea.producto.id, cantidad: linea.cantidad })),
      forzarRechazo,
    }),
  );

export const reintentarPagoOrden = async (id) => aOrden(await request(`/orden/${id}/reintentar-pago`, 'POST'));
