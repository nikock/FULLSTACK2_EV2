import { useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import PrecioProducto from '../../components/common/PrecioProducto';
import ProductGrid from '../../components/store/ProductGrid';
import { useCart } from '../../context/CartContext';
import { useColeccion } from '../../hooks/useColeccion';

function ProductoDetalle() {
  const { productoId } = useParams();
  const productos = useColeccion('productos');
  const categorias = useColeccion('categorias');
  const { agregar } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const producto = productos.find((p) => p.id === Number(productoId));
  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h1>Producto no encontrado</h1>
        <p>Es posible que ya no esté disponible.</p>
        <Link to="/productos" className="btn btn-mil">Volver a productos</Link>
      </Container>
    );
  }

  const categoria = categorias.find((c) => c.id === producto.categoriaId);
  const relacionados = productos.filter((p) => p.categoriaId === producto.categoriaId && p.id !== producto.id).slice(0, 4);
  const sinStock = producto.stock <= 0;

  const agregarAlCarrito = () => {
    agregar(producto, cantidad);
    setAgregado(true);
  };

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={5}>
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded detalle-imagen" />
        </Col>
        <Col md={7}>
          {categoria && <Link to={`/categorias/${categoria.id}`} className="small">{categoria.nombre}</Link>}
          <h1>{producto.nombre}</h1>
          <PrecioProducto producto={producto} />
          <p>{producto.descripcion}</p>
          <p className="mb-3">{sinStock ? <span className="text-danger">Sin stock</span> : <>Stock disponible: <strong>{producto.stock}</strong></>}</p>

          <div className="selector-cantidad mb-3">
            <Button variant="outline-mil" aria-label="Disminuir cantidad" disabled={cantidad <= 1} onClick={() => setCantidad((c) => c - 1)}>−</Button>
            <span className="cantidad" data-testid="cantidad-detalle">{cantidad}</span>
            <Button variant="outline-mil" aria-label="Aumentar cantidad" disabled={cantidad >= producto.stock} onClick={() => setCantidad((c) => c + 1)}>+</Button>
          </div>

          <Button variant="mil" disabled={sinStock} onClick={agregarAlCarrito}>Agregar al carrito</Button>
          {agregado && (
            <Alert variant="success" className="mt-3" dismissible onClose={() => setAgregado(false)}>
              Agregaste {cantidad} unidad(es) al carrito. <Link to="/carrito">Ver carrito</Link>
            </Alert>
          )}
        </Col>
      </Row>

      {relacionados.length > 0 && (
        <section className="mt-5">
          <h2 className="mb-3">También te puede gustar</h2>
          <ProductGrid productos={relacionados} categorias={categorias} onAgregar={(p) => agregar(p)} />
        </section>
      )}
    </Container>
  );
}

export default ProductoDetalle;
