import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { blogsSeed } from '../../data/seeds';
import { formatearFecha } from '../../utils/formato';

function BlogDetalle() {
  const { blogId } = useParams();
  const entrada = blogsSeed.find((b) => b.id === Number(blogId));

  if (!entrada) {
    return (
      <Container className="py-5 text-center">
        <h1>Entrada no encontrada</h1>
        <Link to="/blog" className="btn btn-mil">Volver al blog</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4 pagina-texto">
      <Link to="/blog">← Volver al blog</Link>
      <h1 className="mt-2">{entrada.titulo}</h1>
      <p className="text-muted">{formatearFecha(entrada.fecha)}</p>
      <img src={entrada.imagen} alt="" className="img-fluid rounded mb-3 blog-imagen-detalle" />
      {entrada.contenido.map((parrafo) => <p key={parrafo}>{parrafo}</p>)}
    </Container>
  );
}

export default BlogDetalle;