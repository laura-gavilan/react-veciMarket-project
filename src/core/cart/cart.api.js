import { api } from "../http/axios";

export const getCartApi = async (userId) => {
    try {
        const response = await api.get(`/carts?userId=${userId}`);
        console.log("Carrito obtenido", response.data);
        return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        return null;
    }
};

export const createCartApi = async (cartData) => {
    try {
        const response = await api.post("/carts", cartData);
        console.log("Carrito creado", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear el carrito", error);
        throw error;
    }
};


export const updateCartApi = async (cartId, data) => {
    try {
        const response = await api.patch(`/carts/${cartId || data.id}`, data);
        console.log("Carrito actualizado", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el carrito", error.response?.data || error);
        throw error;
    }
};

export const deleteCartApi = async (cartId) => {
    try {
        const response = await api.delete(`/carts/${cartId}`);
        console.log("Carrito eliminado", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el carrito", error);
        throw error;
    }
};
