import { agregarDelivery, agregarRetiro } from '../api/entregaApi';
import { TIPO_RETIRO } from '../data/sucursales';

export async function sincronizarEntrega(orden) {
  const { entrega, direccion, cliente } = orden;
  if (!entrega) return null;
  try {
    if (entrega.tipo === TIPO_RETIRO) {
      return await agregarRetiro({
        numeroOrden: orden.numero,
        nombreRetira: `${cliente.nombre} ${cliente.apellidos}`.trim(),
        correo: cliente.correo,
        sucursal: entrega.sucursal,
        fecha: entrega.fecha,
        hora: entrega.hora,
        estado: 'pendiente',
      });
    }
    return await agregarDelivery({
      numeroOrden: orden.numero,
      nombreDestinatario: `${cliente.nombre} ${cliente.apellidos}`.trim(),
      telefono: entrega.telefono,
      calle: direccion.calle,
      departamento: direccion.departamento,
      region: direccion.region,
      comuna: direccion.comuna,
      indicaciones: direccion.indicaciones,
      fecha: entrega.fecha,
      estado: 'pendiente',
    });
  } catch (error) {
    console.warn('No se pudo registrar la entrega en el servidor:', error.message);
    return null;
  }
}
