import { Badge, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import { useColeccion } from '../../hooks/useColeccion';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

function AdminUsuarioHistorial() {
  const { usuarioId } = useParams();
  const usuario = useColeccion('usuarios').find((u) => u.id === Number(usuarioId));
  const ordenes = useColeccion('ordenes');

  if (!usuario) return <EstadoVacio titulo="Usuario no encontrado" accionTexto="Volver a usuarios" accionHref="/admin/usuarios" />;

  const compras = ordenes.filter((o) => o.usuarioId === usuario.id);

  return (
    <>
      <EncabezadoAdmin titulo={`Historial de compras: ${usuario.nombre} ${usuario.apellidos}`} subtitulo={usuario.correo}>
        <Link to="/admin/usuarios" className="btn btn-outline-secondary">Volver</Link>
      </EncabezadoAdmin>
      {compras.length === 0 ? (
        <EstadoVacio titulo="Sin compras" texto="Este usuario todavía no ha realizado compras con su sesión iniciada." />
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle tabla-mil">
            <thead><tr><th>N° orden</th><th>Fecha</th><th>Productos</th><th>Total</th><th>Estado</th><th aria-label="Acciones" /></tr></thead>
            <tbody>
              {compras.map((o) => (
                <tr key={o.id}>
                  <td>#{o.numero}</td>
                  <td>{formatearFecha(o.fecha)}</td>
                  <td>{o.items.reduce((suma, i) => suma + i.cantidad, 0)}</td>
                  <td>{formatearPrecio(o.total)}</td>
                  <td><Badge bg={o.estado === 'pagada' ? 'success' : 'danger'}>{o.estado === 'pagada' ? 'Pagada' : 'Fallida'}</Badge></td>
                  <td><Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-outline-mil">Ver boleta</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default AdminUsuarioHistorial;
