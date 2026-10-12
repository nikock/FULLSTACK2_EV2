import { Link, useParams } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import OrdenDetalle from '../../components/store/OrdenDetalle';
import { useColeccion } from '../../hooks/useColeccion';

function AdminBoleta() {
  const { ordenId } = useParams();
  const orden = useColeccion('ordenes').find((o) => o.id === Number(ordenId));

  if (!orden) return <EstadoVacio titulo="Orden no encontrada" accionTexto="Volver a órdenes" accionHref="/admin/ordenes" />;

  return (
    <>
      <EncabezadoAdmin titulo={`Boleta #${orden.numero}`} subtitulo={orden.estado === 'pagada' ? 'Pago exitoso' : 'Pago fallido'}>
        <Link to="/admin/ordenes" className="btn btn-outline-secondary">Volver</Link>
        <button type="button" className="btn btn-mil" onClick={() => window.print()}>Imprimir</button>
      </EncabezadoAdmin>
      <div className="tarjeta-formulario"><OrdenDetalle orden={orden} /></div>
    </>
  );
}

export default AdminBoleta;
