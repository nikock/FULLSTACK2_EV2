# Tienda online, Pasteleria Mil Sabores

Tienda online en React + Vite + React Router + React-Bootstrap, con panel de administracion y datos simulados con persistencia en localStorage.

## comandos para ejecutar en la terminal

```bash
npm install
npm run dev
```

La tienda queda en http://localhost:5173

## Cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@milsabores.cl | admin123 |
| Cliente Duoc | camila@duocuc.cl | camila123 |
| Cliente con 50% de descuento | hernan@correo.cl | hernan123 |

## Estructura

```
src/
├── data/        seeds.js, db.js (CRUD + persistencia), regiones.js
├── hooks/       useColeccion.js
├── context/     AuthContext.jsx, CartContext.jsx
├── utils/       cart, beneficios, validators, filtros, ordenes, compra, reportes, formato, storage
├── components/  common, store, layout, admin
└── pages/       store, admin
```

## Rutas

Tienda: `/` · `/productos` · `/productos/:id` · `/categorias` · `/categorias/:id` · `/ofertas` · `/carrito` · `/checkout` · `/compra/exito/:id` · `/compra/error/:id` · `/login` · `/registro` · `/nosotros` · `/blog` · `/blog/:id` · `/contacto`

Admin: `/admin` · `/admin/ordenes` · `/admin/ordenes/:id` · `/admin/productos` · `/admin/productos/nuevo` · `/admin/productos/:id/editar` · `/admin/productos/criticos` · `/admin/productos/reportes` · `/admin/categorias` · `/admin/categorias/nueva` · `/admin/categorias/:id/editar` · `/admin/usuarios` · `/admin/usuarios/nuevo` · `/admin/usuarios/:id/editar` · `/admin/usuarios/:id/historial` · `/admin/reportes` · `/admin/perfil`
