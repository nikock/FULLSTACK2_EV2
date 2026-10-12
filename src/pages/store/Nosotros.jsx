import { Container } from 'react-bootstrap';

function Nosotros() {
  return (
    <Container className="py-4 pagina-texto">
      <h1>Sobre nosotros</h1>
      <p>
        Pastelería Mil Sabores celebra su 50 aniversario como un referente en la repostería chilena. Famosa por su participación en
        un récord Guinness en 1995, cuando colaboró en la creación de la torta más grande del mundo, la pastelería busca renovar su
        sistema de ventas online para ofrecer una experiencia de compra moderna y accesible para sus clientes.
      </p>

      <h2>Misión</h2>
      <p>
        Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos de repostería de alta calidad
        para todas las ocasiones, mientras celebramos nuestras raíces históricas y fomentamos la creatividad en la repostería.
      </p>

      <h2>Visión</h2>
      <p>
        Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra innovación, calidad y el impacto
        positivo en la comunidad, especialmente en la formación de nuevos talentos en gastronomía.
      </p>

      <h2>Nuestro obrador</h2>
      <p>Un vistazo a cómo trabajamos en la pastelería.</p>
      <div className="ratio ratio-16x9 video-obrador">
        <video controls>
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </div>
    </Container>
  );
}

export default Nosotros;
