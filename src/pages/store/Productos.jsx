import { Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import FiltrosProductos from '../../components/store/FiltrosProductos';
import ProductGrid from '../../components/store/ProductGrid';
import { useCart } from '../../context/CartContext';
import { useColeccion } from '../../hooks/useColeccion';
import { filtrarProductos } from '../../utils/filtros';

function Productos() {
  const productos = useColeccion('productos');
  const categorias = useColeccion('categorias');
  const { agregar } = useCart();
  const [params, setParams] = useSearchParams();

  const filtros = {
    q: params.get('q') ?? '',
    categoriaId: params.get('categoria') ?? '',
    orden: params.get('orden') ?? 'relevancia',
    soloOfertas: params.get('ofertas') === '1',
  };

  const cambiarFiltros = (cambios) => {
    const nuevos = { ...filtros, ...cambios };
    const siguiente = new URLSearchParams();
    if (nuevos.q) siguiente.set('q', nuevos.q);
    if (nuevos.categoriaId !== '') siguiente.set('categoria', nuevos.categoriaId);
    if (nuevos.orden !== 'relevancia') siguiente.set('orden', nuevos.orden);
    if (nuevos.soloOfertas) siguiente.set('ofertas', '1');
    setParams(siguiente, { replace: true });
  };

  const resultado = filtrarProductos(productos, filtros);

  return (
    <Container className="py-4">
      <h1>Productos</h1>
      <FiltrosProductos filtros={filtros} categorias={categorias} onChange={cambiarFiltros} />
      <p className="text-muted" aria-live="polite">{resultado.length} producto(s)</p>
      <ProductGrid key={JSON.stringify(filtros)} productos={resultado} categorias={categorias} onAgregar={(p) => agregar(p)} />
    </Container>
  );
}

export default Productos;
