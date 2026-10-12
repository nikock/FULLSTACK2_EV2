import { borrarClave, guardarJSON, leerJSON, PREFIJO } from '../utils/storage';
import { categoriasSeed, ordenesSeed, productosSeed, usuariosSeed } from './seeds';

const semillas = {
  productos: productosSeed,
  categorias: categoriasSeed,
  usuarios: usuariosSeed,
  ordenes: ordenesSeed,
};

const cache = {};
const oyentes = new Set();

const clonar = (valor) => JSON.parse(JSON.stringify(valor));
const notificar = () => oyentes.forEach((oyente) => oyente());

function leer(nombre) {
  if (cache[nombre]) return cache[nombre];
  let datos = leerJSON(nombre, null);
  if (!Array.isArray(datos)) {
    datos = clonar(semillas[nombre]);
    guardarJSON(nombre, datos);
  }
  cache[nombre] = datos;
  return datos;
}

function guardar(nombre, datos) {
  cache[nombre] = datos;
  guardarJSON(nombre, datos);
  notificar();
}

function crearRepositorio(nombre) {
  return {
    nombre,

    obtenerTodos: () => leer(nombre),
    obtenerPorId: (id) => leer(nombre).find((item) => item.id === Number(id)) ?? null,
    buscar: (predicado) => leer(nombre).filter(predicado),

    crear(datos) {
      const lista = leer(nombre);
      const id = lista.reduce((maximo, item) => Math.max(maximo, item.id), 0) + 1;
      const nuevo = { ...datos, id };
      guardar(nombre, [...lista, nuevo]);
      return nuevo;
    },

    actualizar(id, cambios) {
      const idNumerico = Number(id);
      const lista = leer(nombre);
      const posicion = lista.findIndex((item) => item.id === idNumerico);
      if (posicion === -1) return null;
      const actualizado = { ...lista[posicion], ...cambios, id: idNumerico };
      const copia = [...lista];
      copia[posicion] = actualizado;
      guardar(nombre, copia);
      return actualizado;
    },

    eliminar(id) {
      const idNumerico = Number(id);
      const lista = leer(nombre);
      if (!lista.some((item) => item.id === idNumerico)) return false;
      guardar(nombre, lista.filter((item) => item.id !== idNumerico));
      return true;
    },

    restaurar() {
      guardar(nombre, clonar(semillas[nombre]));
    },
  };
}

export const productosDB = crearRepositorio('productos');
export const categoriasDB = crearRepositorio('categorias');
export const usuariosDB = crearRepositorio('usuarios');
export const ordenesDB = crearRepositorio('ordenes');

export function subscribe(oyente) {
  oyentes.add(oyente);
  return () => oyentes.delete(oyente);
}

const repositorios = { productos: productosDB, categorias: categoriasDB, usuarios: usuariosDB, ordenes: ordenesDB };

export function obtenerRepositorio(nombre) {
  const repo = repositorios[nombre];
  if (!repo) throw new Error(`Colección desconocida: ${nombre}`);
  return repo;
}

export function reiniciarBaseDeDatos() {
  Object.keys(semillas).forEach((nombre) => {
    borrarClave(nombre);
    delete cache[nombre];
  });
  notificar();
}

if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('storage', (evento) => {
    if (evento.key && evento.key.startsWith(PREFIJO)) {
      delete cache[evento.key.slice(PREFIJO.length)];
      notificar();
    }
  });
}
