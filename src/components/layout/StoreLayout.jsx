import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function StoreLayout() {
  return (
    <>
      <Header />
      <main className="contenido-principal">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default StoreLayout;
