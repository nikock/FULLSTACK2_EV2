import { Spinner } from 'react-bootstrap';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RutaProtegida({ roles }) {
  const { usuario, cargando } = useAuth();
  const ubicacion = useLocation();

  if (cargando) {
    return (
      <div className="py-5 text-center" role="status" aria-live="polite">
        <Spinner animation="border" size="sm" className="me-2" />
        Verificando tu sesión…
      </div>
    );
  }
  if (!usuario) return <Navigate to="/login" replace state={{ desde: `${ubicacion.pathname}${ubicacion.search}` }} />;
  if (roles && !roles.includes(usuario.rol)) return <Navigate to="/acceso-denegado" replace />;
  return <Outlet />;
}

export default RutaProtegida;
