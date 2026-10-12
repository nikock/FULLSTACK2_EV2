import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import EstadoVacio from '../common/EstadoVacio';
import ProductCard from './ProductCard';

function ProductGrid({ productos, categorias = [], onAgregar, porPagina = 8, textoVacio = 'No encontramos productos con esos criterios.' }) {
  const [visibles, setVisibles] = useState(porPagina);

  if (productos.length === 0) {
    return <EstadoVacio titulo="Sin resultados" texto={textoVacio} />;
  }

  const nombreCategoria = (id) => categorias.find((c) => c.id === id)?.nombre;

  return (
    <>
      <Row xs={1} sm={2} lg={4} className="g-4">
        {productos.slice(0, visibles).map((producto) => (
          <Col key={producto.id}>
            <ProductCard producto={producto} categoriaNombre={nombreCategoria(producto.categoriaId)} onAgregar={onAgregar} />
          </Col>
        ))}
      </Row>
      {visibles < productos.length && (
        <div className="text-center mt-4">
          <Button variant="outline-mil" onClick={() => setVisibles((v) => v + porPagina)}>
            Cargar más
          </Button>
        </div>
      )}
    </>
  );
}

export default ProductGrid;
