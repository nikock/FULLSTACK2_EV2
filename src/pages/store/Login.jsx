import { useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CampoFormulario from '../../components/common/CampoFormulario';
import { useAuth } from '../../context/AuthContext';
import { esValido, validarLogin } from '../../utils/validators';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const [valores, setValores] = useState({ correo: '', clave: '' });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const cambiar = (campo) => (evento) => {
    setValores((actual) => ({ ...actual, [campo]: evento.target.value }));
    setErrorGeneral('');
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevosErrores = validarLogin(valores);
    setErrores(nuevosErrores);
    if (!esValido(nuevosErrores)) return;

    const resultado = login(valores.correo, valores.clave);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    const destinoPorRol = resultado.usuario.rol === 'admin' ? '/admin' : '/';
    navigate(ubicacion.state?.desde ?? destinoPorRol, { replace: true });
  };

  return (
    <Container className="py-4 pagina-formulario">
      <h1>Iniciar sesión</h1>
      <form noValidate onSubmit={enviar} className="tarjeta-formulario" aria-label="Iniciar sesión">
        <CampoFormulario id="login-correo" label="Correo" type="email" value={valores.correo} onChange={cambiar('correo')} error={errores.correo} autoComplete="email" />
        <CampoFormulario id="login-clave" label="Contraseña" type="password" value={valores.clave} onChange={cambiar('clave')} error={errores.clave} autoComplete="current-password" />
        {errorGeneral && <Alert variant="danger" role="alert">{errorGeneral}</Alert>}
        <Button type="submit" variant="mil" className="w-100">Entrar</Button>
        <p className="mt-3 mb-0 text-center">¿Aún no tienes cuenta? <Link to="/registro">Crear cuenta</Link></p>
      </form>
      <Alert variant="info" className="mt-4 small">
        <strong>Cuentas de prueba:</strong> admin@milsabores.cl / admin123 (administrador) · camila@duocuc.cl / camila123 (cliente Duoc) · hernan@correo.cl / hernan123 (cliente con 50% de descuento)
      </Alert>
    </Container>
  );
}

export default Login;
