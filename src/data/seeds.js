export const categoriasSeed = [
  { id: 1, nombre: 'Tortas Cuadradas', descripcion: 'Ideales para compartir en celebraciones grandes.', imagen: '/img/torta-cuadrada-chocolate.webp' },
  { id: 2, nombre: 'Tortas Circulares', descripcion: 'Clásicas, suaves y con rellenos tradicionales.', imagen: '/img/torta-circular-vainilla.png' },
  { id: 3, nombre: 'Postres Individuales', descripcion: 'Una porción perfecta para ti.', imagen: '/img/mousse-chocolate.webp' },
  { id: 4, nombre: 'Productos Sin Azúcar', descripcion: 'Dulzura sin azúcar añadida.', imagen: '/img/torta-naranja-sin-azucar.webp' },
  { id: 5, nombre: 'Pastelería Tradicional', descripcion: 'Recetas de siempre, horneadas cada mañana.', imagen: '/img/empanada-manzana.png' },
  { id: 6, nombre: 'Productos Sin Gluten', descripcion: 'Aptos para celíacos, sin perder el sabor.', imagen: '/img/brownie-sin-gluten.jpg' },
  { id: 7, nombre: 'Productos Veganos', descripcion: 'Sin ingredientes de origen animal.', imagen: '/img/torta-vegana-chocolate.jpg' },
  { id: 8, nombre: 'Tortas Especiales', descripcion: 'Para cumpleaños, bodas y ocasiones únicas.', imagen: '/img/torta-boda.jpeg' },
];

export const productosSeed = [
  { id: 1, nombre: 'Torta Cuadrada de Chocolate', descripcion: 'Bizcocho húmedo de cacao con ganache de chocolate semi amargo.', precio: 45000, categoriaId: 1, imagen: '/img/torta-cuadrada-chocolate.webp', stock: 12, stockCritico: 4, oferta: 0, destacado: true },
  { id: 2, nombre: 'Torta Cuadrada de Frutas', descripcion: 'Bizcocho de vainilla con crema chantilly y frutas de la estación.', precio: 50000, categoriaId: 1, imagen: '/img/torta-cuadrada-frutas.png', stock: 8, stockCritico: 3, oferta: 0, destacado: false },
  { id: 3, nombre: 'Torta Circular de Vainilla', descripcion: 'Tres capas de bizcocho de vainilla rellenas con crema pastelera.', precio: 40000, categoriaId: 2, imagen: '/img/torta-circular-vainilla.png', stock: 10, stockCritico: 4, oferta: 0, destacado: true },
  { id: 4, nombre: 'Torta Circular de Manjar', descripcion: 'Panqueque y manjar artesanal con nueces, receta de la casa.', precio: 42000, categoriaId: 2, imagen: '/img/torta-circular-manjar.png', stock: 9, stockCritico: 3, oferta: 20, destacado: false },
  { id: 5, nombre: 'Mousse de Chocolate', descripcion: 'Mousse aireado de chocolate belga en vaso individual.', precio: 5000, categoriaId: 3, imagen: '/img/mousse-chocolate.webp', stock: 30, stockCritico: 8, oferta: 15, destacado: true },
  { id: 6, nombre: 'Tiramisú Clásico', descripcion: 'Café, mascarpone y bizcocho de soletilla, estilo italiano.', precio: 5500, categoriaId: 3, imagen: '/img/tiramisu-clasico.jpg', stock: 3, stockCritico: 6, oferta: 10, destacado: false },
  { id: 7, nombre: 'Torta Sin Azúcar de Naranja', descripcion: 'Bizcocho cítrico endulzado con stevia, sin azúcar añadida.', precio: 48000, categoriaId: 4, imagen: '/img/torta-naranja-sin-azucar.webp', stock: 6, stockCritico: 3, oferta: 0, destacado: true },
  { id: 8, nombre: 'Cheesecake Sin Azúcar', descripcion: 'Cheesecake cremoso con base de almendras y endulzante natural.', precio: 47000, categoriaId: 4, imagen: '/img/cheesecake-sin-azucar.webp', stock: 5, stockCritico: 3, oferta: 0, destacado: false },
  { id: 9, nombre: 'Empanada de Manzana', descripcion: 'Masa hojaldrada rellena de manzana y canela.', precio: 3000, categoriaId: 5, imagen: '/img/empanada-manzana.png', stock: 40, stockCritico: 10, oferta: 10, destacado: false },
  { id: 10, nombre: 'Tarta de Santiago', descripcion: 'Tarta de almendras de origen gallego, sin harina de trigo.', precio: 6000, categoriaId: 5, imagen: '/img/tarta-santiago.jpg', stock: 14, stockCritico: 5, oferta: 0, destacado: false },
  { id: 11, nombre: 'Brownie Sin Gluten', descripcion: 'Brownie denso de chocolate preparado con harina de arroz.', precio: 4000, categoriaId: 6, imagen: '/img/brownie-sin-gluten.jpg', stock: 25, stockCritico: 8, oferta: 0, destacado: false },
  { id: 12, nombre: 'Pan Sin Gluten', descripcion: 'Pan de molde esponjoso para celíacos.', precio: 3500, categoriaId: 6, imagen: '/img/pan-sin-gluten.jpg', stock: 18, stockCritico: 6, oferta: 0, destacado: false },
  { id: 13, nombre: 'Torta Vegana de Chocolate', descripcion: 'Torta de cacao con bebida vegetal y cobertura de ganache vegano.', precio: 50000, categoriaId: 7, imagen: '/img/torta-vegana-chocolate.jpg', stock: 4, stockCritico: 3, oferta: 0, destacado: false },
  { id: 14, nombre: 'Galletas Veganas de Avena', descripcion: 'Pack de galletas de avena y pasas, sin huevo ni lácteos.', precio: 4500, categoriaId: 7, imagen: '/img/galletas-veganas-avena.jpg', stock: 35, stockCritico: 10, oferta: 25, destacado: false },
  { id: 15, nombre: 'Torta Especial de Cumpleaños', descripcion: 'Torta personalizable con mensaje y decoración a elección.', precio: 55000, categoriaId: 8, imagen: '/img/torta-cumpleanos.webp', stock: 7, stockCritico: 3, oferta: 0, destacado: true },
  { id: 16, nombre: 'Torta Especial de Boda', descripcion: 'Torta de varios pisos con decoración floral para tu gran día.', precio: 60000, categoriaId: 8, imagen: '/img/torta-boda.jpeg', stock: 2, stockCritico: 2, oferta: 0, destacado: false },
];

