import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { esValido, validarProducto } from '../../utils/validators';
import CampoFormulario from '../common/CampoFormulario';

const vacio = { nombre: '', descripcion: '', precio: '', categoriaId: '', imagen: '', stock: '', stockCritico: '5', oferta: '0', destacado: false };

const aTexto = (producto) =>
  producto
    ? {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: String(producto.precio),
        categoriaId: String(producto.categoriaId),
        imagen: producto.imagen,
        stock: String(producto.stock),
        stockCritico: String(producto.stockCritico),
        oferta: String(producto.oferta),
        destacado: Boolean(producto.destacado),
      }
    : vacio;

function ProductoForm({ inicial, categorias, onSubmit, onCancelar, textoBoton = 'Guardar producto' }) {
  const [valores, setValores] = useState(() => aTexto(inicial));
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (evento) => {
    const valor = evento.target.type === 'checkbox' ? evento.target.checked : evento.target.value;
    setValores((actual) => ({ ...actual, [campo]: valor }));
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevosErrores = validarProducto(valores);
    setErrores(nuevosErrores);
    if (!esValido(nuevosErrores)) return;
    onSubmit({
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      precio: Number(valores.precio),
      categoriaId: Number(valores.categoriaId),
      imagen: valores.imagen.trim() || '/img/portada.png',
      stock: Number(valores.stock),
      stockCritico: Number(valores.stockCritico),
      oferta: Number(valores.oferta),
      destacado: valores.destacado,
    });
  };

  return (
    <Form noValidate onSubmit={enviar} className="tarjeta-formulario" aria-label="Formulario de producto">
      <CampoFormulario id="producto-nombre" label="Nombre" value={valores.nombre} onChange={cambiar('nombre')} error={errores.nombre} />
      <CampoFormulario id="producto-descripcion" label="Descripción" as="textarea" rows={3} value={valores.descripcion} onChange={cambiar('descripcion')} error={errores.descripcion} />
      <Row>
        <Col md={6}><CampoFormulario id="producto-precio" label="Precio (CLP)" type="number" min="0" value={valores.precio} onChange={cambiar('precio')} error={errores.precio} /></Col>
        <Col md={6}>
          <CampoFormulario id="producto-categoria" label="Categoría" as="select" value={valores.categoriaId} onChange={cambiar('categoriaId')} error={errores.categoriaId}>
            <option value="">Selecciona una categoría</option>
            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </CampoFormulario>
        </Col>
      </Row>
      <Row>
        <Col md={4}><CampoFormulario id="producto-stock" label="Stock" type="number" min="0" value={valores.stock} onChange={cambiar('stock')} error={errores.stock} /></Col>
        <Col md={4}><CampoFormulario id="producto-stock-critico" label="Stock crítico" type="number" min="0" value={valores.stockCritico} onChange={cambiar('stockCritico')} error={errores.stockCritico} ayuda="Se avisa cuando el stock llega a este valor." /></Col>
        <Col md={4}><CampoFormulario id="producto-oferta" label="Oferta (%)" type="number" min="0" max="90" value={valores.oferta} onChange={cambiar('oferta')} error={errores.oferta} /></Col>
      </Row>
      <CampoFormulario id="producto-imagen" label="Imagen (ruta o URL)" value={valores.imagen} onChange={cambiar('imagen')} placeholder="/img/torta-boda.jpeg" ayuda="Si lo dejas vacío se usa una imagen por defecto." />
      <Form.Check id="producto-destacado" type="switch" className="mb-3" label="Mostrar en destacados del inicio" checked={valores.destacado} onChange={cambiar('destacado')} />
      <div className="d-flex gap-2">
        <Button type="submit" variant="mil">{textoBoton}</Button>
        <Button variant="outline-secondary" onClick={onCancelar}>Cancelar</Button>
      </div>
    </Form>
  );
}

export default ProductoForm;
