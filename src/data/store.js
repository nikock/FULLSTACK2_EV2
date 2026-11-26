import { actualizarCategoria, crearCategoria, eliminarCategoria, listarCategorias } from '../api/categoriaApi';
import { listarOrdenes } from '../api/ordenApi';
import { actualizarProducto, crearProducto, eliminarProducto, listarProductos } from '../api/productoApi';
import { actualizarUsuario, crearUsuario, eliminarUsuario, listarUsuarios } from '../api/usuarioApi';

const cargadores = {
  productos: listarProductos,
  categorias: listarCategorias,
  usuarios: listarUsuarios, 
  ordenes: listarOrdenes, 
};

const INICIAL = Object.freeze({ datos: Object.freeze([]), cargado: false, cargando: false, error: null });

let estado = Object.fromEntries(Object.keys(cargadores).map((nombre) => [nombre, INICIAL]));
const versiones = {};
const oyentes = new Set();

const emitir = () => oyentes.forEach((oyente) => oyente());

function poner(nombre, parche) {
  estado = { ...estado, [nombre]: { ...estado[nombre], ...parche } };
  emitir();
}

export function subscribe(oyente) {
  oyentes.add(oyente);
  return () => oyentes.delete(oyente);
}

export function obtenerEstado(nombre) {
  if (!cargadores[nombre]) throw new Error(`Colección desconocida: ${nombre}`);
  return estado[nombre];
}

export async function recargar(nombre) {
  if (!cargadores[nombre]) throw new Error(`Colección desconocida: ${nombre}`);
  const version = (versiones[nombre] = (versiones[nombre] ?? 0) + 1);
  poner(nombre, { cargando: true, error: null });
  try {
    const datos = await cargadores[nombre]();
    if (versiones[nombre] === version) poner(nombre, { datos, cargado: true, cargando: false });
  } catch (error) {
    if (versiones[nombre] === version) poner(nombre, { cargando: false, error: error.message || 'Error al cargar los datos.' });
  }
}

export function cargarSiHaceFalta(nombre) {
  const actual = obtenerEstado(nombre);
  if (!actual.cargado && !actual.cargando && !actual.error) recargar(nombre);
}

export function limpiarDatosPrivados() {
  ['usuarios', 'ordenes'].forEach((nombre) => {
    versiones[nombre] = (versiones[nombre] ?? 0) + 1;
    estado = { ...estado, [nombre]: INICIAL };
  });
  emitir();
}

function crearRepositorio(nombre, api) {
  const luegoRecargar = async (resultado) => {
    await recargar(nombre);
    return resultado;
  };
  return {
    crear: async (datos) => luegoRecargar(await api.crear(datos)),
    actualizar: async (id, datos) => luegoRecargar(await api.actualizar(id, datos)),
    eliminar: async (id) => luegoRecargar(await api.eliminar(id)),
  };
}

export const productosRepo = crearRepositorio('productos', { crear: crearProducto, actualizar: actualizarProducto, eliminar: eliminarProducto });
export const categoriasRepo = crearRepositorio('categorias', { crear: crearCategoria, actualizar: actualizarCategoria, eliminar: eliminarCategoria });
export const usuariosRepo = crearRepositorio('usuarios', { crear: crearUsuario, actualizar: actualizarUsuario, eliminar: eliminarUsuario });
