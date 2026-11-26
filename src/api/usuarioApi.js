import { request } from './client';
import { aUsuario, deUsuario } from './mapeadores';

export const listarUsuarios = async () => (await request('/usuario')).map(aUsuario);
export const crearUsuario = async (usuario) => aUsuario(await request('/usuario', 'POST', deUsuario(usuario)));
export const actualizarUsuario = async (id, usuario) =>
  aUsuario(await request(`/usuario/${id}`, 'PUT', deUsuario(usuario)));
export const eliminarUsuario = (id) => request(`/usuario/${id}`, 'DELETE');
