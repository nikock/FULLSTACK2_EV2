import { Col, Form, Row } from 'react-bootstrap';

function FiltrosProductos({ filtros, categorias, onChange }) {
  return (
    <Form className="filtros-productos mb-4" role="search" onSubmit={(e) => e.preventDefault()}>
      <Row className="g-3 align-items-end">
        <Col xs={12} md={4}>
          <Form.Group controlId="filtro-q">
            <Form.Label>Buscar</Form.Label>
            <Form.Control type="search" placeholder="Ej: chocolate" value={filtros.q} onChange={(e) => onChange({ q: e.target.value })} />
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group controlId="filtro-categoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Select value={filtros.categoriaId} onChange={(e) => onChange({ categoriaId: e.target.value })}>
              <option value="">Todas</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={6} md={3}>
          <Form.Group controlId="filtro-orden">
            <Form.Label>Ordenar por</Form.Label>
            <Form.Select value={filtros.orden} onChange={(e) => onChange({ orden: e.target.value })}>
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre (A-Z)</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={2}>
          <Form.Check id="filtro-ofertas" type="switch" label="Solo ofertas" checked={filtros.soloOfertas} onChange={(e) => onChange({ soloOfertas: e.target.checked })} />
        </Col>
      </Row>
    </Form>
  );
}

export default FiltrosProductos;
