import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColeccion } from '../hooks/useColeccion';
import {
  agregarItem,
  calcularTotales,
  cambiarCantidad as cambiarCantidadItem,
  detallarItems,
  quitarItem,
} from '../utils/cart';
import { guardarJSON, leerJSON } from '../utils/storage';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const productos = useColeccion('productos');
  const [items, setItems] = useState(() => leerJSON('carrito', []));

  useEffect(() => {
    guardarJSON('carrito', items);
  }, [items]);

  const detalle = useMemo(() => detallarItems(items, productos), [items, productos]);
  const totales = useMemo(() => calcularTotales(detalle), [detalle]);

  const agregar = useCallback(
    (producto, cantidad = 1) => setItems((actual) => agregarItem(actual, producto, cantidad)),
    [],
  );

  const cambiarCantidad = useCallback(
    (productoId, cantidad) => {
      const producto = productos.find((p) => p.id === productoId);
      setItems((actual) => cambiarCantidadItem(actual, productoId, cantidad, producto ? producto.stock : Infinity));
    },
    [productos],
  );

  const quitar = useCallback((productoId) => setItems((actual) => quitarItem(actual, productoId)), []);
  const vaciar = useCallback(() => setItems([]), []);

  const valor = useMemo(
    () => ({ items, detalle, totales, agregar, cambiarCantidad, quitar, vaciar }),
    [items, detalle, totales, agregar, cambiarCantidad, quitar, vaciar],
  );

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

export function useCart() {
  const contexto = useContext(CartContext);
  if (!contexto) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return contexto;
}
