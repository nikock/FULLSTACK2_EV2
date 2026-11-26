import { useEffect, useState } from 'react';
import { buscarOrden } from '../api/ordenApi';

export function useOrden(ordenId) {
  const [estado, setEstado] = useState({ orden: null, cargando: true, error: null });

  useEffect(() => {
    let cancelado = false;
    setEstado({ orden: null, cargando: true, error: null });
    buscarOrden(ordenId)
      .then((orden) => !cancelado && setEstado({ orden, cargando: false, error: null }))
      .catch((error) => !cancelado && setEstado({ orden: null, cargando: false, error }));
    return () => {
      cancelado = true;
    };
  }, [ordenId]);

  return [estado, setEstado];
}
