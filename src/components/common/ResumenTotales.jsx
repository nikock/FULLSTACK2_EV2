import { formatearPrecio } from '../../utils/formato';

function ResumenTotales({ totales, descuentoPorcentaje = 0 }) {
  return (
    <dl className="resumen-totales">
      <div>
        <dt>Subtotal</dt>
        <dd>{formatearPrecio(totales.subtotal)}</dd>
      </div>
      {descuentoPorcentaje > 0 && (
        <div>
          <dt>Descuento de cliente ({descuentoPorcentaje}%)</dt>
          <dd>-{formatearPrecio(totales.descuento)}</dd>
        </div>
      )}
      <div className="resumen-total">
        <dt>Total</dt>
        <dd>{formatearPrecio(totales.total)}</dd>
      </div>
    </dl>
  );
}

export default ResumenTotales;
