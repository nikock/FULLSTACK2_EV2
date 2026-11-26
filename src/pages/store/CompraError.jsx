import { useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { conDatosDeEntrega } from '../../api/mapeadores';
import { reintentarPagoOrden } from '../../api/ordenApi';
import OrdenDetalle from '../../components/store/OrdenDetalle';
import { useCart } from '../../context/CartContext';
import { recargar } from '../../data/store';
import { useOrden } from '../../hooks/useOrden';
import { sincronizarEntrega } from '../../utils/entrega';

function CompraError() {
  const { ordenId } = useParams();
  const ubicacion = useLocation();
  const navigate = useNavigate();
  const { vaciar } = useCart();
  const [{ orden: base, cargando }] = useOrden(ordenId);
  const [error, setError] = useState('');
  const [procesando, setProcesando] = useState(false);

  if (cargando) {
    return <Container className="py-5 text-center"><p role="status">Cargando tu pedido…</p></Container>;
  }

  if (!base || base.estado !== 'fallida') {
    return (
      <Container className="py-5 text-center">
        <h1>No hay pagos pendientes</h1>
        <Link to="/" className="btn btn-mil">Ir al inicio</Link>
      </Container>
    );
  }

  const orden = conDatosDeEntrega(base, ubicacion.state ?? {});

  const reintentar = async () => {
    setError('');
    setProcesando(true);
    try {
      
      const pagada = await reintentarPagoOrden(orden.id);
      if (ubicacion.state?.entrega) await sincronizarEntrega(conDatosDeEntrega(pagada, ubicacion.state));
      recargar('productos');
      vaciar();
      navigate(`/compra/exito/${pagada.id}`, { state: ubicacion.state });
    } catch (e) {
      setError(e.message);
      setProcesando(false);
    }
  };

  return (
    <Container className="py-4 pagina-compra">
      <h1 className="text-danger">✖ No se pudo realizar el pago</h1>
      <p>Tu tarjeta no fue cobrada. Revisa el detalle e inténtalo nuevamente.</p>
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
      <div className="text-center mb-3">
        <Button variant="success" size="lg" onClick={reintentar} disabled={procesando}>
          {procesando ? 'Procesando…' : 'Volver a realizar el pago'}
        </Button>
      </div>
      <OrdenDetalle orden={orden} />
    </Container>
  );
}

export default CompraError;
