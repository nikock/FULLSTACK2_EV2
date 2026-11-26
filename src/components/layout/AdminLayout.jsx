import { useState } from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { etiquetaRol, ROL_ADMIN, ROL_VENDEDOR } from '../../utils/roles';

const enlaces = [
  { to: '/admin', texto: 'Dashboard', end: true, roles: [ROL_ADMIN] },
  { to: '/admin/ordenes', texto: 'Órdenes', roles: [ROL_ADMIN, ROL_VENDEDOR] },
  { to: '/admin/productos', texto: 'Productos', roles: [ROL_ADMIN, ROL_VENDEDOR] },
  { to: '/admin/categorias', texto: 'Categorías', roles: [ROL_ADMIN] },
  { to: '/admin/usuarios', texto: 'Usuarios', roles: [ROL_ADMIN] },
  { to: '/admin/entregas', texto: 'Entregas', roles: [ROL_ADMIN] },
  { to: '/admin/reportes', texto: 'Reportes', roles: [ROL_ADMIN] },
  { to: '/admin/perfil', texto: 'Perfil', roles: [ROL_ADMIN] },
];

function AdminLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-shell">
      <header className="admin-topbar d-flex align-items-center justify-content-between px-3 py-2">
        <Link to={usuario?.rol === ROL_ADMIN ? '/admin' : '/admin/ordenes'} className="logo text-white">
          Mil Sabores · {usuario?.rol === ROL_ADMIN ? 'Admin' : 'Ventas'}
        </Link>
        <span className="d-none d-md-inline small">{usuario?.nombre} {usuario?.apellidos} · {etiquetaRol(usuario?.rol)}</span>
        <Button variant="outline-light" size="sm" className="d-md-none" aria-expanded={menuAbierto} aria-controls="menu-admin" onClick={() => setMenuAbierto((abierto) => !abierto)}>
          Menú
        </Button>
      </header>
      <Container fluid>
        <Row>
          <Col md={3} lg={2} id="menu-admin" className={`admin-sidebar py-3 ${menuAbierto ? '' : 'd-none'} d-md-block`}>
            <Nav className="flex-column gap-1" onClick={() => setMenuAbierto(false)}>
              {enlaces.filter((enlace) => enlace.roles.includes(usuario?.rol)).map((enlace) => (
                <Nav.Link key={enlace.to} as={NavLink} to={enlace.to} end={enlace.end}>
                  {enlace.texto}
                </Nav.Link>
              ))}
            </Nav>
            <hr />
            <Link to="/" className="btn btn-dark w-100 mb-2">Ver tienda</Link>
            <Button variant="danger" className="w-100" onClick={cerrarSesion}>Cerrar sesión</Button>
          </Col>
          <Col md={9} lg={10} as="section" className="py-4 px-md-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminLayout;
