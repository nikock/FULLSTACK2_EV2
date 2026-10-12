import { Col, ProgressBar, Row, Table } from 'react-bootstrap';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import StatCard from '../../components/admin/StatCard';
import { useColeccion } from '../../hooks/useColeccion';
import { formatearPrecio } from '../../utils/formato';
import { resumenGeneral, ventasPorCategoria, ventasPorProducto } from '../../utils/reportes';

function AdminReportes() {
  const productos = useColeccion('productos');
  const categorias = useColeccion('categorias');
  const usuarios = useColeccion('usuarios');
  const ordenes = useColeccion('ordenes');

  const resumen = resumenGeneral({ productos, usuarios, ordenes });
  const porCategoria = ventasPorCategoria(ordenes, categorias);
  const topProductos = ventasPorProducto(ordenes).slice(0, 5);
  const maximo = Math.max(...porCategoria.map((c) => c.ingresos), 1);

  return (
    <>
      <EncabezadoAdmin titulo="Reportes" subtitulo="Ventas calculadas a partir de las órdenes pagadas" />
      <Row xs={1} md={3} className="g-3 mb-4">
        <Col><StatCard titulo="Ingresos" valor={formatearPrecio(resumen.ingresos)} detalle={`${resumen.compras} compra(s) pagada(s)`} variante="azul" /></Col>
        <Col><StatCard titulo="Pagos fallidos" valor={resumen.fallidas} detalle="Órdenes sin cobrar" variante="rosa" /></Col>
        <Col><StatCard titulo="Ticket promedio" valor={formatearPrecio(resumen.compras ? resumen.ingresos / resumen.compras : 0)} detalle="Ingreso por compra" variante="verde" /></Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <h2 className="h5">Ventas por categoría</h2>
          {porCategoria.map((c) => (
            <div key={c.categoriaId} className="mb-2">
              <div className="d-flex justify-content-between small"><span>{c.nombre}</span><span>{formatearPrecio(c.ingresos)}</span></div>
              <ProgressBar now={(c.ingresos / maximo) * 100} variant="mil" aria-label={`Ventas de ${c.nombre}`} />
            </div>
          ))}
        </Col>
        <Col lg={5}>
          <h2 className="h5">Productos más vendidos</h2>
          {topProductos.length === 0 ? (
            <p className="text-muted">Aún no hay ventas registradas.</p>
          ) : (
            <Table className="tabla-mil align-middle">
              <thead><tr><th>Producto</th><th>Unid.</th><th>Ingresos</th></tr></thead>
              <tbody>
                {topProductos.map((p) => (
                  <tr key={p.productoId}><td>{p.nombre}</td><td>{p.unidades}</td><td>{formatearPrecio(p.ingresos)}</td></tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
}

export default AdminReportes;
