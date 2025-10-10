import { api } from './../http/axios.js';

export const getUsersApi = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
        throw error;
    }
};


export const getUserByIdApi = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el usuario con ID ${id}`, error);
        throw error;
    }
};


export const updateUserApi = async (id, data) => {
    try {
        const response = await api.patch(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el usuario con ID ${id}`, error);
        throw error;
    }
};


export const deleteUserApi = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el usuario con ID ${id}`, error);
        throw error;
    }
};
