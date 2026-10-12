import { useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CampoFormulario from '../../components/common/CampoFormulario';
import { useAuth } from '../../context/AuthContext';
import { CODIGO_PROMOCIONAL } from '../../utils/beneficios';
import { esValido, validarRegistro } from '../../utils/validators';

const inicial = { nombre: '', apellidos: '', correo: '', nacimiento: '', codigo: '', clave: '', confirmarClave: '' };

function Registro() {
  const { registrar } = useAuth();
  const [valores, setValores] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [beneficios, setBeneficios] = useState(null);

  const cambiar = (campo) => (evento) => {
    setValores((actual) => ({ ...actual, [campo]: evento.target.value }));
    if (errores[campo]) setErrores((actual) => ({ ...actual, [campo]: undefined }));
  };

  const enviar = (evento) => {
    evento.preventDefault();
    setErrorGeneral('');
    const nuevosErrores = validarRegistro(valores);
    setErrores(nuevosErrores);
    if (!esValido(nuevosErrores)) return;

    const resultado = registrar(valores);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    setBeneficios(resultado.beneficios);
    setValores(inicial);
  };

  if (beneficios) {
    return (
      <Container className="py-4 pagina-formulario">
        <h1>¡Cuenta creada!</h1>
        <Alert variant="success">
          <p className="mb-2">Ya iniciaste sesión con tu nueva cuenta.</p>
          {beneficios.mensajes.length > 0 ? (
            <ul className="mb-0">{beneficios.mensajes.map((m) => <li key={m}>{m}</li>)}</ul>
          ) : (
            <p className="mb-0">Por ahora no tienes beneficios activos, pero siempre puedes usar nuestras ofertas.</p>
          )}
        </Alert>
        <Link to="/productos" className="btn btn-mil">Ir a la tienda</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4 pagina-formulario">
      <h1>Crear cuenta</h1>
      <p>Regístrate y revisa qué descuentos te corresponden:</p>
      <ul>
        <li>50% de descuento de por vida para mayores de 50 años.</li>
        <li>10% de descuento de por vida con el código {CODIGO_PROMOCIONAL}.</li>
        <li>Torta gratis de cumpleaños para estudiantes Duoc (correo @duocuc.cl).</li>
      </ul>
      <form noValidate onSubmit={enviar} className="tarjeta-formulario" aria-label="Crear cuenta">
        <Row>
          <Col md={6}><CampoFormulario id="registro-nombre" label="Nombre" value={valores.nombre} onChange={cambiar('nombre')} error={errores.nombre} autoComplete="given-name" /></Col>
          <Col md={6}><CampoFormulario id="registro-apellidos" label="Apellidos" value={valores.apellidos} onChange={cambiar('apellidos')} error={errores.apellidos} autoComplete="family-name" /></Col>
        </Row>
        <CampoFormulario id="registro-correo" label="Correo" type="email" value={valores.correo} onChange={cambiar('correo')} error={errores.correo} autoComplete="email" />
        <Row>
          <Col md={6}><CampoFormulario id="registro-nacimiento" label="Fecha de nacimiento" type="date" value={valores.nacimiento} onChange={cambiar('nacimiento')} error={errores.nacimiento} autoComplete="bday" /></Col>
          <Col md={6}>
            <CampoFormulario id="registro-codigo" label="Código promocional (opcional)" value={valores.codigo} onChange={cambiar('codigo')} list="sugerencias-codigo" autoComplete="off" />
            <datalist id="sugerencias-codigo"><option value={CODIGO_PROMOCIONAL} /></datalist>
          </Col>
        </Row>
        <Row>
          <Col md={6}><CampoFormulario id="registro-clave" label="Contraseña" type="password" value={valores.clave} onChange={cambiar('clave')} error={errores.clave} autoComplete="new-password" ayuda="Mínimo 6 caracteres." /></Col>
          <Col md={6}><CampoFormulario id="registro-confirmar" label="Repite la contraseña" type="password" value={valores.confirmarClave} onChange={cambiar('confirmarClave')} error={errores.confirmarClave} autoComplete="new-password" /></Col>
        </Row>
        {errorGeneral && <Alert variant="danger" role="alert">{errorGeneral}</Alert>}
        <Button type="submit" variant="mil" className="w-100">Crear cuenta</Button>
      </form>
    </Container>
  );
}

export default Registro;
