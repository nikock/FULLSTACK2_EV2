import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import UsuarioForm from '../../components/admin/UsuarioForm';
import EstadoVacio from '../../components/common/EstadoVacio';
import { usuariosRepo } from '../../data/store';
import { useEstadoColeccion } from '../../hooks/useColeccion';

function AdminUsuarioForm() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();
  const { datos: usuarios, cargado } = useEstadoColeccion('usuarios');
  const [error, setError] = useState('');
  const editando = usuarioId !== undefined;
  const usuario = editando ? usuarios.find((u) => u.id === Number(usuarioId)) : undefined;

  if (editando && !cargado) return <p role="status">Cargando usuario…</p>;
  if (editando && !usuario) {
    return <EstadoVacio titulo="Usuario no encontrado" accionTexto="Volver a usuarios" accionHref="/admin/usuarios" />;
  }

  const guardar = async (datos) => {
    const duplicado = usuarios.some((u) => u.correo.toLowerCase() === datos.correo.toLowerCase() && u.id !== usuario?.id);
    if (duplicado) {
      setError('Ya existe otro usuario con ese correo.');
      return;
    }
    try {
      if (editando) await usuariosRepo.actualizar(usuario.id, datos);
      else await usuariosRepo.crear(datos);
      navigate('/admin/usuarios');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <EncabezadoAdmin titulo={editando ? `Editar: ${usuario.nombre}` : 'Nuevo usuario'} />
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
      <UsuarioForm inicial={usuario} onSubmit={guardar} onCancelar={() => navigate('/admin/usuarios')} />
    </>
  );
}

export default AdminUsuarioForm;
