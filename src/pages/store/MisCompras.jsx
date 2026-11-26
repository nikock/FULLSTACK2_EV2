import { useEffect, useState } from 'react';
import { Alert, Badge, Container, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listarMisOrdenes } from '../../api/ordenApi';
import EstadoVacio from '../../components/common/EstadoVacio';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

function MisCompras() {
  const [estado, setEstado] = useState({ ordenes: [], cargando: true, error: '' });

  useEffect(() => {
    let cancelado = false;
    listarMisOrdenes()
      .then((ordenes) => !cancelado && setEstado({ ordenes, cargando: false, error: '' }))
      .catch((error) => !cancelado && setEstado({ ordenes: [], cargando: false, error: error.message }));
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <Container className="py-4">
      <h1>Mis compras</h1>
      {estado.cargando && <p role="status"><Spinner animation="border" size="sm" className="me-2" />Cargando tus compras…</p>}
      {estado.error && <Alert variant="danger" role="alert">{estado.error}</Alert>}
      {!estado.cargando && !estado.error && estado.ordenes.length === 0 && (
        <EstadoVacio titulo="Aún no tienes compras" texto="Cuando compres, tus órdenes aparecerán aquí." accionTexto="Ver productos" accionHref="/productos" />
      )}
      {estado.ordenes.length > 0 && (
        <div className="table-responsive">
          <Table hover className="align-middle tabla-mil">
            <thead><tr><th>N° orden</th><th>Fecha</th><th>Productos</th><th>Total</th><th>Estado</th><th aria-label="Acciones" /></tr></thead>
            <tbody>
              {estado.ordenes.map((o) => (
                <tr key={o.id}>
                  <td>#{o.numero}</td>
                  <td>{formatearFecha(o.fecha)}</td>
                  <td>{o.items.reduce((suma, i) => suma + i.cantidad, 0)}</td>
                  <td>{formatearPrecio(o.total)}</td>
                  <td><Badge bg={o.estado === 'pagada' ? 'success' : 'danger'}>{o.estado === 'pagada' ? 'Pagada' : 'Fallida'}</Badge></td>
                  <td><Link to={o.estado === 'pagada' ? `/compra/exito/${o.id}` : `/compra/error/${o.id}`} className="btn btn-sm btn-outline-mil">Ver detalle</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default MisCompras;
