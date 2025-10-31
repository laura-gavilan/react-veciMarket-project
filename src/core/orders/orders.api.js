import { api } from "../http/axios"

export const getOrdersApi = async () => {
    try {
        const response = await api.get("/orders");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las órdenes", error);
        throw error;
    }
};

export const addOrderApi = async (order) => {
    try {
        const response = await api.post("/orders", order);
        return response.data;
    } catch (error) {
        console.error("Error al crear la orden", error);
        throw error;
    }
};

export const getOrderByIdApi = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error ("Error al obtener la orden", error);
        throw error;
    }  
};

export const updateOrderStatusApi = async (orderId, status) => {
    try {
        const response = await api.patch(`/orders/${orderId}/status`, {status});
        return response.data;
    } catch ( error) {
        console.error ("Error al actualizar el estado de la orden", error);
        throw error;
    }
};

export const deleteOrderApi = async (orderId) => {
    try {
        const response = await api.delete(`orders/${orderId}`);
        return response.data;
    } catch ( error) {
        console.error ("Error al eliminar la orden", error);
        throw error;
    }
};


