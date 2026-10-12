import { useState } from 'react';
import { Alert, Badge, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConfirmarModal from '../../components/admin/ConfirmarModal';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { useAuth } from '../../context/AuthContext';
import { usuariosDB } from '../../data/db';
import { useColeccion } from '../../hooks/useColeccion';

function AdminUsuarios() {
  const usuarios = useColeccion('usuarios');
  const { usuario: sesion } = useAuth();
  const [porEliminar, setPorEliminar] = useState(null);
  const [aviso, setAviso] = useState('');

  const pedirEliminar = (usuario) => {
    if (usuario.id === sesion?.id) {
      setAviso('No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada.');
      return;
    }
    setAviso('');
    setPorEliminar(usuario);
  };

  const eliminar = () => {
    usuariosDB.eliminar(porEliminar.id);
    setPorEliminar(null);
  };

  return (
    <>
      <EncabezadoAdmin titulo="Usuarios" subtitulo={`${usuarios.length} usuario(s)`}>
        <Link to="/admin/usuarios/nuevo" className="btn btn-mil">Nuevo usuario</Link>
      </EncabezadoAdmin>
      {aviso && <Alert variant="warning" dismissible onClose={() => setAviso('')}>{aviso}</Alert>}
      <div className="table-responsive">
        <Table hover className="align-middle tabla-mil">
          <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Descuento</th><th>Estado</th><th aria-label="Acciones" /></tr></thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre} {u.apellidos}</td>
                <td>{u.correo}</td>
                <td><Badge bg={u.rol === 'admin' ? 'dark' : 'secondary'}>{u.rol === 'admin' ? 'Administrador' : 'Cliente'}</Badge></td>
                <td>{u.descuento > 0 ? `${u.descuento}%` : '—'}</td>
                <td>{u.activo ? 'Activo' : 'Inactivo'}</td>
                <td className="text-nowrap">
                  <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm btn-outline-mil me-2">Editar</Link>
                  <Link to={`/admin/usuarios/${u.id}/historial`} className="btn btn-sm btn-outline-secondary me-2">Historial</Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => pedirEliminar(u)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ConfirmarModal mostrar={Boolean(porEliminar)} titulo="Eliminar usuario" mensaje={`¿Eliminar a ${porEliminar?.nombre} ${porEliminar?.apellidos ?? ''}?`} onConfirmar={eliminar} onCancelar={() => setPorEliminar(null)} />
    </>
  );
}

export default AdminUsuarios;
