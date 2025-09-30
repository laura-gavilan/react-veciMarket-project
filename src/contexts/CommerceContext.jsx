import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../core/http/axios";

const CommerceContext = createContext();

export const useCommerce = () => useContext(CommerceContext);

export const CommerceProvider = ({ children }) => {
    const [commerces, setCommerces] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCommerces = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/commerces");
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

    useEffect(() => {
        fetchCommerces();
    }, []);

    return (
        <CommerceContext.Provider
            value={{ commerces, loading, fetchCommerces, addCommerce }}
        >
            {children}
        </CommerceContext.Provider>
    );
};