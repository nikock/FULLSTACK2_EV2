import { useState } from 'react';
import { Badge, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import { useColeccion } from '../../hooks/useColeccion';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

function AdminOrdenes() {
  const ordenes = useColeccion('ordenes');
  const [estado, setEstado] = useState('todas');
  const visibles = [...ordenes].reverse().filter((o) => estado === 'todas' || o.estado === estado);

  return (
    <>
      <EncabezadoAdmin titulo="Órdenes y boletas" subtitulo={`${ordenes.length} orden(es) registrada(s)`}>
        <Form.Select aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="pagada">Pagadas</option>
          <option value="fallida">Con pago fallido</option>
        </Form.Select>
      </EncabezadoAdmin>

      {visibles.length === 0 ? (
        <EstadoVacio titulo="Aún no hay órdenes" texto="Cuando un cliente compre, la orden aparecerá aquí." />
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle tabla-mil">
            <thead>
              <tr><th>N° orden</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th><th aria-label="Acciones" /></tr>
            </thead>
            <tbody>
              {visibles.map((o) => (
                <tr key={o.id}>
                  <td>#{o.numero}</td>
                  <td>{formatearFecha(o.fecha)}</td>
                  <td>{o.cliente.nombre} {o.cliente.apellidos}</td>
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

export default AdminOrdenes;
