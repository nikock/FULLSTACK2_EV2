import { cerrarSesion, getRefreshToken, getToken, guardarSesion, notificarSesionExpirada } from '../auth/auth';

export const API_URL = String(import.meta.env?.VITE_API_URL ?? 'http://localhost:8080').replace(/\/+$/, '');

const RUTAS_AUTH = ['/auth/login', '/auth/registro', '/auth/refresh'];

const MENSAJES_POR_ESTADO = {
  400: 'Los datos enviados no son válidos.',
  401: 'Tu sesión expiró. Inicia sesión nuevamente.',
  403: 'No tienes permiso para realizar esta acción.',
  404: 'No encontramos lo que buscabas.',
  409: 'La operación entra en conflicto con el estado actual de los datos.',
};

export class ApiError extends Error {
  constructor(status, message, errores = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errores = errores;
  }
}

async function construirError(res) {
  let cuerpo = null;
  try {
    cuerpo = await res.json();
  } catch {
  }
  const errores = cuerpo?.errores ?? null;
  const primerError = errores ? Object.values(errores)[0] : null;
  const mensaje = primerError ?? cuerpo?.message ?? MENSAJES_POR_ESTADO[res.status] ?? `Error ${res.status} del servidor.`;
  return new ApiError(res.status, mensaje, errores);
}

async function enviar(endpoint, method, body, conToken) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (conToken && token) headers.Authorization = `Bearer ${token}`;
  try {
    return await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, 'No pudimos conectarnos con el servidor. Revisa tu conexión e inténtalo de nuevo.');
  }
}

let renovacionEnCurso = null;

async function renovarTokens() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await enviar('/auth/refresh', 'POST', { refreshToken }, false);
    if (!res.ok) return false;
    guardarSesion(await res.json());
    return true;
  } catch {
    return false;
  }
}

function renovarUnaVez() {
  if (!renovacionEnCurso) {
    renovacionEnCurso = renovarTokens().finally(() => {
      renovacionEnCurso = null;
    });
  }
  return renovacionEnCurso;
}

export async function request(endpoint, method = 'GET', body) {
  const esAuth = RUTAS_AUTH.includes(endpoint);
  let res = await enviar(endpoint, method, body, !esAuth);

  if (res.status === 401 && !esAuth && getToken()) {
    const renovado = await renovarUnaVez();
    if (renovado) res = await enviar(endpoint, method, body, true);
    if (!renovado || res.status === 401) {
      cerrarSesion();
      notificarSesionExpirada();
      throw new ApiError(401, MENSAJES_POR_ESTADO[401]);
    }
  }

  if (!res.ok) throw await construirError(res);
  if (res.status === 204) return null;
  const texto = await res.text();
  return texto ? JSON.parse(texto) : null;
}
