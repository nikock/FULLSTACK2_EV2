import { useState } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import CampoFormulario from '../../components/common/CampoFormulario';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { useAuth } from '../../context/AuthContext';
import { usuariosRepo } from '../../data/store';
import { esValido, validarUsuarioAdmin } from '../../utils/validators';

function AdminPerfil() {
  const { usuario, recargarUsuario } = useAuth();
  const [valores, setValores] = useState({ nombre: usuario.nombre, apellidos: usuario.apellidos, telefono: usuario.telefono ?? '', clave: '' });
  const [errores, setErrores] = useState({});
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState('');

  const cambiar = (campo) => (evento) => {
    setValores((actual) => ({ ...actual, [campo]: evento.target.value }));
    setGuardado(false);
  };

  const guardar = async (evento) => {
    evento.preventDefault();
    const nuevosErrores = validarUsuarioAdmin({ ...valores, correo: usuario.correo, rol: usuario.rol }, { esNuevo: false });
    setErrores(nuevosErrores);
    if (!esValido(nuevosErrores)) return;
    const cambios = { nombre: valores.nombre.trim(), apellidos: valores.apellidos.trim(), telefono: valores.telefono.trim() };
    if (valores.clave) cambios.clave = valores.clave;
    try {
      setError('');
      await usuariosRepo.actualizar(usuario.id, { ...usuario, ...cambios });
      await recargarUsuario();
      setValores((actual) => ({ ...actual, clave: '' }));
      setGuardado(true);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <EncabezadoAdmin titulo="Mi perfil" subtitulo={usuario.correo} />
      <form noValidate onSubmit={guardar} className="tarjeta-formulario" aria-label="Perfil">
        <Row>
          <Col md={6}><CampoFormulario id="perfil-nombre" label="Nombre" value={valores.nombre} onChange={cambiar('nombre')} error={errores.nombre} /></Col>
          <Col md={6}><CampoFormulario id="perfil-apellidos" label="Apellidos" value={valores.apellidos} onChange={cambiar('apellidos')} error={errores.apellidos} /></Col>
        </Row>
        <CampoFormulario id="perfil-telefono" label="Teléfono" value={valores.telefono} onChange={cambiar('telefono')} />
        <CampoFormulario id="perfil-clave" label="Nueva contraseña" type="password" value={valores.clave} onChange={cambiar('clave')} error={errores.clave} ayuda="Déjala vacía para mantener la actual." autoComplete="new-password" />
        {error && <Alert variant="danger" role="alert">{error}</Alert>}
        {guardado && <Alert variant="success" role="status">Perfil actualizado.</Alert>}
        <Button type="submit" variant="mil">Guardar cambios</Button>
      </form>
    </>
  );
}

export default AdminPerfil;
