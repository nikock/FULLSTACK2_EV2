export const ROL_ADMIN = 'admin';
export const ROL_VENDEDOR = 'vendedor';
export const ROL_CLIENTE = 'cliente';

export const ROLES_PANEL = [ROL_ADMIN, ROL_VENDEDOR];

export const etiquetaRol = (rol) => ({ admin: 'Administrador', vendedor: 'Vendedor', cliente: 'Cliente' })[rol] ?? rol;

export const rutaInicialPorRol = (rol) => ({ admin: '/admin', vendedor: '/admin/ordenes' })[rol] ?? '/';
