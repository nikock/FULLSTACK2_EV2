import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import StatCard from '../../components/admin/StatCard';
import { useColeccion } from '../../hooks/useColeccion';
import { formatearPrecio } from '../../utils/formato';
import { resumenGeneral } from '../../utils/reportes';

const accesos = [
  { to: '/admin/ordenes', titulo: 'Órdenes', texto: 'Gestión y seguimiento de las órdenes de compra realizadas.' },
  { to: '/admin/productos', titulo: 'Productos', texto: 'Administrar inventario y detalles de los productos.' },
  { to: '/admin/categorias', titulo: 'Categorías', texto: 'Organizar productos en categorías para facilitar su navegación.' },
  { to: '/admin/usuarios', titulo: 'Usuarios', texto: 'Gestión de cuentas de usuario y sus roles.' },
  { to: '/admin/reportes', titulo: 'Reportes', texto: 'Informes de ventas por producto y por categoría.' },
  { to: '/admin/perfil', titulo: 'Perfil', texto: 'Administración de tu información personal.' },
];

function AdminDashboard() {
  const productos = useColeccion('productos');
  const usuarios = useColeccion('usuarios');
  const ordenes = useColeccion('ordenes');
  const resumen = resumenGeneral({ productos, usuarios, ordenes });

  return (
    <>
      <EncabezadoAdmin titulo="Dashboard" subtitulo="Resumen de las actividades diarias" />
      <Row xs={1} md={2} xl={4} className="g-3 mb-4">
        <Col><StatCard titulo="Compras" valor={resumen.compras} detalle={`Ingresos: ${formatearPrecio(resumen.ingresos)}`} variante="azul" /></Col>
        <Col><StatCard titulo="Productos" valor={resumen.productos} detalle={`Inventario actual: ${resumen.inventario}`} variante="verde" /></Col>
        <Col><StatCard titulo="Usuarios" valor={resumen.usuarios} detalle="Cuentas registradas" variante="amarillo" /></Col>
        <Col><StatCard titulo="Stock crítico" valor={resumen.criticos} detalle="Productos por reponer" variante="rosa" /></Col>
      </Row>
      <Row xs={1} sm={2} lg={3} className="g-3">
        {accesos.map((a) => (
          <Col key={a.to}>
            <Link to={a.to} className="acceso-admin">
              <h2 className="h5">{a.titulo}</h2>
              <p className="mb-0">{a.texto}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default AdminDashboard;
