import { Table } from 'react-bootstrap';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

function OrdenDetalle({ orden }) {
  const { cliente, direccion } = orden;
  return (
    <div className="orden-detalle">
      <dl className="row mb-3">
        <dt className="col-sm-3">Orden</dt>
        <dd className="col-sm-9">#{orden.numero} <small className="text-muted">(ORDER{String(orden.id).padStart(5, '0')})</small></dd>
        <dt className="col-sm-3">Fecha</dt>
        <dd className="col-sm-9">{formatearFecha(orden.fecha)}</dd>
        <dt className="col-sm-3">Cliente</dt>
        <dd className="col-sm-9">{cliente.nombre} {cliente.apellidos} — {cliente.correo}</dd>
        <dt className="col-sm-3">Dirección</dt>
        <dd className="col-sm-9">
          {direccion.calle}
          {direccion.departamento ? `, ${direccion.departamento}` : ''}, {direccion.comuna}, {direccion.region}
          {direccion.indicaciones && <><br /><small className="text-muted">Indicaciones: {direccion.indicaciones}</small></>}
        </dd>
      </dl>

      <div className="table-responsive">
        <Table className="align-middle tabla-mil">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orden.items.map((item) => (
              <tr key={item.productoId}>
                <td><img src={item.imagen} alt="" width="48" height="48" className="miniatura" /></td>
                <td>{item.nombre}</td>
                <td>{formatearPrecio(item.precio)}</td>
                <td>{item.cantidad}</td>
                <td>{formatearPrecio(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="total-orden text-center">
        {orden.descuento > 0 && <p className="mb-1">Descuento aplicado: -{formatearPrecio(orden.descuento)}</p>}
        <p className="h5 mb-0">{orden.estado === 'pagada' ? 'Total pagado' : 'Total a pagar'}: {formatearPrecio(orden.total)}</p>
      </div>
    </div>
  );
}

export default OrdenDetalle;
