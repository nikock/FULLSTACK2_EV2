export const PREFIJO = 'milsabores:';

function obtenerStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function leerJSON(clave, valorPorDefecto = null) {
  const storage = obtenerStorage();
  if (!storage) return valorPorDefecto;
  try {
    const crudo = storage.getItem(PREFIJO + clave);
    return crudo === null ? valorPorDefecto : JSON.parse(crudo);
  } catch {
    return valorPorDefecto;
  }
}

export function guardarJSON(clave, valor) {
  const storage = obtenerStorage();
  if (!storage) return false;
  try {
    storage.setItem(PREFIJO + clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function borrarClave(clave) {
  const storage = obtenerStorage();
  if (!storage) return;
  try {
    storage.removeItem(PREFIJO + clave);
  } catch {
  }
}
