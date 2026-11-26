import { useEffect, useSyncExternalStore } from 'react';
import { cargarSiHaceFalta, obtenerEstado, subscribe } from '../data/store';

export function useEstadoColeccion(nombre) {
  const leer = () => obtenerEstado(nombre);
  const estado = useSyncExternalStore(subscribe, leer, leer);

  useEffect(() => {
    cargarSiHaceFalta(nombre);
  }, [nombre, estado.cargado, estado.cargando, estado.error]);

  return estado;
}

export function useColeccion(nombre) {
  return useEstadoColeccion(nombre).datos;
}
