import type { Commerce, CreateCommerce } from "../../types/types";
import { api } from "../http/axios";


export const getAllCommercesApi = async (): Promise<Commerce[]> => {
    try {
        const response = await api.get("/commerces");
        return response.data;
    } catch (error) {
        console.error("Error cargando comercios:", error);
        throw error;
    }
};

export const addCommerceApi = async (commerce: CreateCommerce): Promise<Commerce> => {
    try {
        const response = await api.post("/commerces", commerce);
        return response.data;
    } catch (error) {
        console.error("Error creando comercio:", error);
        throw error;
    }
};

export const updateCommerceApi = async (commerceId: string, updatedCommerce: CreateCommerce): Promise<Commerce> => {
    try {
        const response = await api.patch(`/commerces/${commerceId}`, updatedCommerce);
        return response.data;
    } catch (error) {
        const axiosError = error as { response?: { data?: undefined } };
        console.error("Error actualizando comercio:", axiosError.response?.data || error);
        throw error;
    }
};

export const deleteCommerceApi = async (commerceId: string): Promise<void> => {
    try {
        await api.delete(`/commerces/${commerceId}`);
    } catch (error) {
        console.error("Error eliminando comercio:", error);
        throw error;
    }
};