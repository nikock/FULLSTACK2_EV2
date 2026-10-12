import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OrdenDetalle from '../../components/store/OrdenDetalle';
import { useCart } from '../../context/CartContext';
import { ordenesDB } from '../../data/db';
import { reintentarPago } from '../../utils/compra';

function CompraError() {
  const { ordenId } = useParams();
  const orden = ordenesDB.obtenerPorId(ordenId);
  const navigate = useNavigate();
  const { vaciar } = useCart();

  if (!orden || orden.estado !== 'fallida') {
    return (
      <Container className="py-5 text-center">
        <h1>No hay pagos pendientes</h1>
        <Link to="/" className="btn btn-mil">Ir al inicio</Link>
      </Container>
    );
  }

  const reintentar = () => {
    const pagada = reintentarPago(orden.id);
    if (pagada) {
      vaciar();
      navigate(`/compra/exito/${pagada.id}`);
    }
  };

  return (
    <Container className="py-4 pagina-compra">
      <h1 className="text-danger">✖ No se pudo realizar el pago</h1>
      <p>Tu tarjeta no fue cobrada. Revisa el detalle e inténtalo nuevamente.</p>
      <div className="text-center mb-3">
        <Button variant="success" size="lg" onClick={reintentar}>Volver a realizar el pago</Button>
      </div>
      <OrdenDetalle orden={orden} />
    </Container>
  );
}

export default CompraError;