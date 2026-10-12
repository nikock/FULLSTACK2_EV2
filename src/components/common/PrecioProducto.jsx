import { formatearPrecio, precioFinal } from '../../utils/formato';

function PrecioProducto({ producto }) {
  const enOferta = producto.oferta > 0;
  return (
    <p className="precio mb-2">
      {enOferta && <span className="precio-original me-2">{formatearPrecio(producto.precio)}</span>}
      <span className="precio-final">{formatearPrecio(precioFinal(producto))}</span>
    </p>
  );
}

export default PrecioProducto;
