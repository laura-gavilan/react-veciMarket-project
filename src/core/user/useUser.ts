import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import { useNavigate } from "react-router-dom";
import { deleteUserApi, getUserByIdApi, updateUserApi } from "./user.api";
import type { User } from "../../types/types";

export const useUser = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    if (!context) {
        throw new Error("Error");
    };

    const { user, updateUser, clearUser } = context;

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);


    const updateUserData = async (newData: Partial<User>): Promise<void> => {
        if (!user?._id) throw new Error("No hay usuario logueado");
        try {
            const updatedUser = await updateUserApi(user._id, newData);
            updateUser(updatedUser);
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw error;
        }
    };


    const deleteUser = async (): Promise<void> => {
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


    const refreshUser = async (): Promise<void> => {
        if (!user?._id) return;
        try {
            const freshUser = await getUserByIdApi(user._id);
            updateUser(freshUser);
        } catch (error) {
            console.error("Error al refrescar el usuario:", error);
        }
    };

    return { user, updateUser, updateUserData, deleteUser, clearUser, refreshUser, loading };
};

