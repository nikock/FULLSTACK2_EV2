import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer mt-5">
      <Container className="py-4">
        <Row className="g-4">
          <Col xs={12} md={6} lg={3}>
            <h3 className="h5">Pastelería Mil Sabores</h3>
            <p className="mb-1">Av. Dulzura 1974, Santiago, Chile.</p>
            <p className="mb-0">Lunes a sábado, 9:00 - 20:00 hrs.</p>
          </Col>
          <Col xs={6} md={3} lg={3}>
            <h4 className="h6">Navegación</h4>
            <ul className="list-unstyled mb-0">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/ofertas">Ofertas</Link></li>
              <li><Link to="/registro">Crear cuenta</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </Col>
          <Col xs={6} md={3} lg={3}>
            <h4 className="h6">Contacto</h4>
            <ul className="list-unstyled mb-0">
              <li>Teléfono: +56 9 1234 5678</li>
              <li>Correo: contacto@milsabores.cl</li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h4 className="h6">Síguenos</h4>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-3">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </Col>
        </Row>
      </Container>
      <p className="footer-copy text-center mb-0 py-2">© 2026 Pastelería Mil Sabores. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
