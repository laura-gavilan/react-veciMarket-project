import { api } from "../http/axios";

export const getAllCommercesApi = async () => {
    try {
        const response = await api.get("/commerces");
        return response.data;
    } catch (error) {
        console.error("Error cargando comercios:", error);
        throw error;
    }
};

export const addCommerceApi = async (commerce) => {
    try {
        const response = await api.post("/commerces", commerce);
        return response.data;
    } catch (error) {
        console.error("Error creando comercio:", error);
        throw error;
    }
};

export const updateCommerceApi = async (commerceId, updatedCommerce) => {
    try {
        const response = await api.patch(`/commerces/${commerceId}`, updatedCommerce);
        return response.data;
    } catch (error) {
        console.error("Error actualizando comercio:", error.response?.data || error);
        throw error;
    }
};

export const deleteCommerceApi = async (commerceId) => {
    try {
        const response = await api.delete(`/commerces/${commerceId}`);
        return response.data;
    } catch (error) {
        console.error("Error eliminando comercio:", error);
        throw error;
    }
};