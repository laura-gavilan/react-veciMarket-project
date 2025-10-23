// import { api } from "../http/axios";


// // Crear un pedido
// export const createOrderApi = async (orderData) => {
//     const response = await api.post("/orders", orderData);
//     return response.data;
// };

// // Obtener todos los pedidos o de un usuario específico
// export const getOrdersApi = async (userId) => {
//     const url = userId ? `/orders?userId=${userId}` : "/orders";
//     const response = await api.get(url);
//     return response.data;
// };

// // Obtener un pedido por ID
// export const getOrderByIdApi = async (orderId) => {
//     const response = await api.get(`/orders/${orderId}`);
//     return response.data;
// };

// // Actualizar un pedido existente
// export const updateOrderApi = async (orderId, updateData) => {
//     const response = await api.patch(`/orders/${orderId}`, updateData);
//     return response.data;
// };

// // Eliminar un pedido
// export const deleteOrderApi = async (orderId) => {
//     const response = await api.delete(`/orders/${orderId}`);
//     return response.data;
// };

// // Obtener pedidos filtrando por estado
// export const getOrdersByStatusApi = async (status) => {
//     const response = await api.get(`/orders?status=${status}`);
//     return response.data;
// };
