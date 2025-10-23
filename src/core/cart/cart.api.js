import { api } from "../http/axios";

export const createCartApi = async (cartData) => {
    const response = await api.post("/carts", cartData);
    return response.data;
};

export const getCartsApi = async (userId) => {
    const url = userId ? `/carts?userId=${userId}` : "/carts";
    const response = await api.get(url);
    return response.data;
};

export const getCartByIdApi = async (cartId) => {
    const response = await api.get(`/carts/${cartId}`);
    return response.data;
};

export const addItemToCartApi = async (cartId, itemData) => {
    const response = await api.post(`/carts/${cartId}/items`, itemData);
    return response.data;
};

export const updateCartItemApi = async (cartId, productId, updatedData) => {
    const response = await api.patch(`/carts/${cartId}/items/${productId}`, updatedData);
    return response.data;
};

export const deleteCartItemApi = async (cartId, productId) => {
    const response = await api.delete(`/carts/${cartId}/items/${productId}`);
    return response.data;
};

export const getCartSummaryApi = async (cartId) => {
    const response = await api.get(`/carts/${cartId}/summary`);
    return response.data;
};

export const checkoutCartApi = async (cartId, checkoutData = {}) => {
    const response = await api.post(`/carts/${cartId}/checkout`, checkoutData);
    return response.data;
};
