import { useNavigate, useParams } from 'react-router-dom';
import CategoriaForm from '../../components/admin/CategoriaForm';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import { categoriasDB } from '../../data/db';
import { useColeccion } from '../../hooks/useColeccion';

function AdminCategoriaForm() {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const categorias = useColeccion('categorias');
  const editando = categoriaId !== undefined;
  const categoria = editando ? categorias.find((c) => c.id === Number(categoriaId)) : undefined;

  if (editando && !categoria) {
    return <EstadoVacio titulo="Categoría no encontrada" accionTexto="Volver a categorías" accionHref="/admin/categorias" />;
  }

  const guardar = (datos) => {
    if (editando) categoriasDB.actualizar(categoria.id, datos);
    else categoriasDB.crear(datos);
    navigate('/admin/categorias');
  };

  return (
    <>
      <EncabezadoAdmin titulo={editando ? `Editar: ${categoria.nombre}` : 'Nueva categoría'} />
      <CategoriaForm inicial={categoria} onSubmit={guardar} onCancelar={() => navigate('/admin/categorias')} />
    </>
  );
}

export default AdminCategoriaForm;
