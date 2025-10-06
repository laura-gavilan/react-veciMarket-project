import { useContext } from "react";
import { loginApi, logoutApi, registerApi, getProfileApi } from "./auth.api";
import { AuthContext } from "../../contexts/AuthContext";
import {
    saveTokenInLocalStorage,
    saveUserInLocalStorage,
    removeUserFromLocalStorage,
    removeTokenFromLocalStorage
} from "./auth.service";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = async ({ email, password }) => {
        try {
            console.log(`Intentando login con: ${email}`);
            const authData = await loginApi({ email, password });

            if (authData?.token && authData?.user) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                navigate("/");
            }
        } catch (error) {
            console.error("Error en login:", error);
        }
    };

    const logout = async () => {
        console.log("Cerrando sesión");
        try {
            await logoutApi(); 
        } catch (err) {
            console.warn("No se pudo cerrar sesión en el servidor, pero se limpiará localmente.", err);
        } finally {
            removeUserFromLocalStorage();
            removeTokenFromLocalStorage();
            setUser(null);
            navigate("/");
        }
    };

    const register = async (form) => {
        try {
            console.log(`Registrando: ${form.email}`);
            const authData = await registerApi(form);

            if (authData?.token && authData?.user) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                navigate("/");
            }
        } catch (error) {
            console.error("Error en registro:", error);
        }
    };

    const getProfile = async () => {
        try {
            console.log("Obteniendo usuario actual");
            const { user } = await getProfileApi();

            if (user) {
                console.log("Usuario actual:", user);
                setUser(user);
            } else {
                console.log("No hay usuario logueado");
            }
        } catch (error) {
            console.error("Error al obtener perfil:", error);
        }
    };

    return { login, logout, register, getProfile };
};
