import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { etiquetaRol, rutaInicialPorRol } from '../../utils/roles';

function AccesoDenegado() {
  const { usuario } = useAuth();
  return (
    <Container className="py-5 text-center">
      <h1>Acceso denegado</h1>
      <p>
        {usuario
          ? `Tu cuenta (${etiquetaRol(usuario.rol)}) no tiene permiso para ver esa página.`
          : 'Debes iniciar sesión para ver esa página.'}
      </p>
      <Link to={usuario ? rutaInicialPorRol(usuario.rol) : '/login'} className="btn btn-mil">
        {usuario ? 'Volver a mi inicio' : 'Iniciar sesión'}
      </Link>
    </Container>
  );
}

export default AccesoDenegado;
