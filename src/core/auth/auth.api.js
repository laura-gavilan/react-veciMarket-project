
import { api } from './../http/axios';


export const loginApi = async (user) => {
    try {
        console.log(`${user.name},{${user.email}, ${user.role}`);
        const response = await api.post("/auth/login", user);
        console.log(response);

        return response.data;
    } catch (error) {
        console.error("Se ha producido un error al iniciar sesión", error);
        throw error;
    }
};

export const registerApi = async (user) => {
    try {
        console.log(`${user.username}, ${user.firstName}, ${user.lastName}, ${user.name},{${user.email}, ${user.bio} ${user.phoneNumber},${user.address}, ${user.role}`);
        const response = await api.post("/auth/register", user);
        console.log(response);

        return response.data;
    } catch (error) {
        console.error("Error al registrar el usuario", error);
        throw error;
    }
};
