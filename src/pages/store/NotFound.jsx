import EstadoVacio from '../../components/common/EstadoVacio';

function NotFound() {
  return <EstadoVacio titulo="Página no encontrada" texto="La dirección que buscas no existe o fue movida." accionTexto="Volver al inicio" accionHref="/" />;
}

export default NotFound;
