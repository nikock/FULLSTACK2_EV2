import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import StatCard from '../../components/admin/StatCard';
import { useColeccion } from '../../hooks/useColeccion';
import { formatearPrecio } from '../../utils/formato';
import { valorInventario, ventasPorProducto } from '../../utils/reportes';

function AdminProductosReportes() {
  const productos = useColeccion('productos');
  const ordenes = useColeccion('ordenes');
  const ventas = ventasPorProducto(ordenes);
  const unidades = (id) => ventas.find((v) => v.productoId === id);

  return (
    <>
      <EncabezadoAdmin titulo="Reporte de productos" subtitulo="Inventario valorizado y ventas por producto">
        <Link to="/admin/productos" className="btn btn-outline-secondary">Volver a productos</Link>
      </EncabezadoAdmin>
      <div className="mb-4 stat-fila">
        <StatCard titulo="Valor del inventario" valor={formatearPrecio(valorInventario(productos))} detalle="Precio de lista × stock" variante="verde" />
      </div>
      <div className="table-responsive">
        <Table className="align-middle tabla-mil">
          <thead><tr><th>Producto</th><th>Stock</th><th>Unidades vendidas</th><th>Ingresos</th></tr></thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.stock}</td>
                <td>{unidades(p.id)?.unidades ?? 0}</td>
                <td>{formatearPrecio(unidades(p.id)?.ingresos ?? 0)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default AdminProductosReportes;
