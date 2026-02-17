import type { CartItemsType } from "../../components/CartItems";
import type { Cart } from "../../types/types";
import { api } from "../http/axios";

export const createCartApi = async (cartData: Partial<Cart>) => {
    try {
        const response = await api.post("/carts", cartData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el carro", error);
        throw error;
    }
};


export const getCartsApi = async (userId: string): Promise<Cart[]> => {
    try {
        const url = userId ? `/carts?userId=${userId}` : "/carts";
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el carro", error);
        throw error;
    }
};

export const getCartByIdApi = async (cartId: Cart): Promise<Cart> => {
    try {
        const response = await api.get(`/carts/${cartId}`);
        return response.data;
    } catch (error) {
        console.error("Error al conseguir ID", error);
        throw error;
    }
};

export const addItemToCartApi = async (cartId: string, itemData: CartItemsType): Promise<Cart> => {
    try {
        const payload = {
            productId: itemData.productId._id,
            qty: itemData.qty,
            priceSnapshot: itemData.priceSnapshot
        };

        const response = await api.post(`/carts/${cartId}/items`, payload);
        return response.data;
    } catch (error) {
        console.error("Error al añadir items al carro", error);
        throw error;
    }
};


export const updateCartItemApi = async (cartId: string, productId: string, updatedData: Partial<CartItemsType>): Promise<Cart> => {
    try {
        const payload = {
            qty: updatedData.qty,
            priceSnapshot: updatedData.priceSnapshot
        };

        const response = await api.patch(
            `/carts/${cartId}/items/${productId}`,
            payload
        );

        return response.data;
    } catch (error) {
        console.error("Error al actualizar el carro", error);
        throw error;
    }
};

export const deleteCartItemApi = async (cartId: string, productId: string): Promise<Cart> => {
    try {
        const response = await api.delete(`/carts/${cartId}/items/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar items del carro", error);
        throw error;
    }
};

export const getCartSummaryApi = async (cartId: string): Promise<{ subtotal: number; tax: number; total: number }> => {
    try {
        const response = await api.get(`/carts/${cartId}/summary`);
        return response.data;
    } catch (error) {
        console.error("Error al sumar el carro", error);
        throw error;
    }
};

export const checkoutCartApi = async (cartId: string, checkoutData: Partial<Cart> = {}): Promise<Cart> => {
    try {
        const response = await api.post(`/carts/${cartId}/checkout`, checkoutData);
        return response.data;
    } catch (error) {
        console.error("Error al finalizar la compra", error);
        throw error;
    }
};
