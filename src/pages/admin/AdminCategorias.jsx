import { useState } from 'react';
import { Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConfirmarModal from '../../components/admin/ConfirmarModal';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import { categoriasDB } from '../../data/db';
import { useColeccion } from '../../hooks/useColeccion';

function AdminCategorias() {
  const categorias = useColeccion('categorias');
  const productos = useColeccion('productos');
  const [porEliminar, setPorEliminar] = useState(null);
  const [aviso, setAviso] = useState('');

  const cantidad = (id) => productos.filter((p) => p.categoriaId === id).length;

  const pedirEliminar = (categoria) => {
    if (cantidad(categoria.id) > 0) {
      setAviso(`No puedes eliminar "${categoria.nombre}" porque tiene productos asociados. Muévelos a otra categoría primero.`);
      return;
    }
    setAviso('');
    setPorEliminar(categoria);
  };

  const eliminar = () => {
    categoriasDB.eliminar(porEliminar.id);
    setPorEliminar(null);
  };

  return (
    <>
      <EncabezadoAdmin titulo="Categorías" subtitulo={`${categorias.length} categoría(s)`}>
        <Link to="/admin/categorias/nueva" className="btn btn-mil">Nueva categoría</Link>
      </EncabezadoAdmin>
      {aviso && <Alert variant="warning" dismissible onClose={() => setAviso('')}>{aviso}</Alert>}
      <div className="table-responsive">
        <Table hover className="align-middle tabla-mil">
          <thead><tr><th>Imagen</th><th>Nombre</th><th>Descripción</th><th>Productos</th><th aria-label="Acciones" /></tr></thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id}>
                <td><img src={c.imagen} alt="" width="48" height="48" className="miniatura" /></td>
                <td>{c.nombre}</td>
                <td>{c.descripcion}</td>
                <td>{cantidad(c.id)}</td>
                <td className="text-nowrap">
                  <Link to={`/admin/categorias/${c.id}/editar`} className="btn btn-sm btn-outline-mil me-2">Editar</Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => pedirEliminar(c)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ConfirmarModal mostrar={Boolean(porEliminar)} titulo="Eliminar categoría" mensaje={`¿Eliminar la categoría "${porEliminar?.nombre}"?`} onConfirmar={eliminar} onCancelar={() => setPorEliminar(null)} />
    </>
  );
}

export default AdminCategorias;
