export const esValido = (errores) => Object.keys(errores).length === 0;

const vacio = (valor) => String(valor ?? '').trim() === '';

export function esCorreoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(correo ?? '').trim());
}

export function validarContacto({ nombre, correo, mensaje }) {
  const errores = {};
  if (vacio(nombre)) errores.nombre = 'Ingresa tu nombre.';
  if (vacio(correo)) errores.correo = 'Ingresa tu correo.';
  else if (!esCorreoValido(correo)) errores.correo = 'Ingresa un correo válido.';
  if (vacio(mensaje)) errores.mensaje = 'Escribe tu mensaje.';
  else if (String(mensaje).trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  return errores;
}

export function validarLogin({ correo, clave }) {
  const errores = {};
  if (vacio(correo)) errores.correo = 'Ingresa tu correo.';
  else if (!esCorreoValido(correo)) errores.correo = 'Ingresa un correo válido.';
  if (vacio(clave)) errores.clave = 'Ingresa tu contraseña.';
  return errores;
}

export function validarRegistro({ nombre, apellidos, correo, nacimiento, clave, confirmarClave }, hoy = new Date()) {
  const errores = {};
  if (vacio(nombre)) errores.nombre = 'Ingresa tu nombre.';
  if (vacio(apellidos)) errores.apellidos = 'Ingresa tus apellidos.';
  if (vacio(correo)) errores.correo = 'Ingresa tu correo.';
  else if (!esCorreoValido(correo)) errores.correo = 'Ingresa un correo válido.';
  if (vacio(nacimiento)) errores.nacimiento = 'Ingresa tu fecha de nacimiento.';
  else if (new Date(nacimiento) > hoy) errores.nacimiento = 'La fecha no puede estar en el futuro.';
  if (vacio(clave)) errores.clave = 'Ingresa una contraseña.';
  else if (clave.length < 6) errores.clave = 'La contraseña debe tener al menos 6 caracteres.';
  if (confirmarClave !== undefined && clave !== confirmarClave) errores.confirmarClave = 'Las contraseñas no coinciden.';
  return errores;
}

export function validarCheckout({ nombre, apellidos, correo, calle, region, comuna }) {
  const errores = {};
  if (vacio(nombre)) errores.nombre = 'Ingresa tu nombre.';
  if (vacio(apellidos)) errores.apellidos = 'Ingresa tus apellidos.';
  if (vacio(correo)) errores.correo = 'Ingresa tu correo.';
  else if (!esCorreoValido(correo)) errores.correo = 'Ingresa un correo válido.';
  if (vacio(calle)) errores.calle = 'Ingresa la calle y número.';
  if (vacio(region)) errores.region = 'Selecciona una región.';
  if (vacio(comuna)) errores.comuna = 'Selecciona una comuna.';
  return errores;
}

export function validarProducto({ nombre, descripcion, precio, stock, stockCritico, oferta, categoriaId }) {
  const errores = {};
  if (vacio(nombre)) errores.nombre = 'Ingresa el nombre del producto.';
  if (vacio(descripcion)) errores.descripcion = 'Ingresa una descripción.';
  if (vacio(precio) || Number(precio) <= 0) errores.precio = 'El precio debe ser mayor que 0.';
  if (vacio(stock) || !Number.isInteger(Number(stock)) || Number(stock) < 0) errores.stock = 'El stock debe ser un entero mayor o igual a 0.';
  if (vacio(stockCritico) || !Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0) errores.stockCritico = 'El stock crítico debe ser un entero mayor o igual a 0.';
  if (vacio(oferta) || Number(oferta) < 0 || Number(oferta) > 90) errores.oferta = 'La oferta debe estar entre 0 y 90%.';
  if (vacio(categoriaId)) errores.categoriaId = 'Selecciona una categoría.';
  return errores;
}

export function validarCategoria({ nombre, descripcion }) {
  const errores = {};
  if (vacio(nombre)) errores.nombre = 'Ingresa el nombre de la categoría.';
  if (vacio(descripcion)) errores.descripcion = 'Ingresa una descripción.';
  return errores;
}

export function validarUsuarioAdmin({ nombre, apellidos, correo, clave, rol }, { esNuevo = true } = {}) {
  const errores = {};
  if (vacio(nombre)) errores.nombre = 'Ingresa el nombre.';
  if (vacio(apellidos)) errores.apellidos = 'Ingresa los apellidos.';
  if (vacio(correo)) errores.correo = 'Ingresa el correo.';
  else if (!esCorreoValido(correo)) errores.correo = 'Ingresa un correo válido.';
  if (!['admin', 'cliente'].includes(rol)) errores.rol = 'Selecciona un rol.';
  if (esNuevo && vacio(clave)) errores.clave = 'Ingresa una contraseña.';
  else if (!vacio(clave) && clave.length < 6) errores.clave = 'La contraseña debe tener al menos 6 caracteres.';
  return errores;
}
