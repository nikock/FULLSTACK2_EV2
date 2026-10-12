import { useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import OrdenDetalle from '../../components/store/OrdenDetalle';
import { ordenesDB } from '../../data/db';

function CompraExitosa() {
  const { ordenId } = useParams();
  const orden = ordenesDB.obtenerPorId(ordenId);
  const [correoEnviado, setCorreoEnviado] = useState(false);

  if (!orden || orden.estado !== 'pagada') {
    return (
      <Container className="py-5 text-center">
        <h1>No encontramos esa compra</h1>
        <Link to="/" className="btn btn-mil">Ir al inicio</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4 pagina-compra">
      <h1 className="text-success">✔ Se ha realizado la compra</h1>
      <p>Gracias por tu compra, {orden.cliente.nombre}. Este es el resumen de tu pedido.</p>
      <OrdenDetalle orden={orden} />
      {correoEnviado && <Alert variant="success" className="mt-3">Enviamos la boleta a {orden.cliente.correo}.</Alert>}
      <div className="d-flex gap-2 justify-content-center flex-wrap mt-3">
        <Button variant="danger" onClick={() => window.print()}>Imprimir boleta en PDF</Button>
        <Button variant="success" onClick={() => setCorreoEnviado(true)}>Enviar boleta por email</Button>
        <Link to="/productos" className="btn btn-outline-mil">Seguir comprando</Link>
      </div>
    </Container>
  );
}

export default CompraExitosa;
