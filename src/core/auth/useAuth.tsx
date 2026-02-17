import { useCallback, useContext, useMemo } from "react";
import { loginApi, logoutApi, registerApi, getProfileApi, type Login, type Register } from "./auth.api";
import { AuthContext, type AuthContextType  } from "../../contexts/AuthContext";
import {
    saveTokenInLocalStorage,
    saveUserInLocalStorage,
    removeUserFromLocalStorage,
    removeTokenFromLocalStorage
} from "./auth.service";
import { useNavigate } from "react-router-dom";

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("AuthContext no está disponible");
    return context;
};

export const useAuth = () => {
    const { user, setUser } = useAuthContext();
    const navigate = useNavigate();

    const getProfile = useCallback(async (): Promise<void> => {
        try {
            console.log("Obteniendo usuario actual");
            const { user } = await getProfileApi();

            if (user) {
                console.log("Usuario actual:", user);
                setUser(user);
                saveUserInLocalStorage(user);
            } else {
                console.log("No hay usuario logueado");
            }
        } catch (error) {
            console.error("Error al obtener perfil:", error);
        }
    }, [setUser]);

    const login = useCallback(async ({ email, password }: Login): Promise<void> => {
        try {
            console.log(`Intentando login con: ${email}`);
            const authData = await loginApi({ email, password });


            if (typeof authData === "string") {
                saveTokenInLocalStorage(authData);
                await getProfile();
                navigate("/");
            }

            else if (authData?.token && authData?.user) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                navigate("/");
            }
        } catch (error) {
            console.error("Error en login:", error);
        }
    }, [getProfile, navigate, setUser]);

    const logout = useCallback(async (): Promise<void> => {
        console.log("Cerrando sesión");
        try {
            await logoutApi();
        } catch (err) {
            console.error("No se pudo cerrar sesión en el servidor.", err);
        } finally {
            removeUserFromLocalStorage();
            removeTokenFromLocalStorage();

            if (setUser) setUser(null);
        }
    }, [setUser]);

    const register = useCallback(async (form: Register): Promise<void> => {
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
    }, [navigate, setUser]);



    const auth = useMemo(() => ({
        user, setUser, login, logout, register, getProfile
    }), [user, setUser, login, logout, register, getProfile]);

    return auth;
};
