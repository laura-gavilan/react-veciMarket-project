import { createContext, useContext, useState, useEffect } from "react";
import { getAllCommercesApi, addCommerceApi, updateCommerceApi, deleteCommerceApi } from "./commerce.api.js";

import { getCommercesFromLocalStorage, saveCommercesInLocalStorage, addCommerceToLocalStorage, updateCommerceInLocalStorage, deleteCommerceFromLocalStorage } from "./commerce.service.js";

export const CommerceContext = createContext();
export const useCommerce = () => useContext(CommerceContext);

export const CommerceProvider = ({ children }) => {
    const [commerces, setCommerces] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchCommerces = async () => {
        setLoading(true);
        try {
            const data = await getAllCommercesApi();
            setCommerces(data);
            saveCommercesInLocalStorage(data);
        } catch (error) {
            console.error("Error cargando comercios desde API:", error);

            const localData = getCommercesFromLocalStorage();
            setCommerces(localData);
        } finally {
            setLoading(false);
        }
    };

    const addCommerce = async (commerce) => {
        try {
            const newCommerce = await addCommerceApi(commerce);
            setCommerces(prev => [...prev, newCommerce]);
            addCommerceToLocalStorage(newCommerce);
        } catch (error) {
            console.error("Error creando comercio:", error);
        }
    };

    const updateCommerce = async (updatedCommerce) => {
        try {
            const { _id, name, slug, image, description, address, isActive } = updatedCommerce;
            const editableData = { name, slug, image, description, address, isActive };

            const data = await updateCommerceApi(_id, editableData);
            setCommerces(prev => prev.map(c => (c._id === data._id ? data : c)));
            updateCommerceInLocalStorage(data);
        } catch (error) {
            console.error("Error actualizando comercio:", error);
        }
    };

    const deleteCommerce = async (commerceId) => {
        try {
            await deleteCommerceApi(commerceId);
            setCommerces(prev => prev.filter(c => c._id !== commerceId));
            deleteCommerceFromLocalStorage(commerceId);
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