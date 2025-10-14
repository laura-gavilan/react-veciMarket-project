import { api } from './../http/axios.js';

export const loginApi = async ({ email, password }) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        console.log("Respuesta del login:", response.data);
        return response.data;
    } catch (error) {
        console.error("Se ha producido un error al iniciar sesión", error);
        throw error;
    }
};

export const registerApi = async (user) => {
    try {
        console.log(`${user.firstName}, ${user.lastName}, ${user.name},{${user.email}, ${user.password}, ${user.bio} ${user.phoneNumber},${user.address}, ${user.role}`);
        const response = await api.post("/auth/register", user);
        console.log(response);

        return response.data;
    } catch (error) {
        console.error("Error al registrar el usuario", error);
        throw error;
    }
};

export const logoutApi = async () => {
    try {
        console.log("logoutApi");
        const response = await api.post("/auth/logout");

        console.log("respuesta de la api", response);
        return response.data;
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        throw error;
    }
};

export const getProfileApi = async () => {
    try {
        console.log("getProfileApi");
        const response = await api.get("/auth/me");
        console.log("respuesta", response);

        return response.data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw error;
    }
};
