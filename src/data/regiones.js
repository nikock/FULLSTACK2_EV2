export const regiones = [
  { nombre: 'Región Metropolitana de Santiago', comunas: ['Cerrillos', 'Santiago', 'Providencia', 'Ñuñoa', 'Las Condes', 'Maipú', 'La Florida', 'Puente Alto'] },
  { nombre: 'Región de Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'] },
  { nombre: 'Región del Biobío', comunas: ['Concepción', 'Talcahuano', 'Chiguayante', 'San Pedro de la Paz'] },
];

export function comunasDe(nombreRegion) {
  const region = regiones.find((r) => r.nombre === nombreRegion);
  return region ? region.comunas : [];
}



