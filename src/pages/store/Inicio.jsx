import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductGrid from '../../components/store/ProductGrid';
import { useCart } from '../../context/CartContext';
import { useColeccion } from '../../hooks/useColeccion';

function Inicio() {
  const productos = useColeccion('productos');
  const categorias = useColeccion('categorias');
  const { agregar } = useCart();
  const destacados = productos.filter((p) => p.destacado).slice(0, 4);

  return (
    <>
      <section className="presentacion-tienda">
        <Container>
          <Row className="align-items-center g-4">
            <Col md={6}>
              <h1>Celebrando 50 años de historia</h1>
              <p className="lead">
                Desde 1974 horneamos las tortas y postres que acompañan los momentos más importantes de miles de familias chilenas.
                Hoy renovamos nuestra tienda online para que pidas tu torta favorita en pocos clics.
              </p>
              <Link to="/productos" className="btn btn-mil me-2">Ver productos</Link>
              <Link to="/nosotros" className="btn btn-outline-mil">Conócenos</Link>
            </Col>
            <Col md={6} className="text-center">
              <img src="/img/portada.png" alt="Pastelería Mil Sabores" className="img-fluid portada" />
            </Col>
          </Row>
        </Container>
      </section>

      <Container as="section" className="py-4">
        <h2 className="text-center mb-4">Categorías</h2>
        <Row xs={2} md={4} className="g-3">
          {categorias.map((c) => (
            <Col key={c.id}>
              <Link to={`/categorias/${c.id}`} className="tarjeta-categoria">
                <img src={c.imagen} alt="" loading="lazy" />
                <span>{c.nombre}</span>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      <Container as="section" className="py-4">
        <h2 className="text-center mb-4">Nuestros productos más comprados</h2>
        <ProductGrid productos={destacados} categorias={categorias} onAgregar={(p) => agregar(p)} />
        <div className="text-center mt-4">
          <Link to="/productos" className="btn btn-outline-mil">Ver catálogo completo</Link>
        </div>
      </Container>
    </>
  );
}

export default Inicio;
