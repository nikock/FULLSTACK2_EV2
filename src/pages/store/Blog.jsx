import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { blogsSeed } from '../../data/seeds';
import { formatearFecha } from '../../utils/formato';

function Blog() {
  return (
    <Container className="py-4">
      <h1>Blog</h1>
      <Row xs={1} md={2} className="g-4">
        {blogsSeed.map((entrada) => (
          <Col key={entrada.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={entrada.imagen} alt="" className="blog-imagen" />
              <Card.Body>
                <small className="text-muted">{formatearFecha(entrada.fecha)}</small>
                <Card.Title as="h2" className="h5">{entrada.titulo}</Card.Title>
                <Card.Text>{entrada.resumen}</Card.Text>
                <Link to={`/blog/${entrada.id}`} className="btn btn-outline-mil">Leer más</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Blog;
