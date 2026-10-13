import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usuariosDB } from '../data/db';
import { useColeccion } from '../hooks/useColeccion';
import { calcularBeneficios } from '../utils/beneficios';
import { borrarClave, guardarJSON, leerJSON } from '../utils/storage';

export const AuthContext = createContext(null);

const normalizar = (correo) => String(correo ?? '').trim().toLowerCase();

export function AuthProvider({ children }) {
  const usuarios = useColeccion('usuarios');
  const [usuarioId, setUsuarioId] = useState(() => leerJSON('sesion', null));

  const usuario = useMemo(() => usuarios.find((u) => u.id === usuarioId) ?? null, [usuarios, usuarioId]);

  useEffect(() => {
    if (usuarioId === null) borrarClave('sesion');
    else guardarJSON('sesion', usuarioId);
  }, [usuarioId]);

  const login = useCallback(
    (correo, clave) => {
      const encontrado = usuarios.find((u) => normalizar(u.correo) === normalizar(correo) && u.clave === clave);
      if (!encontrado) return { ok: false, error: 'Correo o contraseña incorrectos.' };
      if (!encontrado.activo) return { ok: false, error: 'Tu cuenta está desactivada.' };
      setUsuarioId(encontrado.id);
      return { ok: true, usuario: encontrado };
    },
    [usuarios],
  );

  const logout = useCallback(() => setUsuarioId(null), []);

  const registrar = useCallback(
    ({ nombre, apellidos, correo, nacimiento, codigo, clave }) => {
      if (usuarios.some((u) => normalizar(u.correo) === normalizar(correo))) {
        return { ok: false, error: 'Ya existe una cuenta con ese correo.' };
      }
      const beneficios = calcularBeneficios({ nacimiento, codigo, correo });
      const nuevo = usuariosDB.crear({
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        correo: correo.trim(),
        clave,
        rol: 'cliente',
        nacimiento,
        telefono: '',
        descuento: beneficios.descuento,
        tortaCumple: beneficios.tortaCumple,
        activo: true,
      });
      setUsuarioId(nuevo.id);
      return { ok: true, usuario: nuevo, beneficios };
    },
    [usuarios],
  );

  const valor = useMemo(() => ({ usuario, login, logout, registrar }), [usuario, login, logout, registrar]);
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return contexto;
}