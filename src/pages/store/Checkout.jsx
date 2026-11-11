import { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CampoFormulario from '../../components/common/CampoFormulario';
import EstadoVacio from '../../components/common/EstadoVacio';
import ResumenTotales from '../../components/common/ResumenTotales';
import CarritoTabla from '../../components/store/CarritoTabla';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { comunasDe, regiones } from '../../data/regiones';
import { SUCURSALES, TIPO_DELIVERY, TIPO_RETIRO } from '../../data/sucursales';
import { calcularTotales } from '../../utils/cart';
import { confirmarCompra } from '../../utils/compra';
import { sincronizarEntrega } from '../../utils/entrega';
import { formatearPrecio } from '../../utils/formato';
import { esValido, validarCheckout } from '../../utils/validators';

function Checkout() {
  const { detalle, vaciar } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [valores, setValores] = useState({
    nombre: usuario?.nombre ?? '',
    apellidos: usuario?.apellidos ?? '',
    correo: usuario?.correo ?? '',
    tipoEntrega: TIPO_DELIVERY,
    telefono: '',
    sucursal: SUCURSALES[0],
    fecha: '',
    hora: '',
    calle: '',
    departamento: '',
    region: regiones[0].nombre,
    comuna: '',
    indicaciones: '',
  });
  const [errores, setErrores] = useState({});
  const [forzarRechazo, setForzarRechazo] = useState(false);

  const descuento = usuario?.descuento ?? 0;
  const totales = calcularTotales(detalle, descuento);

  if (detalle.length === 0) {
    return (
      <Container className="py-4">
        <h1>Finalizar compra</h1>
        <EstadoVacio titulo="No hay productos para pagar" texto="Agrega productos al carrito antes de continuar." accionTexto="Ver productos" accionHref="/productos" />
      </Container>
    );
  }

  const cambiar = (campo) => (evento) => {
    const valor = evento.target.value;
    setValores((actual) => ({ ...actual, [campo]: valor, ...(campo === 'region' ? { comuna: '' } : {}) }));
    if (errores[campo]) setErrores((actual) => ({ ...actual, [campo]: undefined }));
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevosErrores = validarCheckout(valores);
    setErrores(nuevosErrores);
    if (!esValido(nuevosErrores)) return;

    const esRetiro = valores.tipoEntrega === TIPO_RETIRO;
    const orden = confirmarCompra({
      cliente: { nombre: valores.nombre.trim(), apellidos: valores.apellidos.trim(), correo: valores.correo.trim() },
      entrega: esRetiro
        ? { tipo: TIPO_RETIRO, sucursal: valores.sucursal, fecha: valores.fecha, hora: valores.hora }
        : { tipo: TIPO_DELIVERY, telefono: valores.telefono.trim(), fecha: valores.fecha },
      direccion: esRetiro
        ? null
        : { calle: valores.calle.trim(), departamento: valores.departamento.trim(), region: valores.region, comuna: valores.comuna, indicaciones: valores.indicaciones.trim() },
      detalle,
      totales,
      usuarioId: usuario?.id ?? null,
      forzarRechazo,
    });

    if (orden.estado === 'pagada') {
      sincronizarEntrega(orden);
      vaciar();
    }
    navigate(orden.estado === 'pagada' ? `/compra/exito/${orden.id}` : `/compra/error/${orden.id}`);
  };

  return (
    <Container className="py-4">
      <h1>Finalizar compra</h1>
      <Row className="g-4">
        <Col lg={7}>
          <Form noValidate onSubmit={enviar} aria-label="Datos de compra">
            <h2 className="h5">Información del cliente</h2>
            <Row>
              <Col md={6}><CampoFormulario id="checkout-nombre" label="Nombre" value={valores.nombre} onChange={cambiar('nombre')} error={errores.nombre} autoComplete="given-name" /></Col>
              <Col md={6}><CampoFormulario id="checkout-apellidos" label="Apellidos" value={valores.apellidos} onChange={cambiar('apellidos')} error={errores.apellidos} autoComplete="family-name" /></Col>
            </Row>
            <CampoFormulario id="checkout-correo" label="Correo" type="email" value={valores.correo} onChange={cambiar('correo')} error={errores.correo} autoComplete="email" />

            <h2 className="h5 mt-3">Método de entrega</h2>
            <div className="mb-3" role="radiogroup" aria-label="Método de entrega">
              <Form.Check inline type="radio" name="tipoEntrega" id="checkout-tipo-delivery" label="Delivery" value={TIPO_DELIVERY} checked={valores.tipoEntrega === TIPO_DELIVERY} onChange={cambiar('tipoEntrega')} />
              <Form.Check inline type="radio" name="tipoEntrega" id="checkout-tipo-retiro" label="Retiro en tienda" value={TIPO_RETIRO} checked={valores.tipoEntrega === TIPO_RETIRO} onChange={cambiar('tipoEntrega')} />
            </div>

            {valores.tipoEntrega === TIPO_RETIRO ? (
              <>
                <CampoFormulario id="checkout-sucursal" label="Sucursal" as="select" value={valores.sucursal} onChange={cambiar('sucursal')} error={errores.sucursal}>
                  {SUCURSALES.map((s) => <option key={s} value={s}>{s}</option>)}
                </CampoFormulario>
                <Row>
                  <Col md={6}><CampoFormulario id="checkout-fecha-retiro" label="Fecha de retiro" type="date" value={valores.fecha} onChange={cambiar('fecha')} error={errores.fecha} /></Col>
                  <Col md={6}><CampoFormulario id="checkout-hora-retiro" label="Hora de retiro" type="time" value={valores.hora} onChange={cambiar('hora')} error={errores.hora} /></Col>
                </Row>
              </>
            ) : (
              <>
                <h3 className="h6">Dirección de entrega</h3>
                <Row>
                  <Col md={8}><CampoFormulario id="checkout-calle" label="Calle y número" value={valores.calle} onChange={cambiar('calle')} error={errores.calle} autoComplete="street-address" /></Col>
                  <Col md={4}><CampoFormulario id="checkout-depto" label="Departamento (opcional)" placeholder="Ej: 603" value={valores.departamento} onChange={cambiar('departamento')} /></Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <CampoFormulario id="checkout-region" label="Región" as="select" value={valores.region} onChange={cambiar('region')} error={errores.region}>
                      {regiones.map((r) => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                    </CampoFormulario>
                  </Col>
                  <Col md={6}>
                    <CampoFormulario id="checkout-comuna" label="Comuna" as="select" value={valores.comuna} onChange={cambiar('comuna')} error={errores.comuna}>
                      <option value="">Selecciona una comuna</option>
                      {comunasDe(valores.region).map((c) => <option key={c} value={c}>{c}</option>)}
                    </CampoFormulario>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}><CampoFormulario id="checkout-telefono" label="Teléfono de contacto" type="tel" placeholder="+56 9 1234 5678" value={valores.telefono} onChange={cambiar('telefono')} error={errores.telefono} autoComplete="tel" /></Col>
                  <Col md={6}><CampoFormulario id="checkout-fecha-entrega" label="Fecha de entrega" type="date" value={valores.fecha} onChange={cambiar('fecha')} error={errores.fecha} /></Col>
                </Row>
                <CampoFormulario id="checkout-indicaciones" label="Indicaciones para la entrega (opcional)" as="textarea" rows={3} placeholder="Ej: entre calles, color del edificio, no tiene timbre" value={valores.indicaciones} onChange={cambiar('indicaciones')} />
              </>
            )}

            <Form.Check id="checkout-rechazo" type="switch" className="mb-3" label="Simular pago rechazado (modo demostración)" checked={forzarRechazo} onChange={(e) => setForzarRechazo(e.target.checked)} />
            {forzarRechazo && <Alert variant="warning">El pago se rechazará para que puedas probar el flujo de error.</Alert>}

            <Button type="submit" variant="mil" size="lg" className="w-100">Pagar ahora {formatearPrecio(totales.total)}</Button>
          </Form>
        </Col>
        <Col lg={5}>
          <div className="panel-resumen">
            <h2 className="h5">Tu pedido</h2>
            <CarritoTabla detalle={detalle} editable={false} />
            <ResumenTotales totales={totales} descuentoPorcentaje={descuento} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;