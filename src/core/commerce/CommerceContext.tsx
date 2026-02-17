import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { getAllCommercesApi, addCommerceApi, updateCommerceApi, deleteCommerceApi } from "./commerce.api.js";
import { getCommercesFromLocalStorage, saveCommercesInLocalStorage, addCommerceToLocalStorage, updateCommerceInLocalStorage, deleteCommerceFromLocalStorage } from "./commerce.service.js";
import type { ChildrenProps, Commerce } from "../../types/types";

export type CommerceContextType = {
    commerces: Commerce[];
    loading: boolean;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    fetchCommerces: () => Promise<void>;
    addCommerce: (commerce: Commerce) => Promise<void>;
    updateCommerce: (commerce: Commerce) => Promise<void>;
    deleteCommerce: (commerceId: string) => Promise<void>;
};



export const CommerceContextType = createContext<CommerceContextType | null>(null);
export const useCommerce = (): CommerceContextType => {
    const context = useContext(CommerceContextType);
    if (!context) throw new Error("Error en useCommerce");
    return context;
};

export const CommerceProvider = ({ children }: ChildrenProps) => {
    const [commerces, setCommerces] = useState<Commerce[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [toast, setToast] = useState<string | null>(null);
    const showToast = useCallback((message: string, duration: number = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);


    const fetchCommerces = useCallback(async (): Promise<void> => {
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
    }, []);

    const addCommerce = useCallback(async (commerce: Commerce): Promise<void> => {
        try {
            const newCommerce = await addCommerceApi(commerce);
            setCommerces(prev => [...prev, newCommerce]);
            addCommerceToLocalStorage(newCommerce);
        } catch (error) {
            console.error("Error creando comercio:", error);
        }
    }, []);

    const updateCommerce = useCallback(async (updatedCommerce: Commerce): Promise<void> => {
        try {
            const { _id, name, slug, image, description, address, isActive } = updatedCommerce;
            const editableData = { name, slug, image, description, address, isActive };

            const data: Commerce = await updateCommerceApi(_id, editableData);
            setCommerces(prev => prev.map(commerce => (commerce._id === data._id ? data: commerce)));
            updateCommerceInLocalStorage(data );
        } catch (error) {
            console.error("Error actualizando comercio:", error);
        }
    }, []);

    const deleteCommerce = useCallback(async (commerceId: string): Promise<void> => {
        try {
            await deleteCommerceApi(commerceId);
            setCommerces(prev => prev.filter(commerce => commerce._id !== commerceId));
            deleteCommerceFromLocalStorage(commerceId);
        } catch (error) {
            console.error("Error eliminando comercio:", error);
            showToast("No se pudo eliminar el comercio.");
        }
    }, []);

    useEffect(() => {
        fetchCommerces();
    }, [fetchCommerces]);

    const contextValue = useMemo(() => ({
        commerces, loading, search, setSearch, fetchCommerces, addCommerce, updateCommerce, deleteCommerce
    }), [commerces, loading, search, setSearch, fetchCommerces, addCommerce, updateCommerce, deleteCommerce]);

    return (
        <CommerceContextType.Provider
            value={contextValue}
        >
            {children}
            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </CommerceContextType.Provider>
    );
};