export const usuariosSeed = [
  { id: 1, nombre: 'Administrador', apellidos: 'Mil Sabores', correo: 'admin@milsabores.cl', clave: 'admin123', rol: 'admin', nacimiento: '1980-05-10', telefono: '+56 9 1111 2222', descuento: 0, tortaCumple: false, activo: true },
  { id: 2, nombre: 'Camila', apellidos: 'Rojas Soto', correo: 'camila@duocuc.cl', clave: 'camila123', rol: 'cliente', nacimiento: '2002-08-21', telefono: '+56 9 3333 4444', descuento: 0, tortaCumple: true, activo: true },
  { id: 3, nombre: 'Don Hernán', apellidos: 'Pérez Lagos', correo: 'hernan@correo.cl', clave: 'hernan123', rol: 'cliente', nacimiento: '1958-03-02', telefono: '+56 9 5555 6666', descuento: 50, tortaCumple: false, activo: true },
];

export const ordenesSeed = [];

export const blogsSeed = [
  {
    id: 1,
    titulo: 'Así nació nuestra torta más grande del mundo',
    resumen: 'La historia detrás del récord Guinness de 1995.',
    fecha: '2026-03-12',
    imagen: '/img/torta-circular-manjar.png',
    contenido: [
      'En 1995 un equipo de pasteleros de Mil Sabores colaboró en la elaboración de la torta más grande del mundo. Durante tres días se coordinaron más de cien personas para hornear, rellenar y montar cada capa.',
      'Aquella experiencia nos enseñó que una buena torta se construye en equipo: cada receta se probó decenas de veces antes de llegar a la mesa. Ese mismo cuidado lo seguimos aplicando hoy en cada pedido, grande o pequeño.',
    ],
  },
  {
    id: 2,
    titulo: 'Cómo elegir la torta perfecta para tu celebración',
    resumen: 'Tamaños, sabores y opciones sin azúcar, sin gluten o veganas.',
    fecha: '2026-05-04',
    imagen: '/img/torta-cumpleanos.webp',
    contenido: [
      'Para elegir el tamaño, calcula una porción por invitado y suma un 10% extra. Las tortas cuadradas rinden más porciones por superficie, mientras que las circulares son ideales para reuniones pequeñas.',
      'Si algún invitado tiene restricciones, ten en cuenta que contamos con una línea sin azúcar, otra sin gluten y otra completamente vegana. Puedes revisarlas en la sección de categorías.',
    ],
  },
];




