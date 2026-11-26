import { TIPO_DELIVERY, TIPO_RETIRO } from '../data/sucursales';

export const aCategoria = (dto) => ({
  id: dto.idCategoria,
  nombre: dto.nombre,
  descripcion: dto.descripcion ?? '',
  imagen: dto.imagen ?? '',
});

export const deCategoria = (categoria) => ({
  nombre: categoria.nombre,
  descripcion: categoria.descripcion,
  imagen: categoria.imagen,
});

export const aProducto = (dto) => ({
  id: dto.idProducto,
  nombre: dto.nombre,
  descripcion: dto.descripcion ?? '',
  precio: dto.precio,
  imagen: dto.imagen ?? '',
  stock: dto.stock,
  stockCritico: dto.stockCritico,
  oferta: dto.oferta,
  destacado: Boolean(dto.destacado),
  categoriaId: dto.categoria?.idCategoria ?? null,
});

export const deProducto = (producto) => ({
  nombre: producto.nombre,
  descripcion: producto.descripcion,
  precio: producto.precio,
  imagen: producto.imagen,
  stock: producto.stock,
  stockCritico: producto.stockCritico,
  oferta: producto.oferta,
  destacado: producto.destacado,
  categoria: { idCategoria: producto.categoriaId },
});

export const aUsuario = (dto) => ({
  id: dto.id,
  nombre: dto.nombre,
  apellidos: dto.apellidos,
  correo: dto.correo,
  rol: String(dto.rol ?? 'cliente').toLowerCase(),
  telefono: dto.telefono ?? '',
  nacimiento: dto.nacimiento ?? '',
  descuento: dto.descuento ?? 0,
  tortaCumple: Boolean(dto.tortaCumple),
  activo: dto.activo !== false,
});

export const deUsuario = (usuario) => {
  const cuerpo = {
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    correo: usuario.correo,
    rol: String(usuario.rol).toUpperCase(),
    telefono: usuario.telefono ?? '',
    nacimiento: usuario.nacimiento || null,
    descuento: usuario.descuento,
    activo: usuario.activo,
  };
  if (usuario.clave) cuerpo.clave = usuario.clave;
  return cuerpo;
};

export const tipoEntregaParaApi = (tipo) => (tipo === TIPO_RETIRO ? 'retiro' : 'delivery');
const tipoEntregaDesdeApi = (tipo) => (tipo === 'retiro' ? TIPO_RETIRO : TIPO_DELIVERY);

export const aOrden = (dto) => ({
  id: dto.idOrden,
  numero: dto.numero,
  fecha: dto.fecha,
  usuarioId: dto.usuarioId,
  cliente: { nombre: dto.clienteNombre ?? '', apellidos: '', correo: dto.clienteCorreo ?? '' },
  entrega: dto.tipoEntrega ? { tipo: tipoEntregaDesdeApi(dto.tipoEntrega) } : null,
  direccion: null,
  items: (dto.items ?? []).map((item) => ({
    productoId: item.productoId,
    nombre: item.nombre,
    imagen: item.imagen,
    precio: item.precio,
    cantidad: item.cantidad,
    subtotal: item.subtotal,
  })),
  subtotal: dto.subtotal,
  descuento: dto.descuento,
  total: dto.total,
  estado: dto.estado,
});

export const conDatosDeEntrega = (orden, { entrega, direccion, cliente } = {}) => ({
  ...orden,
  cliente: cliente ?? orden.cliente,
  entrega: entrega ?? orden.entrega,
  direccion: direccion ?? orden.direccion,
});

export const aDatosDeEntrega = (resultado) => {
  if (!resultado) return {};
  const d = resultado.datos;
  if (resultado.tipo === 'retiro') {
    return { entrega: { tipo: TIPO_RETIRO, sucursal: d.sucursal, fecha: d.fecha, hora: d.hora?.slice(0, 5) } };
  }
  return {
    entrega: { tipo: TIPO_DELIVERY, telefono: d.telefono, fecha: d.fecha },
    direccion: { calle: d.calle, departamento: d.departamento, region: d.region, comuna: d.comuna, indicaciones: d.indicaciones },
  };
};
