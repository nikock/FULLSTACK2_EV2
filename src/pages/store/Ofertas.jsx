import { Container } from 'react-bootstrap';
import ProductGrid from '../../components/store/ProductGrid';
import { useCart } from '../../context/CartContext';
import { useColeccion } from '../../hooks/useColeccion';

function Ofertas() {
  const productos = useColeccion('productos');
  const categorias = useColeccion('categorias');
  const { agregar } = useCart();
  const enOferta = productos.filter((p) => p.oferta > 0).sort((a, b) => b.oferta - a.oferta);

  return (
    <Container className="py-4">
      <h1>Ofertas</h1>
      <p className="text-muted">Aprovecha los descuentos de la semana.</p>
      <ProductGrid productos={enOferta} categorias={categorias} onAgregar={(p) => agregar(p)} textoVacio="Hoy no hay ofertas activas. ¡Vuelve pronto!" />
    </Container>
  );
}

export default Ofertas;
