import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { esValido, validarCategoria } from '../../utils/validators';
import CampoFormulario from '../common/CampoFormulario';

function CategoriaForm({ inicial, onSubmit, onCancelar }) {
  const [valores, setValores] = useState({
    nombre: inicial?.nombre ?? '',
    descripcion: inicial?.descripcion ?? '',
    imagen: inicial?.imagen ?? '',
  });
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (evento) => setValores((actual) => ({ ...actual, [campo]: evento.target.value }));

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevosErrores = validarCategoria(valores);
    setErrores(nuevosErrores);
    if (!esValido(nuevosErrores)) return;
    onSubmit({ nombre: valores.nombre.trim(), descripcion: valores.descripcion.trim(), imagen: valores.imagen.trim() || '/img/portada.png' });
  };

  return (
    <Form noValidate onSubmit={enviar} className="tarjeta-formulario" aria-label="Formulario de categoría">
      <CampoFormulario id="categoria-nombre" label="Nombre" value={valores.nombre} onChange={cambiar('nombre')} error={errores.nombre} />
      <CampoFormulario id="categoria-descripcion" label="Descripción" as="textarea" rows={3} value={valores.descripcion} onChange={cambiar('descripcion')} error={errores.descripcion} />
      <CampoFormulario id="categoria-imagen" label="Imagen (ruta o URL)" value={valores.imagen} onChange={cambiar('imagen')} placeholder="/img/torta-boda.jpeg" />
      <div className="d-flex gap-2">
        <Button type="submit" variant="mil">Guardar categoría</Button>
        <Button variant="outline-secondary" onClick={onCancelar}>Cancelar</Button>
      </div>
    </Form>
  );
}

export default CategoriaForm;
