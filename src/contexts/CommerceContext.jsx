import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../core/http/axios";
import { getTokenFromLocalStorage } from "../core/auth/auth.service";

export const CommerceContext = createContext();
export const useCommerce = () => useContext(CommerceContext);

export const CommerceProvider = ({ children }) => {
    const [commerces, setCommerces] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCommerces = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/commerces", {
                headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
            });
            setCommerces(data);
        } catch (error) {
            console.error("Error cargando comercios:", error);
        } finally {
            setLoading(false);
        }
    };

    const addCommerce = (commerce) => {
        setCommerces((prev) => [...prev, commerce]);
    };

    const updateCommerce = (updatedCommerce) => {
        setCommerces((prev) =>
            prev.map((c) => (c._id === updatedCommerce._id ? updatedCommerce : c))
        );
    };

    const deleteCommerce = async (commerceId) => {
        try {
            await api.delete(`/commerces/${commerceId}`, {
                headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
            });
            // eliminar del estado local
            setCommerces((prev) => prev.filter((c) => c._id !== commerceId));
        } catch (error) {
            console.error("Error eliminando comercio:", error);
            alert("No se pudo eliminar el comercio.");
        }
    };

    useEffect(() => {
        fetchCommerces();
    }, []);

    return (
        <CommerceContext.Provider
            value={{ commerces, loading, fetchCommerces, addCommerce, updateCommerce, deleteCommerce }}
        >
            {children}
        </CommerceContext.Provider>
    );
};