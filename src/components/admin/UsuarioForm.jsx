import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { esValido, validarUsuarioAdmin } from '../../utils/validators';
import CampoFormulario from '../common/CampoFormulario';

function UsuarioForm({ inicial, onSubmit, onCancelar }) {
  const esNuevo = !inicial;
  const [valores, setValores] = useState({
    nombre: inicial?.nombre ?? '',
    apellidos: inicial?.apellidos ?? '',
    correo: inicial?.correo ?? '',
    telefono: inicial?.telefono ?? '',
    nacimiento: inicial?.nacimiento ?? '',
    rol: inicial?.rol ?? 'cliente',
    clave: '',
    descuento: String(inicial?.descuento ?? 0),
    activo: inicial?.activo ?? true,
  });
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (evento) => {
    const valor = evento.target.type === 'checkbox' ? evento.target.checked : evento.target.value;
    setValores((actual) => ({ ...actual, [campo]: valor }));
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevosErrores = validarUsuarioAdmin(valores, { esNuevo });
    setErrores(nuevosErrores);
    if (!esValido(nuevosErrores)) return;
    const datos = {
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim(),
      telefono: valores.telefono.trim(),
      nacimiento: valores.nacimiento,
      rol: valores.rol,
      descuento: Math.min(Math.max(Number(valores.descuento) || 0, 0), 100),
      activo: valores.activo,
    };
    if (valores.clave) datos.clave = valores.clave;
    onSubmit(datos);
  };

  return (
    <Form noValidate onSubmit={enviar} className="tarjeta-formulario" aria-label="Formulario de usuario">
      <Row>
        <Col md={6}><CampoFormulario id="usuario-nombre" label="Nombre" value={valores.nombre} onChange={cambiar('nombre')} error={errores.nombre} /></Col>
        <Col md={6}><CampoFormulario id="usuario-apellidos" label="Apellidos" value={valores.apellidos} onChange={cambiar('apellidos')} error={errores.apellidos} /></Col>
      </Row>
      <CampoFormulario id="usuario-correo" label="Correo" type="email" value={valores.correo} onChange={cambiar('correo')} error={errores.correo} />
      <Row>
        <Col md={6}><CampoFormulario id="usuario-telefono" label="Teléfono" value={valores.telefono} onChange={cambiar('telefono')} /></Col>
        <Col md={6}><CampoFormulario id="usuario-nacimiento" label="Fecha de nacimiento" type="date" value={valores.nacimiento} onChange={cambiar('nacimiento')} /></Col>
      </Row>
      <Row>
        <Col md={4}>
          <CampoFormulario id="usuario-rol" label="Rol" as="select" value={valores.rol} onChange={cambiar('rol')} error={errores.rol}>
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </CampoFormulario>
        </Col>
        <Col md={4}><CampoFormulario id="usuario-descuento" label="Descuento (%)" type="number" min="0" max="100" value={valores.descuento} onChange={cambiar('descuento')} /></Col>
        <Col md={4}>
          <CampoFormulario id="usuario-clave" label={esNuevo ? 'Contraseña' : 'Nueva contraseña'} type="password" value={valores.clave} onChange={cambiar('clave')} error={errores.clave} ayuda={esNuevo ? undefined : 'Déjala vacía para mantener la actual.'} autoComplete="new-password" />
        </Col>
      </Row>
      <Form.Check id="usuario-activo" type="switch" className="mb-3" label="Cuenta activa" checked={valores.activo} onChange={cambiar('activo')} />
      <div className="d-flex gap-2">
        <Button type="submit" variant="mil">{esNuevo ? 'Crear usuario' : 'Guardar cambios'}</Button>
        <Button variant="outline-secondary" onClick={onCancelar}>Cancelar</Button>
      </div>
    </Form>
  );
}

export default UsuarioForm;
