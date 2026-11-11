import { request } from "./client";

export const obtenerRetiros = () => request("/retiro-tienda");
export const buscarRetiro = (id) => request(`/retiro-tienda/${id}`);
export const agregarRetiro = (retiro) => request("/retiro-tienda", "POST", retiro);
export const actualizarRetiro = (id, retiro) => request(`/retiro-tienda/${id}`, "PUT", retiro);
export const eliminarRetiro = (id) => request(`/retiro-tienda/${id}`, "DELETE");

export const obtenerDeliveries = () => request("/delivery");
export const buscarDelivery = (id) => request(`/delivery/${id}`);
export const agregarDelivery = (delivery) => request("/delivery", "POST", delivery);
export const actualizarDelivery = (id, delivery) => request(`/delivery/${id}`, "PUT", delivery);
export const eliminarDelivery = (id) => request(`/delivery/${id}`, "DELETE");
