import type { favoritesApiResponse } from "../../types/types";
import { api } from "../http/axios"
import type { Product } from './../../components/ProductCard';

export const getFavoritesApi = async (userId: string): Promise<favoritesApiResponse> => {
    try {
        const response = await api.get(`/users/${userId}/favoritos`);
        console.log("Respuesta de favoritos", response.data);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo favoritos", error);
        throw error;
    }
};

export const addFavoriteApi = async (userId: string, productId: string): Promise<Product> => {
    try {
        const response = await api.post(`/users/${userId}/favoritos/${productId}`);
        console.log("Producto agregado a favoritos", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al agregar producto a favoritos", error);
        throw error;
    }
};

export const deleteFavoritesApi = async ( userId: string, productId: string ): Promise<void> => {
    try {
        const response = await api.delete(`/users/${userId}/favoritos/${productId}`);
        console.log("Favorito eliminado correctamente", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar favorito", error);
        throw error;
    }
};
