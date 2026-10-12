import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import EstadoVacio from '../../components/common/EstadoVacio';
import ProductGrid from '../../components/store/ProductGrid';
import { useCart } from '../../context/CartContext';
import { useColeccion } from '../../hooks/useColeccion';

function Categorias() {
  const { categoriaId } = useParams();
  const categorias = useColeccion('categorias');
  const productos = useColeccion('productos');
  const { agregar } = useCart();

  const mostradas = categoriaId ? categorias.filter((c) => c.id === Number(categoriaId)) : categorias;

  return (
    <Container className="py-4">
      <h1>Categorías</h1>
      <Row xs={2} md={4} className="g-2 mb-4">
        {categorias.map((c) => (
          <Col key={c.id}>
            <Link to={`/categorias/${c.id}`} className={`tarjeta-categoria ${Number(categoriaId) === c.id ? 'activa' : ''}`}>
              <img src={c.imagen} alt="" loading="lazy" />
              <span>{c.nombre}</span>
            </Link>
          </Col>
        ))}
      </Row>

      {mostradas.length === 0 && <EstadoVacio titulo="Categoría no encontrada" accionTexto="Ver todas las categorías" accionHref="/categorias" />}

      {mostradas.map((categoria) => (
        <section key={categoria.id} className="mb-5" aria-labelledby={`cat-${categoria.id}`}>
          <h2 id={`cat-${categoria.id}`}>{categoria.nombre}</h2>
          <p className="text-muted">{categoria.descripcion}</p>
          <ProductGrid
            productos={productos.filter((p) => p.categoriaId === categoria.id)}
            onAgregar={(p) => agregar(p)}
            textoVacio="Aún no hay productos en esta categoría."
          />
        </section>
      ))}
    </Container>
  );
}

export default Categorias;