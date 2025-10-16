import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import { useNavigate } from "react-router-dom";
import { deleteUserApi, getUserByIdApi, updateUserApi } from "./user.api";

export const useUser = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error("Error");
    }

    const { user, setUser, clearUser } = context;


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


    const deleteUser = async () => {
        if (!user?._id) throw new Error("No hay usuario logueado");
        try {
            await deleteUserApi(user._id);
            clearUser();
            return navigate("/"); 
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    };


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

