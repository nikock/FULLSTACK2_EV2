export const CLAVE_TOKEN = 'token_pasteleria';
export const CLAVE_REFRESH = 'refresh_pasteleria';
export const CLAVE_USUARIO = 'usuario_pasteleria';

function almacenamiento() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

function leer(clave) {
  try {
    return almacenamiento()?.getItem(clave) ?? null;
  } catch {
    return null;
  }
}

function escribir(clave, valor) {
  try {
    almacenamiento()?.setItem(clave, valor);
  } catch {
  }
}

function borrar(clave) {
  try {
    almacenamiento()?.removeItem(clave);
  } catch {
    
  }
}

export const getToken = () => leer(CLAVE_TOKEN);
export const getRefreshToken = () => leer(CLAVE_REFRESH);

export function getUsuarioGuardado() {
  const crudo = leer(CLAVE_USUARIO);
  if (!crudo) return null;
  try {
    return JSON.parse(crudo);
  } catch {
    return null;
  }
}

export const guardarTokens = ({ token, refreshToken }) => {
  if (token) escribir(CLAVE_TOKEN, token);
  if (refreshToken) escribir(CLAVE_REFRESH, refreshToken);
};

export const guardarUsuario = (usuario) => escribir(CLAVE_USUARIO, JSON.stringify(usuario));

export function guardarSesion({ token, refreshToken, usuario }) {
  guardarTokens({ token, refreshToken });
  if (usuario) guardarUsuario(usuario);
}

export function cerrarSesion() {
  borrar(CLAVE_TOKEN);
  borrar(CLAVE_REFRESH);
  borrar(CLAVE_USUARIO);
}

export const estaLogueado = () => getToken() !== null;

const oyentes = new Set();

export function suscribirSesionExpirada(oyente) {
  oyentes.add(oyente);
  return () => oyentes.delete(oyente);
}

export const notificarSesionExpirada = () => oyentes.forEach((oyente) => oyente());
