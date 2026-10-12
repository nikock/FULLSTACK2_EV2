import { Button, Table } from 'react-bootstrap';
import { formatearPrecio } from '../../utils/formato';

function CarritoTabla({ detalle, onCambiarCantidad, onQuitar, editable = true }) {
  return (
    <div className="table-responsive">
      <Table className="align-middle tabla-mil">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            {editable && <th aria-label="Acciones" />}
          </tr>
        </thead>
        <tbody>
          {detalle.map(({ producto, cantidad, precioUnitario, subtotal }) => (
            <tr key={producto.id}>
              <td>
                <img src={producto.imagen} alt="" width="56" height="56" className="miniatura" />
              </td>
              <td>{producto.nombre}</td>
              <td>{formatearPrecio(precioUnitario)}</td>
              <td>
                {editable ? (
                  <div className="selector-cantidad">
                    <Button size="sm" variant="outline-mil" aria-label={`Quitar una unidad de ${producto.nombre}`} onClick={() => onCambiarCantidad(producto.id, cantidad - 1)}>
                      −
                    </Button>
                    <span className="cantidad" data-testid={`cantidad-${producto.id}`}>
                      {cantidad}
                    </span>
                    <Button size="sm" variant="outline-mil" aria-label={`Agregar una unidad de ${producto.nombre}`} disabled={cantidad >= producto.stock} onClick={() => onCambiarCantidad(producto.id, cantidad + 1)}>
                      +
                    </Button>
                  </div>
                ) : (
                  cantidad
                )}
              </td>
              <td>{formatearPrecio(subtotal)}</td>
              {editable && (
                <td>
                  <Button size="sm" variant="outline-danger" onClick={() => onQuitar(producto.id)}>
                    Eliminar
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CarritoTabla;
