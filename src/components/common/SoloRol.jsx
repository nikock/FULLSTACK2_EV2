import { useAuth } from '../../context/AuthContext';

function SoloRol({ roles, children, alternativa = null }) {
  const { usuario } = useAuth();
  return usuario && roles.includes(usuario.rol) ? children : alternativa;
}

export default SoloRol;
