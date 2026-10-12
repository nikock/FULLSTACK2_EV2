import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PrecioProducto from '../common/PrecioProducto';

function ProductCard({ producto, categoriaNombre, onAgregar }) {
  const sinStock = producto.stock <= 0;
  const pocoStock = !sinStock && producto.stock <= producto.stockCritico;

  return (
    <Card className="producto-card h-100" data-testid="producto-card">
      <div className="producto-card-imagen">
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} loading="lazy" />
        {producto.oferta > 0 && (
          <Badge bg="mil" className="insignia-oferta">
            -{producto.oferta}%
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        {categoriaNombre && <small className="text-muted">{categoriaNombre}</small>}
        <Card.Title as="h3" className="h6 producto-titulo">
          <Link to={`/productos/${producto.id}`}>{producto.nombre}</Link>
        </Card.Title>
        <PrecioProducto producto={producto} />
        {sinStock && <small className="text-danger mb-2">Sin stock</small>}
        {pocoStock && <small className="text-warning-emphasis mb-2">¡Quedan solo {producto.stock}!</small>}
        <Button variant="mil" className="mt-auto" disabled={sinStock} onClick={() => onAgregar(producto)}>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
