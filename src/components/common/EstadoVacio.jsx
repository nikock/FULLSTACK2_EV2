import { Link } from 'react-router-dom';

function EstadoVacio({ titulo, texto, accionTexto, accionHref }) {
  return (
    <div className="estado-vacio text-center py-5">
      <h2 className="h4">{titulo}</h2>
      {texto && <p>{texto}</p>}
      {accionHref && (
        <Link to={accionHref} className="btn btn-mil">
          {accionTexto}
        </Link>
      )}
    </div>
  );
}

export default EstadoVacio;