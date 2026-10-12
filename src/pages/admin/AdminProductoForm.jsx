import { useNavigate, useParams } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import ProductoForm from '../../components/admin/ProductoForm';
import EstadoVacio from '../../components/common/EstadoVacio';
import { productosDB } from '../../data/db';
import { useColeccion } from '../../hooks/useColeccion';

function AdminProductoForm() {
  const { productoId } = useParams();
  const navigate = useNavigate();
  const categorias = useColeccion('categorias');
  const productos = useColeccion('productos');
  const editando = productoId !== undefined;
  const producto = editando ? productos.find((p) => p.id === Number(productoId)) : undefined;

  if (editando && !producto) {
    return <EstadoVacio titulo="Producto no encontrado" accionTexto="Volver a productos" accionHref="/admin/productos" />;
  }

  const guardar = (datos) => {
    if (editando) productosDB.actualizar(producto.id, datos);
    else productosDB.crear(datos);
    navigate('/admin/productos');
  };

  return (
    <>
      <EncabezadoAdmin titulo={editando ? `Editar: ${producto.nombre}` : 'Nuevo producto'} />
      <ProductoForm inicial={producto} categorias={categorias} onSubmit={guardar} onCancelar={() => navigate('/admin/productos')} textoBoton={editando ? 'Guardar cambios' : 'Crear producto'} />
    </>
  );
}

export default AdminProductoForm;
