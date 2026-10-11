import { Route, Routes } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import RutaProtegida from './components/layout/RutaProtegida';
import StoreLayout from './components/layout/StoreLayout';
import AdminBoleta from './pages/admin/AdminBoleta';
import AdminCategoriaForm from './pages/admin/AdminCategoriaForm';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminPerfil from './pages/admin/AdminPerfil';
import AdminProductoForm from './pages/admin/AdminProductoForm';
import AdminProductos from './pages/admin/AdminProductos';
import AdminProductosCriticos from './pages/admin/AdminProductosCriticos';
import AdminProductosReportes from './pages/admin/AdminProductosReportes';
import AdminReportes from './pages/admin/AdminReportes';
import AdminUsuarioForm from './pages/admin/AdminUsuarioForm';
import AdminUsuarioHistorial from './pages/admin/AdminUsuarioHistorial';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import Blog from './pages/store/Blog';
import BlogDetalle from './pages/store/BlogDetalle';
import Carrito from './pages/store/Carrito';
import Categorias from './pages/store/Categorias';
import Checkout from './pages/store/Checkout';
import CompraError from './pages/store/CompraError';
import CompraExitosa from './pages/store/CompraExitosa';
import Contacto from './pages/store/Contacto';
import Inicio from './pages/store/Inicio';
import Login from './pages/store/Login';
import NotFound from './pages/store/NotFound';
import Nosotros from './pages/store/Nosotros';
import Ofertas from './pages/store/Ofertas';
import ProductoDetalle from './pages/store/ProductoDetalle';
import Productos from './pages/store/Productos';
import Registro from './pages/store/Registro';

function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<Inicio />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:productoId" element={<ProductoDetalle />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="categorias/:categoriaId" element={<Categorias />} />
        <Route path="ofertas" element={<Ofertas />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="compra/exito/:ordenId" element={<CompraExitosa />} />
        <Route path="compra/error/:ordenId" element={<CompraError />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:blogId" element={<BlogDetalle />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="admin" element={<RutaProtegida rol="admin" />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="ordenes" element={<AdminOrdenes />} />
          <Route path="ordenes/:ordenId" element={<AdminBoleta />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="productos/nuevo" element={<AdminProductoForm />} />
          <Route path="productos/criticos" element={<AdminProductosCriticos />} />
          <Route path="productos/reportes" element={<AdminProductosReportes />} />
          <Route path="productos/:productoId/editar" element={<AdminProductoForm />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="categorias/nueva" element={<AdminCategoriaForm />} />
          <Route path="categorias/:categoriaId/editar" element={<AdminCategoriaForm />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="usuarios/nuevo" element={<AdminUsuarioForm />} />
          <Route path="usuarios/:usuarioId/editar" element={<AdminUsuarioForm />} />
          <Route path="usuarios/:usuarioId/historial" element={<AdminUsuarioHistorial />} />
          <Route path="reportes" element={<AdminReportes />} />
          <Route path="perfil" element={<AdminPerfil />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
