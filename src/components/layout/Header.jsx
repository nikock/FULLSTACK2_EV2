import { useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useColeccion } from '../../hooks/useColeccion';
import MiniCarrito from '../store/MiniCarrito';

function Header() {
  const [termino, setTermino] = useState('');
  const navigate = useNavigate();
  const categorias = useColeccion('categorias');
  const { usuario, logout } = useAuth();
  const { detalle, totales, quitar, vaciar } = useCart();

  const buscar = (evento) => {
    evento.preventDefault();
    const q = termino.trim();
    navigate(q ? `/productos?q=${encodeURIComponent(q)}` : '/productos');
  };

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="navbar-mil" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo">
          Pastelería Mil Sabores
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir menú" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <NavDropdown title="Categorías" id="menu-categorias">
              <NavDropdown.Item as={Link} to="/categorias">Ver todas</NavDropdown.Item>
              <NavDropdown.Divider />
              {categorias.map((c) => (
                <NavDropdown.Item key={c.id} as={Link} to={`/categorias/${c.id}`}>
                  {c.nombre}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>

          <Form className="d-flex me-lg-3 my-2 my-lg-0" role="search" onSubmit={buscar}>
            <Form.Control type="search" placeholder="Buscar productos" aria-label="Buscar productos" value={termino} onChange={(e) => setTermino(e.target.value)} className="me-2" />
            <Button type="submit" variant="outline-mil">Buscar</Button>
          </Form>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <MiniCarrito detalle={detalle} total={totales.total} cantidadTotal={totales.cantidadTotal} onQuitar={quitar} onVaciar={vaciar} />
            {usuario ? (
              <NavDropdown align="end" title={`Hola, ${usuario.nombre}`} id="menu-cuenta">
                {usuario.rol === 'admin' && (
                  <NavDropdown.Item as={Link} to="/admin">Panel de administración</NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={cerrarSesion}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-mil">Iniciar sesión</Link>
                <Link to="/registro" className="btn btn-mil">Crear cuenta</Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;