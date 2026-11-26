import { request } from './client';
import { aProducto, deProducto } from './mapeadores';

export const listarProductos = async () => (await request('/producto')).map(aProducto);
export const buscarProducto = async (id) => aProducto(await request(`/producto/${id}`));
export const crearProducto = async (producto) => aProducto(await request('/producto', 'POST', deProducto(producto)));
export const actualizarProducto = async (id, producto) =>
  aProducto(await request(`/producto/${id}`, 'PUT', deProducto(producto)));
export const eliminarProducto = (id) => request(`/producto/${id}`, 'DELETE');
