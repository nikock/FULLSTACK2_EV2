import { Badge, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import PrecioProducto from '../../components/common/PrecioProducto';
import SoloRol from '../../components/common/SoloRol';
import { useEstadoColeccion } from '../../hooks/useColeccion';
import { ROL_ADMIN } from '../../utils/roles';
import { esCritico } from '../../utils/reportes';

function AdminProductoDetalle() {
  const { productoId } = useParams();
  const { datos: productos, cargado } = useEstadoColeccion('productos');
  const { datos: categorias } = useEstadoColeccion('categorias');
  const producto = productos.find((p) => p.id === Number(productoId));

  if (!cargado) return <p role="status">Cargando producto…</p>;
  if (!producto) return <EstadoVacio titulo="Producto no encontrado" accionTexto="Volver a productos" accionHref="/admin/productos" />;

  const categoria = categorias.find((c) => c.id === producto.categoriaId);

  return (
    <>
      <EncabezadoAdmin titulo={producto.nombre} subtitulo={categoria?.nombre ?? 'Sin categoría'}>
        <Link to="/admin/productos" className="btn btn-outline-secondary">Volver</Link>
        <SoloRol roles={[ROL_ADMIN]}>
          <Link to={`/admin/productos/${producto.id}/editar`} className="btn btn-mil">Editar</Link>
        </SoloRol>
      </EncabezadoAdmin>
      <Row className="g-4">
        <Col md={4}><img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded" /></Col>
        <Col md={8}>
          <PrecioProducto producto={producto} />
          <p className="mt-2">{producto.descripcion}</p>
          <dl className="row">
            <dt className="col-sm-4">Stock</dt>
            <dd className="col-sm-8">{producto.stock} {esCritico(producto) && <Badge bg="danger">Crítico</Badge>}</dd>
            <dt className="col-sm-4">Stock crítico</dt>
            <dd className="col-sm-8">{producto.stockCritico}</dd>
            <dt className="col-sm-4">Oferta</dt>
            <dd className="col-sm-8">{producto.oferta > 0 ? `${producto.oferta}%` : 'Sin oferta'}</dd>
            <dt className="col-sm-4">Destacado</dt>
            <dd className="col-sm-8">{producto.destacado ? 'Sí' : 'No'}</dd>
          </dl>
        </Col>
      </Row>
    </>
  );
}

export default AdminProductoDetalle;
