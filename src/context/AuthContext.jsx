import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginApi, obtenerPerfil, registro as registroApi } from '../api/authApi';
import {
  CLAVE_TOKEN,
  cerrarSesion,
  getToken,
  getUsuarioGuardado,
  guardarSesion,
  guardarUsuario,
  suscribirSesionExpirada,
} from '../auth/auth';
import { limpiarDatosPrivados } from '../data/store';
import { describirBeneficios } from '../utils/beneficios';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => (getToken() ? getUsuarioGuardado() : null));
  const [cargando, setCargando] = useState(() => getToken() !== null);

  useEffect(() => {
    if (!getToken()) {
      setCargando(false);
      return undefined;
    }
    let cancelado = false;
    obtenerPerfil()
      .then((perfil) => {
        if (cancelado) return;
        guardarUsuario(perfil);
        setUsuario(perfil);
      })
      .catch((error) => {
        if (cancelado) return;
        if ([401, 403, 404].includes(error.status)) cerrarSesion();
        setUsuario(null);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(
    () =>
      suscribirSesionExpirada(() => {
        limpiarDatosPrivados();
        setUsuario(null);
      }),
    [],
  );

  useEffect(() => {
    const alCambiarAlmacenamiento = (evento) => {
      if (evento.key === CLAVE_TOKEN && evento.newValue === null) {
        limpiarDatosPrivados();
        setUsuario(null);
      }
    };
    window.addEventListener('storage', alCambiarAlmacenamiento);
    return () => window.removeEventListener('storage', alCambiarAlmacenamiento);
  }, []);

  const iniciarSesion = useCallback((respuesta) => {
    guardarSesion(respuesta);
    limpiarDatosPrivados();
    setUsuario(respuesta.usuario);
    setCargando(false);
  }, []);

  const login = useCallback(
    async (correo, clave) => {
      try {
        const respuesta = await loginApi(correo.trim(), clave);
        iniciarSesion(respuesta);
        return { ok: true, usuario: respuesta.usuario };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },
    [iniciarSesion],
  );

  const registrar = useCallback(
    async ({ nombre, apellidos, correo, nacimiento, codigo, clave, telefono }) => {
      try {
        const respuesta = await registroApi({
          nombre: nombre.trim(),
          apellidos: apellidos.trim(),
          correo: correo.trim(),
          nacimiento,
          codigo: codigo?.trim(),
          clave,
          telefono: telefono?.trim(),
        });
        iniciarSesion(respuesta);
        return { ok: true, usuario: respuesta.usuario, beneficios: describirBeneficios(respuesta.usuario) };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },
    [iniciarSesion],
  );

  const logout = useCallback(() => {
    cerrarSesion();
    limpiarDatosPrivados();
    setUsuario(null);
  }, []);

  const recargarUsuario = useCallback(async () => {
    const perfil = await obtenerPerfil();
    guardarUsuario(perfil);
    setUsuario(perfil);
    return perfil;
  }, []);

  const valor = useMemo(
    () => ({
      usuario,
      cargando,
      rol: usuario?.rol ?? null,
      autenticado: usuario !== null,
      tieneRol: (...roles) => usuario !== null && roles.includes(usuario.rol),
      login,
      logout,
      registrar,
      recargarUsuario,
    }),
    [usuario, cargando, login, logout, registrar, recargarUsuario],
  );
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return contexto;
}
