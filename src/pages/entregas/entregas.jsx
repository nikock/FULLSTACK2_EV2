import { useCallback, useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Form, Nav, Row, Table } from 'react-bootstrap';
import {
  actualizarDelivery,
  actualizarRetiro,
  agregarDelivery,
  agregarRetiro,
  eliminarDelivery,
  eliminarRetiro,
  obtenerDeliveries,
  obtenerRetiros,
} from '../../api/entregaApi';
import CampoFormulario from '../../components/common/CampoFormulario';
import { comunasDe, regiones } from '../../data/regiones';
import { SUCURSALES } from '../../data/sucursales';
import { esValido, validarDelivery, validarRetiroTienda } from '../../utils/validators';

const VACIO_RETIRO = { nombreRetira: '', correo: '', sucursal: SUCURSALES[0], fecha: '', hora: '', estado: 'pendiente' };
const VACIO_DELIVERY = {
  nombreDestinatario: '',
  telefono: '',
  calle: '',
  departamento: '',
  region: regiones[0].nombre,
  comuna: '',
  indicaciones: '',
  fecha: '',
  estado: 'pendiente',
};

const TIPOS = {
  retiroTienda: {
    titulo: 'Retiro en tienda',
    clave: 'idRetiroTienda',
    vacio: VACIO_RETIRO,
    validar: validarRetiroTienda,
    estados: ['pendiente', 'listo', 'retirado', 'cancelado'],
    listar: obtenerRetiros,
    crear: agregarRetiro,
    actualizar: actualizarRetiro,
    eliminar: eliminarRetiro,
    columnas: [
      ['Retira', (e) => e.nombreRetira],
      ['Sucursal', (e) => e.sucursal],
      ['Fecha', (e) => `${e.fecha ?? ''} ${e.hora ?? ''}`],
    ],
  },
  delivery: {
    titulo: 'Delivery',
    clave: 'idDelivery',
    vacio: VACIO_DELIVERY,
    validar: validarDelivery,
    estados: ['pendiente', 'en_camino', 'entregado', 'cancelado'],
    listar: obtenerDeliveries,
    crear: agregarDelivery,
    actualizar: actualizarDelivery,
    eliminar: eliminarDelivery,
    columnas: [
      ['Destinatario', (e) => e.nombreDestinatario],
      ['Dirección', (e) => `${e.calle ?? ''}${e.departamento ? ` depto ${e.departamento}` : ''}, ${e.comuna ?? ''}`],
      ['Fecha', (e) => e.fecha],
    ],
  },
};

const COLOR_ESTADO = { pendiente: 'warning', listo: 'info', en_camino: 'info', retirado: 'success', entregado: 'success', cancelado: 'danger' };
const etiquetaEstado = (estado) => String(estado ?? '').replace('_', ' ');


