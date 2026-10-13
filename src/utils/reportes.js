import { ESTADO_PAGADA } from './ordenes';

export const esCritico = (producto) => producto.stock <= producto.stockCritico;

export const productosCriticos = (productos) => productos.filter(esCritico);

export const valorInventario = (productos) =>
  productos.reduce((suma, p) => suma + p.precio * p.stock, 0);

const pagadas = (ordenes) => ordenes.filter((o) => o.estado === ESTADO_PAGADA);

export function ventasPorProducto(ordenes) {
  const acumulado = new Map();
  pagadas(ordenes).forEach((orden) =>
    orden.items.forEach((item) => {
      const actual = acumulado.get(item.productoId) ?? { productoId: item.productoId, nombre: item.nombre, unidades: 0, ingresos: 0 };
      actual.unidades += item.cantidad;
      actual.ingresos += item.subtotal;
      acumulado.set(item.productoId, actual);
    }),
  );
  return [...acumulado.values()].sort((a, b) => b.ingresos - a.ingresos);
}

export function ventasPorCategoria(ordenes, categorias) {
  const acumulado = new Map(categorias.map((c) => [c.id, { categoriaId: c.id, nombre: c.nombre, unidades: 0, ingresos: 0 }]));
  pagadas(ordenes).forEach((orden) =>
    orden.items.forEach((item) => {
      const fila = acumulado.get(item.categoriaId);
      if (fila) {
        fila.unidades += item.cantidad;
        fila.ingresos += item.subtotal;
      }
    }),
  );
  return [...acumulado.values()].sort((a, b) => b.ingresos - a.ingresos);
}

export function resumenGeneral({ productos, usuarios, ordenes }) {
  const ventas = pagadas(ordenes);
  return {
    compras: ventas.length,
    ingresos: ventas.reduce((suma, o) => suma + o.total, 0),
    productos: productos.length,
    inventario: productos.reduce((suma, p) => suma + p.stock, 0),
    usuarios: usuarios.length,
    criticos: productosCriticos(productos).length,
    fallidas: ordenes.length - ventas.length,
  };
}
