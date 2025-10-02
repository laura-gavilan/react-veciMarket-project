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

    useEffect(() => {
        fetchCommerces();
    }, []);

    return (
        <CommerceContext.Provider
            value={{ commerces, loading, fetchCommerces, addCommerce, updateCommerce }}
        >
            {children}
        </CommerceContext.Provider>
    );
};