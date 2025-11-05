import { api } from "../http/axios";

export const createCartApi = async (cartData) => {
    try {
        const response = await api.post("/carts", cartData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el carro", error);
        throw error;
    }
};


export const getCartsApi = async (userId) => {
    try {
        const url = userId ? `/carts?userId=${userId}` : "/carts";
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el carro", error);
        throw error;
    }
};

export const getCartByIdApi = async (cartId) => {
    try {
        const response = await api.get(`/carts/${cartId}`);
        return response.data;
    } catch (error) {
        console.error("Error al conseguir ID", error);
        throw error;
    }
};

export const addItemToCartApi = async (cartId, itemData) => {
    try {
        const response = await api.post(`/carts/${cartId}/items`, itemData);
        return response.data;
    } catch (error) {
        console.error("Error al añadir items al carro", error);
        throw error;
    }
};

export const updateCartItemApi = async (cartId, productId, updatedData) => {
    try {
        const response = await api.patch(`/carts/${cartId}/items/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el carro", error);
        throw error;
    }
};

export const deleteCartItemApi = async (cartId, productId) => {
    try {
        const response = await api.delete(`/carts/${cartId}/items/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar items del carro", error);
        throw error;
    }
};

export const getCartSummaryApi = async (cartId) => {
    try {
        const response = await api.get(`/carts/${cartId}/summary`);
        return response.data;
    } catch (error) {
        console.error("Error al sumar el carro", error);
        throw error;
    }
};

export const checkoutCartApi = async (cartId, checkoutData = {}) => {
    try {
        const response = await api.post(`/carts/${cartId}/checkout`, checkoutData);
        return response.data;
    } catch (error) {
        console.error("Error al finalizar la compra", error);
        throw error;
    }
};
