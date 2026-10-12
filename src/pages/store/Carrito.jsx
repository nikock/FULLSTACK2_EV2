import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import EstadoVacio from '../../components/common/EstadoVacio';
import ResumenTotales from '../../components/common/ResumenTotales';
import CarritoTabla from '../../components/store/CarritoTabla';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { calcularTotales } from '../../utils/cart';

function Carrito() {
  const { detalle, cambiarCantidad, quitar, vaciar } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const descuento = usuario?.descuento ?? 0;
  const totales = calcularTotales(detalle, descuento);

  if (detalle.length === 0) {
    return (
      <Container className="py-4">
        <h1>Mi carrito</h1>
        <EstadoVacio titulo="Tu carrito está vacío" texto="Agrega algunos productos para comenzar tu compra." accionTexto="Ver productos" accionHref="/productos" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1>Mi carrito</h1>
      <Row className="g-4">
        <Col lg={8}>
          <CarritoTabla detalle={detalle} onCambiarCantidad={cambiarCantidad} onQuitar={quitar} />
          <div className="d-flex gap-2 flex-wrap">
            <Button variant="outline-secondary" onClick={vaciar}>Vaciar carrito</Button>
            <Link to="/productos" className="btn btn-outline-mil">Seguir comprando</Link>
          </div>
        </Col>
        <Col lg={4}>
          <div className="panel-resumen">
            <h2 className="h5">Resumen</h2>
            <ResumenTotales totales={totales} descuentoPorcentaje={descuento} />
            {!usuario && <p className="small text-muted">Inicia sesión para aplicar tus descuentos de cliente.</p>}
            <Button variant="mil" className="w-100" onClick={() => navigate('/checkout')}>Comprar ahora</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;