// src/hooks/useUser.js
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import { useNavigate } from "react-router-dom";
import { deleteUserApi, getUserByIdApi, updateUserApi } from "./user.api";

export const useUser = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error("useUser debe estar dentro de un UserContext.Provider");
    }

    const { user, setUser, clearUser } = context;

    // Actualiza los datos del usuario tanto en el contexto como en la API
    const updateUserData = async (newData) => {
        if (!user?._id) throw new Error("No hay usuario logueado");
        try {
            const updatedUser = await updateUserApi(user._id, newData);
            setUser(updatedUser);
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw error;
        }
    };

    // Elimina el usuario en la API y limpia el contexto
    const deleteUser = async () => {
        if (!user?._id) throw new Error("No hay usuario logueado");
        try {
            await deleteUserApi(user._id);
            clearUser();
            navigate("/"); // Redirige al inicio tras eliminar
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    };

    // Refresca los datos del usuario desde la API
    const refreshUser = async () => {
        if (!user?._id) return;
        try {
            const freshUser = await getUserByIdApi(user._id);
            setUser(freshUser);
        } catch (error) {
            console.error("Error al refrescar el usuario:", error);
        }
    };

    return {
        user,
        setUser,
        updateUserData,
        deleteUser,
        clearUser,
        refreshUser
    };
};

