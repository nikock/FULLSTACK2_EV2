import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatearPrecio } from '../../utils/formato';
import IconoCarrito from '../common/IconoCarrito';

function MiniCarrito({ detalle, total, cantidadTotal, onQuitar, onVaciar }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="mil" id="mini-carrito" className="d-flex align-items-center gap-2">
        <IconoCarrito />
        <span>Carrito {formatearPrecio(total)}</span>
        {cantidadTotal > 0 && (
          <span className="badge text-bg-light" data-testid="contador-carrito">
            {cantidadTotal}
          </span>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu className="mini-carrito-menu p-3">
        {detalle.length === 0 ? (
          <p className="mb-0">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="list-unstyled mb-3">
              {detalle.map(({ producto, cantidad, subtotal }) => (
                <li key={producto.id} className="d-flex align-items-center gap-2 mb-2">
                  <img src={producto.imagen} alt="" width="40" height="40" className="miniatura" />
                  <span className="flex-grow-1 small">
                    {producto.nombre} <strong>x{cantidad}</strong>
                    <br />
                    {formatearPrecio(subtotal)}
                  </span>
                  <Button size="sm" variant="outline-danger" aria-label={`Quitar ${producto.nombre}`} onClick={() => onQuitar(producto.id)}>
                    ×
                  </Button>
                </li>
              ))}
            </ul>
            <Button variant="outline-secondary" size="sm" className="w-100 mb-2" onClick={onVaciar}>
              Vaciar carrito
            </Button>
          </>
        )}
        <Link to="/carrito" className="btn btn-mil btn-sm w-100">
          Ver carrito completo
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MiniCarrito;
