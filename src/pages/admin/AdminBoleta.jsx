import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { buscarEntregaDeOrden } from '../../api/entregaApi';
import { aDatosDeEntrega, conDatosDeEntrega } from '../../api/mapeadores';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import OrdenDetalle from '../../components/store/OrdenDetalle';
import { useOrden } from '../../hooks/useOrden';

function AdminBoleta() {
  const { ordenId } = useParams();
  const [{ orden: base, cargando }] = useOrden(ordenId);
  const [datosEntrega, setDatosEntrega] = useState({});

  useEffect(() => {
    if (!base?.numero) return undefined;
    let cancelado = false;
    buscarEntregaDeOrden(base.numero)
      .then((entrega) => !cancelado && setDatosEntrega(aDatosDeEntrega(entrega)))
      .catch(() => {});
    return () => {
      cancelado = true;
    };
  }, [base?.numero]);

  if (cargando) return <p role="status">Cargando orden…</p>;
  if (!base) return <EstadoVacio titulo="Orden no encontrada" accionTexto="Volver a órdenes" accionHref="/admin/ordenes" />;

  const orden = conDatosDeEntrega(base, datosEntrega);

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
