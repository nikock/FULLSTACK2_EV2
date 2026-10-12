import { useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import CampoFormulario from '../../components/common/CampoFormulario';
import { esValido, validarContacto } from '../../utils/validators';

const inicial = { nombre: '', correo: '', mensaje: '' };

function Contacto({ onEnviar = () => {} }) {
  const [valores, setValores] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (campo) => (evento) => {
    setValores((actual) => ({ ...actual, [campo]: evento.target.value }));
    setEnviado(false);
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevosErrores = validarContacto(valores);
    setErrores(nuevosErrores);
    if (!esValido(nuevosErrores)) {
      setEnviado(false);
      return;
    }
    onEnviar(valores);
    setEnviado(true);
    setValores(inicial);
  };

  return (
    <Container className="py-4 pagina-formulario">
      <h1>Contacto</h1>
      <p>¿Tienes dudas o quieres cotizar una torta especial? Escríbenos.</p>
      <form noValidate onSubmit={enviar} className="tarjeta-formulario" aria-label="Formulario de contacto">
        <CampoFormulario id="contacto-nombre" label="Nombre" value={valores.nombre} onChange={cambiar('nombre')} error={errores.nombre} autoComplete="name" />
        <CampoFormulario id="contacto-correo" label="Correo" type="email" value={valores.correo} onChange={cambiar('correo')} error={errores.correo} autoComplete="email" />
        <CampoFormulario id="contacto-mensaje" label="Mensaje" as="textarea" rows={4} value={valores.mensaje} onChange={cambiar('mensaje')} error={errores.mensaje} />
        {enviado && <Alert variant="success" role="status">¡Gracias! Tu mensaje fue enviado.</Alert>}
        <Button type="submit" variant="mil">Enviar mensaje</Button>
      </form>
    </Container>
  );
}

export default Contacto;
