import { request } from './client';
import { aCategoria, deCategoria } from './mapeadores';

export const listarCategorias = async () => (await request('/categoria')).map(aCategoria);
export const buscarCategoria = async (id) => aCategoria(await request(`/categoria/${id}`));
export const crearCategoria = async (categoria) => aCategoria(await request('/categoria', 'POST', deCategoria(categoria)));
export const actualizarCategoria = async (id, categoria) =>
  aCategoria(await request(`/categoria/${id}`, 'PUT', deCategoria(categoria)));
export const eliminarCategoria = (id) => request(`/categoria/${id}`, 'DELETE');
