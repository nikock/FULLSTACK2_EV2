import { Form } from 'react-bootstrap';

function CampoFormulario({ id, label, type = 'text', value, onChange, error, as, children, ayuda, ...resto }) {
  const Control = as === 'select' ? Form.Select : Form.Control;
  const propsExtra = as === 'textarea' ? { as: 'textarea' } : { type: as === 'select' ? undefined : type };
  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Control value={value} onChange={onChange} isInvalid={Boolean(error)} {...propsExtra} {...resto}>
        {children}
      </Control>
      {ayuda && !error && <Form.Text muted>{ayuda}</Form.Text>}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default CampoFormulario;
