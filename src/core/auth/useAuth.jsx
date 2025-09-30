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
            await logoutApi(); // intenta cerrar sesión en el servidor
        } catch (err) {
            console.warn("No se pudo cerrar sesión en el servidor, igual se limpia localmente", err);
        }

        removeUserFromLocalStorage();
        removeTokenFromLocalStorage();
        setUser(null);
        navigate("/");
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
                setUser(user); // opcional: sincronizar con estado global
            } else {
                console.log("No hay usuario logueado");
            }
        } catch (error) {
            console.error("Error al obtener perfil:", error);
        }
    };

    return { login, logout, register, getProfile };
};
