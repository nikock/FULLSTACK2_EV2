# Tienda online, Pastelería Mil Sabores (frontend)

React + Vite + React Router + React-Bootstrap, conectado por API REST al backend Spring Boot
(`intermediario-base-de-datos`). Productos, categorías, usuarios y órdenes viven en la base de datos del
backend; en el navegador solo quedan el carrito y la sesión (tokens JWT).

## Cómo ejecutar

1. Levanta el backend (puerto 8080): `./mvnw spring-boot:run` (Swagger en http://localhost:8080/doc/swagger-ui.html).
2. Frontend:

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # pruebas (vitest)
```

La URL del backend se define en `.env.development` / `.env.production` con `VITE_API_URL`
(sin `/api` y sin barra final, por ejemplo `http://localhost:8080`). El backend permite CORS desde
`http://localhost:5173` y `http://localhost:4173` (`app.cors.allowed-origins`).

## Cuentas de prueba (las crea el backend al iniciar)

| Rol | Correo | Contraseña | Acceso |
|---|---|---|---|
| Administrador | admin@milsabores.cl | admin123 | Todo el panel |
| Vendedor | vendedor@milsabores.cl | vendedor123 | Panel: solo lista/detalle de productos y de órdenes |
| Cliente Duoc | camila@duocuc.cl | camila123 | Solo la tienda |
| Cliente 50% dcto. | hernan@correo.cl | hernan123 | Solo la tienda |

## Sesión y seguridad

- `POST /auth/login` y `/auth/registro` devuelven `token` (access, 15 min), `refreshToken` (7 días) y `usuario`.
  Se guardan en `localStorage` (`src/auth/auth.js`).
- `src/api/client.js` es el único cliente HTTP: agrega `Authorization: Bearer`, y si recibe `401` llama a
  `POST /auth/refresh` (una sola vez aunque haya varias peticiones a la vez) y repite la petición. Si el refresh
  también falla, cierra la sesión y envía al login.
- Al cargar la app (F5), `AuthContext` llama a `GET /usuario/me` para restaurar la sesión; mientras tanto las rutas
  protegidas muestran "Verificando tu sesión…".
- `RutaProtegida` decide con el rol que devuelve el servidor. `/checkout`, `/compra/*` y `/mis-compras` exigen login;
  `/admin` exige admin o vendedor; el vendedor solo entra a órdenes y productos (lectura). Los botones de
  crear/editar/eliminar se ocultan con `<SoloRol>`. El backend vuelve a validar cada permiso (403).
- Los errores del backend (por ejemplo `409 Stock insuficiente para …`) se muestran tal cual al usuario.

## Estructura

```
src/
├── api/         client.js (HTTP + refresh), authApi, productoApi, categoriaApi, usuarioApi, ordenApi, entregaApi, mapeadores
├── auth/        auth.js (tokens y usuario en localStorage)
├── data/        store.js (caché de colecciones traídas de la API), regiones, sucursales, blogs
├── hooks/       useColeccion.js, useOrden.js
├── context/     AuthContext.jsx, CartContext.jsx
├── utils/       cart, beneficios, validators, filtros, ordenes, reportes, formato, roles, storage
├── components/  common (SoloRol…), store, layout (RutaProtegida…), admin
└── pages/       store, admin
```

## Rutas

Públicas: `/` · `/productos` · `/productos/:id` · `/categorias` · `/categorias/:id` · `/ofertas` · `/carrito` · `/login` · `/registro` · `/nosotros` · `/blog` · `/blog/:id` · `/contacto`

Con sesión (cualquier rol): `/checkout` · `/compra/exito/:id` · `/compra/error/:id` · `/mis-compras`

Panel, admin y vendedor: `/admin/ordenes` · `/admin/ordenes/:id` · `/admin/productos` · `/admin/productos/:id`

Panel, solo admin: `/admin` · `/admin/productos/nuevo` · `/admin/productos/:id/editar` · `/admin/productos/criticos` · `/admin/productos/reportes` · `/admin/categorias(/nueva|/:id/editar)` · `/admin/usuarios(/nuevo|/:id/editar|/:id/historial)` · `/admin/entregas` · `/admin/reportes` · `/admin/perfil`

## Entrega

No incluyas `node_modules/`, `dist/` ni archivos `.zip` dentro del comprimido (ya están en `.gitignore`).
