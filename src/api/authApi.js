import { request } from './client';
import { aUsuario } from './mapeadores';

const normalizar = (respuesta) => ({ ...respuesta, usuario: aUsuario(respuesta.usuario) });

export const login = async (correo, clave) => normalizar(await request('/auth/login', 'POST', { correo, clave }));

export const registro = async ({ nombre, apellidos, correo, clave, nacimiento, telefono, codigo }) =>
  normalizar(
    await request('/auth/registro', 'POST', {
      nombre,
      apellidos,
      correo,
      clave,
      nacimiento,
      telefono: telefono || undefined,
      codigo: codigo || undefined,
    }),
  );

export const refrescar = async (refreshToken) => normalizar(await request('/auth/refresh', 'POST', { refreshToken }));

export const obtenerPerfil = async () => aUsuario(await request('/usuario/me'));
