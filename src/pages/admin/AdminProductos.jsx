import { useState } from 'react';
import { Alert, Badge, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConfirmarModal from '../../components/admin/ConfirmarModal';
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin';
import EstadoVacio from '../../components/common/EstadoVacio';
import SoloRol from '../../components/common/SoloRol';
import { productosRepo } from '../../data/store';
import { useEstadoColeccion } from '../../hooks/useColeccion';
import { ROL_ADMIN } from '../../utils/roles';
import { formatearPrecio } from '../../utils/formato';
import { filtrarProductos } from '../../utils/filtros';
import { esCritico } from '../../utils/reportes';

function AdminProductos() {
  const { datos: productos, cargado, error: errorCarga } = useEstadoColeccion('productos');
  const { datos: categorias } = useEstadoColeccion('categorias');
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [porEliminar, setPorEliminar] = useState(null);

  const visibles = filtrarProductos(productos, { q: busqueda });
  const nombreCategoria = (id) => categorias.find((c) => c.id === id)?.nombre ?? '—';

  const eliminar = async () => {
    try {
      await productosRepo.eliminar(porEliminar.id);
      setError('');
    } catch (e) {
      setError(e.message);
    }
    setPorEliminar(null);
  };

  return (
    <>
      <EncabezadoAdmin titulo="Productos" subtitulo={`${productos.length} producto(s) en el catálogo`}>
        <SoloRol roles={[ROL_ADMIN]}>
          <Link to="/admin/productos/criticos" className="btn btn-outline-danger">Stock crítico</Link>
          <Link to="/admin/productos/reportes" className="btn btn-outline-mil">Reportes</Link>
          <Link to="/admin/productos/nuevo" className="btn btn-mil">Nuevo producto</Link>
        </SoloRol>
      </EncabezadoAdmin>
      {(error || errorCarga) && <Alert variant="danger" role="alert">{error || errorCarga}</Alert>}
      {!cargado && !errorCarga && <p role="status">Cargando productos…</p>}

      <Form.Control type="search" className="mb-3" placeholder="Buscar producto por nombre o descripción" aria-label="Buscar producto" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

      {cargado && visibles.length === 0 ? (
        <EstadoVacio titulo="Sin resultados" texto="Prueba con otra búsqueda o crea un producto nuevo." />
      ) : cargado && (
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
                    <Link to={`/admin/productos/${p.id}`} className="btn btn-sm btn-outline-secondary me-2">Ver detalle</Link>
                    <SoloRol roles={[ROL_ADMIN]}>
                      <Link to={`/admin/productos/${p.id}/editar`} className="btn btn-sm btn-outline-mil me-2">Editar</Link>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setPorEliminar(p)}>Eliminar</button>
                    </SoloRol>
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
