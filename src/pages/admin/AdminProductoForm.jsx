import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import ProductoForm from '../../components/admin/ProductoForm';
import EstadoVacio from '../../components/common/EstadoVacio';
import { productosRepo } from '../../data/store';
import { useColeccion, useEstadoColeccion } from '../../hooks/useColeccion';

function AdminProductoForm() {
  const { productoId } = useParams();
  const navigate = useNavigate();
  const categorias = useColeccion('categorias');
  const { datos: productos, cargado } = useEstadoColeccion('productos');
  const [error, setError] = useState('');
  const editando = productoId !== undefined;
  const producto = editando ? productos.find((p) => p.id === Number(productoId)) : undefined;

  if (editando && !cargado) return <p role="status">Cargando producto…</p>;
  if (editando && !producto) {
    return <EstadoVacio titulo="Producto no encontrado" accionTexto="Volver a productos" accionHref="/admin/productos" />;
  }

  const guardar = async (datos) => {
    try {
      if (editando) await productosRepo.actualizar(producto.id, datos);
      else await productosRepo.crear(datos);
      navigate('/admin/productos');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <EncabezadoAdmin titulo={editando ? `Editar: ${producto.nombre}` : 'Nuevo producto'} />
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
      <ProductoForm inicial={producto} categorias={categorias} onSubmit={guardar} onCancelar={() => navigate('/admin/productos')} textoBoton={editando ? 'Guardar cambios' : 'Crear producto'} />
    </>
  );
}

export default AdminProductoForm;
