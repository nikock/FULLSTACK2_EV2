import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CategoriaForm from '../../components/admin/CategoriaForm';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import { categoriasRepo } from '../../data/store';
import { useEstadoColeccion } from '../../hooks/useColeccion';

function AdminCategoriaForm() {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const { datos: categorias, cargado } = useEstadoColeccion('categorias');
  const [error, setError] = useState('');
  const editando = categoriaId !== undefined;
  const categoria = editando ? categorias.find((c) => c.id === Number(categoriaId)) : undefined;

  if (editando && !cargado) return <p role="status">Cargando categoría…</p>;
  if (editando && !categoria) {
    return <EstadoVacio titulo="Categoría no encontrada" accionTexto="Volver a categorías" accionHref="/admin/categorias" />;
  }

  const guardar = async (datos) => {
    try {
      if (editando) await categoriasRepo.actualizar(categoria.id, datos);
      else await categoriasRepo.crear(datos);
      navigate('/admin/categorias');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <EncabezadoAdmin titulo={editando ? `Editar: ${categoria.nombre}` : 'Nueva categoría'} />
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
      <CategoriaForm inicial={categoria} onSubmit={guardar} onCancelar={() => navigate('/admin/categorias')} />
    </>
  );
}

export default AdminCategoriaForm;
