import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RutaProtegida({ rol }) {
  const { usuario } = useAuth();
  const ubicacion = useLocation();

  if (!usuario) return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />;
  if (rol && usuario.rol !== rol) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default RutaProtegida;


