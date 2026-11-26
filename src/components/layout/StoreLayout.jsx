import { Alert } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useEstadoColeccion } from '../../hooks/useColeccion';
import Footer from './Footer';
import Header from './Header';

function StoreLayout() {
  const { error } = useEstadoColeccion('productos');
  return (
    <>
      <Header />
      <main className="contenido-principal">
        {error && (
          <Alert variant="warning" className="m-3" role="alert">
            No pudimos cargar el catálogo: {error}
          </Alert>
        )}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default StoreLayout;
