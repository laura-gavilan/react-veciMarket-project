import { api } from "../http/axios"

export const getFavoritesApi = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}/favoritos`);
        console.log("Respuesta de favoritos", response.data);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo favoritos", error);
        throw error;
    }
};

export const addFavoriteApi = async (userId, productId) => {
    try {
        const response = await api.post(`/users/${userId}/favoritos/${productId}`);
        console.log("Producto agregado a favoritos", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al agregar producto a favoritos", error);
    }
};

export const deleteFavoritesApi = async ( userId, productId ) => {
    try {
        const response = await api.delete(`/users/${userId}/favoritos/${productId}`);
        console.log("Favorito eliminado correctamente", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar favorito", error);
    }
};
