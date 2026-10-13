import { precioFinal } from './formato';

export function agregarItem(items, producto, cantidad = 1) {
  if (!producto || producto.stock <= 0) return items;
  const existente = items.find((item) => item.productoId === producto.id);
  if (!existente) {
    return [...items, { productoId: producto.id, cantidad: Math.min(cantidad, producto.stock) }];
  }
  return items.map((item) =>
    item.productoId === producto.id
      ? { ...item, cantidad: Math.min(item.cantidad + cantidad, producto.stock) }
      : item,
  );
}

export function cambiarCantidad(items, productoId, cantidad, stock = Infinity) {
  if (cantidad <= 0) return quitarItem(items, productoId);
  return items.map((item) =>
    item.productoId === productoId ? { ...item, cantidad: Math.min(cantidad, stock) } : item,
  );
}

export function quitarItem(items, productoId) {
  return items.filter((item) => item.productoId !== productoId);
}

export function detallarItems(items, productos) {
  return items.flatMap((item) => {
    const producto = productos.find((p) => p.id === item.productoId);
    if (!producto) return [];
    const precioUnitario = precioFinal(producto);
    return [{ producto, cantidad: item.cantidad, precioUnitario, subtotal: precioUnitario * item.cantidad }];
  });
}

export function calcularTotales(detalle, descuentoPorcentaje = 0) {
  const subtotal = detalle.reduce((suma, linea) => suma + linea.subtotal, 0);
  const descuento = Math.round((subtotal * descuentoPorcentaje) / 100);
  return {
    cantidadTotal: detalle.reduce((suma, linea) => suma + linea.cantidad, 0),
    subtotal,
    descuento,
    total: subtotal - descuento,
  };
}