export default function Entregas() {
  const [tipo, setTipo] = useState('retiroTienda');
  const config = TIPOS[tipo];

  const [lista, setLista] = useState([]);
  const [valores, setValores] = useState(config.vacio);
  const [errores, setErrores] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState(null); 

  const cargar = useCallback(() => {
    TIPOS[tipo]
      .listar()
      .then((datos) => setLista(datos ?? []))
      .catch((error) => {
        setLista([]);
        setMensaje({ variante: 'danger', texto: `No se pudo cargar la lista (${error.message}).` });
      });
  }, [tipo]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const cambiarTipo = (nuevo) => {
    setTipo(nuevo);
    setValores(TIPOS[nuevo].vacio);
    setErrores({});
    setEditandoId(null);
    setMensaje(null);
  };

  const cambiar = (campo) => (evento) => {
    const valor = evento.target.value;
    setValores((actual) => ({ ...actual, [campo]: valor, ...(campo === 'region' ? { comuna: '' } : {}) }));
    if (errores[campo]) setErrores((actual) => ({ ...actual, [campo]: undefined }));
  };

  const limpiar = () => {
    setValores(config.vacio);
    setErrores({});
    setEditandoId(null);
  };

  const guardar = async (evento) => {
    evento.preventDefault();
    const nuevosErrores = config.validar(valores);
    setErrores(nuevosErrores);
    if (!esValido(nuevosErrores)) return;

    try {
      if (editandoId === null) await config.crear(valores);
      else await config.actualizar(editandoId, valores);
      setMensaje({ variante: 'success', texto: editandoId === null ? `${config.titulo} agregado.` : `${config.titulo} actualizado.` });
      limpiar();
      cargar();
    } catch (error) {
      setMensaje({ variante: 'danger', texto: `Error en la solicitud (${error.message}).` });
    }
  };

  const editar = (entrega) => {
    setEditandoId(entrega[config.clave]);
    setValores({ ...config.vacio, ...entrega });
    setErrores({});
    setMensaje(null);
  };

  const borrar = async (id) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    try {
      await config.eliminar(id);
      if (editandoId === id) limpiar();
      setMensaje({ variante: 'success', texto: `${config.titulo} eliminado.` });
      cargar();
    } catch (error) {
      setMensaje({ variante: 'danger', texto: `Error en la solicitud (${error.message}).` });
    }
  };

  return (
    <div>
      <h1 className="h3 mb-3">Gestión de entregas</h1>

      <Nav variant="tabs" className="mb-3" activeKey={tipo} onSelect={cambiarTipo}>
        {Object.entries(TIPOS).map(([clave, t]) => (
          <Nav.Item key={clave}>
            <Nav.Link eventKey={clave}>{t.titulo}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {mensaje && <Alert variant={mensaje.variante} dismissible onClose={() => setMensaje(null)}>{mensaje.texto}</Alert>}

      <Row className="g-4">
        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Header as="h2" className="h6 mb-0">
              {editandoId === null ? `Agregar ${config.titulo.toLowerCase()}` : `Actualizar ${config.titulo.toLowerCase()} #${editandoId}`}
            </Card.Header>
            <Card.Body>
              <Form noValidate onSubmit={guardar} aria-label={`Formulario ${config.titulo}`}>
                {tipo === 'retiroTienda' ? (
                  <>
                    <CampoFormulario id="entrega-retira" label="Nombre de quien retira" value={valores.nombreRetira} onChange={cambiar('nombreRetira')} error={errores.nombreRetira} />
                    <CampoFormulario id="entrega-correo" label="Correo" type="email" value={valores.correo} onChange={cambiar('correo')} error={errores.correo} />
                    <CampoFormulario id="entrega-sucursal" label="Sucursal" as="select" value={valores.sucursal} onChange={cambiar('sucursal')} error={errores.sucursal}>
                      {SUCURSALES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </CampoFormulario>
                    <Row>
                      <Col sm={6}><CampoFormulario id="entrega-fecha" label="Fecha de retiro" type="date" value={valores.fecha} onChange={cambiar('fecha')} error={errores.fecha} /></Col>
                      <Col sm={6}><CampoFormulario id="entrega-hora" label="Hora de retiro" type="time" value={valores.hora} onChange={cambiar('hora')} error={errores.hora} /></Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <CampoFormulario id="entrega-destinatario" label="Nombre del destinatario" value={valores.nombreDestinatario} onChange={cambiar('nombreDestinatario')} error={errores.nombreDestinatario} />
                    <CampoFormulario id="entrega-telefono" label="Teléfono" type="tel" placeholder="+56 9 1234 5678" value={valores.telefono} onChange={cambiar('telefono')} error={errores.telefono} />
                    <Row>
                      <Col sm={8}><CampoFormulario id="entrega-calle" label="Calle y número" value={valores.calle} onChange={cambiar('calle')} error={errores.calle} /></Col>
                      <Col sm={4}><CampoFormulario id="entrega-depto" label="Depto (opcional)" value={valores.departamento} onChange={cambiar('departamento')} /></Col>
                    </Row>
                    <CampoFormulario id="entrega-region" label="Región" as="select" value={valores.region} onChange={cambiar('region')} error={errores.region}>
                      {regiones.map((r) => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                    </CampoFormulario>
                    <CampoFormulario id="entrega-comuna" label="Comuna" as="select" value={valores.comuna} onChange={cambiar('comuna')} error={errores.comuna}>
                      <option value="">Selecciona una comuna</option>
                      {comunasDe(valores.region).map((c) => <option key={c} value={c}>{c}</option>)}
                    </CampoFormulario>
                    <CampoFormulario id="entrega-fecha" label="Fecha de entrega" type="date" value={valores.fecha} onChange={cambiar('fecha')} error={errores.fecha} />
                    <CampoFormulario id="entrega-indicaciones" label="Indicaciones (opcional)" as="textarea" rows={2} value={valores.indicaciones} onChange={cambiar('indicaciones')} />
                  </>
                )}

                <CampoFormulario id="entrega-estado" label="Estado" as="select" value={valores.estado} onChange={cambiar('estado')}>
                  {config.estados.map((e) => <option key={e} value={e}>{etiquetaEstado(e)}</option>)}
                </CampoFormulario>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="mil" className="flex-grow-1">
                    {editandoId === null ? 'Guardar' : 'Actualizar'}
                  </Button>
                  {editandoId !== null && <Button variant="outline-secondary" onClick={limpiar}>Cancelar</Button>}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Header as="h2" className="h6 mb-0">Lista de {config.titulo.toLowerCase()}</Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover striped className="mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      {config.columnas.map(([nombre]) => <th key={nombre}>{nombre}</th>)}
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lista.length === 0 ? (
                      <tr>
                        <td colSpan={config.columnas.length + 3} className="text-center py-4 text-muted">No hay registros.</td>
                      </tr>
                    ) : (
                      lista.map((entrega) => {
                        const id = entrega[config.clave];
                        return (
                          <tr key={id}>
                            <td>{id}</td>
                            {config.columnas.map(([nombre, leer]) => <td key={nombre}>{leer(entrega)}</td>)}
                            <td><Badge bg={COLOR_ESTADO[entrega.estado] ?? 'secondary'} className="text-capitalize">{etiquetaEstado(entrega.estado)}</Badge></td>
                            <td className="text-nowrap">
                              <Button size="sm" variant="warning" onClick={() => editar(entrega)}>Editar</Button>
                              <Button size="sm" variant="danger" className="ms-2" onClick={() => borrar(id)}>Eliminar</Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
