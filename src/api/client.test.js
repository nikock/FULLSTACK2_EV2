import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cerrarSesion, getRefreshToken, getToken, getUsuarioGuardado, guardarSesion, suscribirSesionExpirada } from '../auth/auth';
import { ApiError, request } from './client';

const respuesta = (status, cuerpo) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => cuerpo,
  text: async () => (cuerpo === undefined ? '' : JSON.stringify(cuerpo)),
});

const simular = (manejador) => {
  const fetchFalso = vi.fn(async (url, opciones) => manejador(String(url), opciones));
  vi.stubGlobal('fetch', fetchFalso);
  return fetchFalso;
};

beforeEach(() => {
  vi.unstubAllGlobals();
  cerrarSesion();
});

describe('client.js', () => {
  it('muestra el mensaje del backend y no intenta renovar en /auth/login', async () => {
    const fetchFalso = simular(() => respuesta(401, { status: 401, message: 'Correo o contraseña incorrectos.' }));
    await expect(request('/auth/login', 'POST', { correo: 'a', clave: 'b' })).rejects.toMatchObject({
      status: 401,
      message: 'Correo o contraseña incorrectos.',
    });
    expect(fetchFalso).toHaveBeenCalledTimes(1);
  });

  it('lee el mensaje del 409 (stock insuficiente) y envía el Bearer', async () => {
    guardarSesion({ token: 'T1', refreshToken: 'R1' });
    const fetchFalso = simular(() => respuesta(409, { status: 409, message: 'Stock insuficiente para Torta (disponible: 2)' }));
    await expect(request('/orden', 'POST', { items: [] })).rejects.toMatchObject({ status: 409, message: /^Stock insuficiente/ });
    expect(fetchFalso.mock.calls[0][1].headers.Authorization).toBe('Bearer T1');
  });

  it('usa el primer error de validación (400)', async () => {
    simular(() => respuesta(400, { status: 400, message: 'Datos invalidos', errores: { nombre: 'El nombre es obligatorio' } }));
    await expect(request('/producto', 'POST', {})).rejects.toMatchObject({ status: 400, message: 'El nombre es obligatorio' });
  });

  it('ante un 401 renueva el token con /auth/refresh y repite la petición', async () => {
    guardarSesion({ token: 'VENCIDO', refreshToken: 'R1' });
    const fetchFalso = simular((url, opciones) => {
      if (url.endsWith('/auth/refresh')) return respuesta(200, { token: 'T2', refreshToken: 'R2', usuario: { id: 1, rol: 'cliente' } });
      return opciones.headers.Authorization === 'Bearer T2' ? respuesta(200, { ok: true }) : respuesta(401, { message: 'No autenticado' });
    });
    await expect(request('/orden/mis-ordenes')).resolves.toEqual({ ok: true });
    expect(getToken()).toBe('T2');
    expect(getRefreshToken()).toBe('R2');
    expect(fetchFalso).toHaveBeenCalledTimes(3);
    expect(JSON.parse(fetchFalso.mock.calls[1][1].body)).toEqual({ refreshToken: 'R1' });
  });

  it('varias peticiones con 401 simultáneas comparten una sola renovación', async () => {
    guardarSesion({ token: 'VENCIDO', refreshToken: 'R1' });
    const fetchFalso = simular(async (url, opciones) => {
      if (url.endsWith('/auth/refresh')) return respuesta(200, { token: 'NUEVO', refreshToken: 'R2' });
      return opciones.headers.Authorization === 'Bearer NUEVO' ? respuesta(200, []) : respuesta(401, {});
    });
    await Promise.all([request('/orden'), request('/usuario'), request('/producto')]);
    expect(fetchFalso.mock.calls.filter(([url]) => url.endsWith('/auth/refresh'))).toHaveLength(1);
  });

  it('si el refresh falla cierra la sesión y avisa a la interfaz', async () => {
    guardarSesion({ token: 'X', refreshToken: 'MALO', usuario: { id: 9 } });
    const aviso = vi.fn();
    const baja = suscribirSesionExpirada(aviso);
    simular((url) => (url.endsWith('/auth/refresh') ? respuesta(401, { message: 'Refresh token invalido o expirado.' }) : respuesta(401, {})));
    await expect(request('/usuario/me')).rejects.toBeInstanceOf(ApiError);
    expect(getToken()).toBeNull();
    expect(getUsuarioGuardado()).toBeNull();
    expect(aviso).toHaveBeenCalledTimes(1);
    baja();
  });

  it('un 401 sin sesión iniciada no cierra nada ni intenta renovar', async () => {
    const fetchFalso = simular(() => respuesta(401, { message: 'No autenticado: inicie sesion o renueve su token' }));
    await expect(request('/orden')).rejects.toMatchObject({ status: 401 });
    expect(fetchFalso).toHaveBeenCalledTimes(1);
  });

  it('informa cuando no hay conexión con el servidor', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('fetch failed'); }));
    await expect(request('/producto')).rejects.toMatchObject({ status: 0, message: /conectarnos/ });
  });

  it('devuelve null en un 204', async () => {
    simular(() => respuesta(204, undefined));
    await expect(request('/producto/1', 'DELETE')).resolves.toBeNull();
  });
});
