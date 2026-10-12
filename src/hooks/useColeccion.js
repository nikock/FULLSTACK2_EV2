import { useSyncExternalStore } from 'react';
import { obtenerRepositorio, subscribe } from '../data/db';

export function useColeccion(nombre) {
  const repo = obtenerRepositorio(nombre);
  return useSyncExternalStore(subscribe, repo.obtenerTodos, repo.obtenerTodos);
}
