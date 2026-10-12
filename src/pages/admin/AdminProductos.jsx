import { useState } from 'react';
import { Badge, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConfirmarModal from '../../components/admin/ConfirmarModal';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import { productosDB } from '../../data/db';
import { useColeccion } from '../../hooks/useColeccion';
import { formatearPrecio } from '../../utils/formato';
import { filtrarProductos } from '../../utils/filtros';
import { esCritico } from '../../utils/reportes';

function AdminProductos() {
  const productos = useColeccion('productos');
  const categorias = useColeccion('categorias');
  const [busqueda, setBusqueda] = useState('');
  const [porEliminar, setPorEliminar] = useState(null);

  const visibles = filtrarProductos(productos, { q: busqueda });
  const nombreCategoria = (id) => categorias.find((c) => c.id === id)?.nombre ?? '—';

  const eliminar = () => {
    productosDB.eliminar(porEliminar.id);
    setPorEliminar(null);
  };

  return (
    <>
      <EncabezadoAdmin titulo="Productos" subtitulo={`${productos.length} producto(s) en el catálogo`}>
        <Link to="/admin/productos/criticos" className="btn btn-outline-danger">Stock crítico</Link>
        <Link to="/admin/productos/reportes" className="btn btn-outline-mil">Reportes</Link>
        <Link to="/admin/productos/nuevo" className="btn btn-mil">Nuevo producto</Link>
      </EncabezadoAdmin>

      <Form.Control type="search" className="mb-3" placeholder="Buscar producto por nombre o descripción" aria-label="Buscar producto" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

      {visibles.length === 0 ? (
        <EstadoVacio titulo="Sin resultados" texto="Prueba con otra búsqueda o crea un producto nuevo." />
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle tabla-mil">
            <thead>
              <tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Oferta</th><th>Stock</th><th aria-label="Acciones" /></tr>
            </thead>
            <tbody>
              {visibles.map((p) => (
                <tr key={p.id}>
                  <td><img src={p.imagen} alt="" width="48" height="48" className="miniatura" /></td>
                  <td>{p.nombre}</td>
                  <td>{nombreCategoria(p.categoriaId)}</td>
                  <td>{formatearPrecio(p.precio)}</td>
                  <td>{p.oferta > 0 ? `${p.oferta}%` : '—'}</td>
                  <td>{p.stock} {esCritico(p) && <Badge bg="danger">Crítico</Badge>}</td>
                  <td className="text-nowrap">
                    <Link to={`/admin/productos/${p.id}/editar`} className="btn btn-sm btn-outline-mil me-2">Editar</Link>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setPorEliminar(p)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <ConfirmarModal mostrar={Boolean(porEliminar)} titulo="Eliminar producto" mensaje={`¿Seguro que quieres eliminar "${porEliminar?.nombre}"? Esta acción no se puede deshacer.`} onConfirmar={eliminar} onCancelar={() => setPorEliminar(null)} />
    </>
  );
}

export default AdminProductos;
