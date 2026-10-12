import { Badge, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import { productosDB } from '../../data/db';
import { useColeccion } from '../../hooks/useColeccion';
import { productosCriticos } from '../../utils/reportes';

const REPOSICION = 10;

function AdminProductosCriticos() {
  const criticos = productosCriticos(useColeccion('productos'));

  return (
    <>
      <EncabezadoAdmin titulo="Productos con stock crítico" subtitulo="Productos cuyo stock llegó al nivel mínimo definido">
        <Link to="/admin/productos" className="btn btn-outline-secondary">Volver a productos</Link>
      </EncabezadoAdmin>

      {criticos.length === 0 ? (
        <EstadoVacio titulo="Todo en orden" texto="Ningún producto está en nivel crítico." />
      ) : (
        <div className="table-responsive">
          <Table className="align-middle tabla-mil">
            <thead><tr><th>Producto</th><th>Stock</th><th>Stock crítico</th><th>Estado</th><th aria-label="Acciones" /></tr></thead>
            <tbody>
              {criticos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.stock}</td>
                  <td>{p.stockCritico}</td>
                  <td><Badge bg={p.stock === 0 ? 'danger' : 'warning'} text={p.stock === 0 ? undefined : 'dark'}>{p.stock === 0 ? 'Agotado' : 'Por reponer'}</Badge></td>
                  <td><Button size="sm" variant="mil" onClick={() => productosDB.actualizar(p.id, { stock: p.stock + REPOSICION })}>Reponer +{REPOSICION}</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default AdminProductosCriticos;
