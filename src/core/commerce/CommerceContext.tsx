import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { getAllCommercesApi, addCommerceApi, updateCommerceApi, deleteCommerceApi } from "./commerce.api.js";
import { getCommercesFromLocalStorage, saveCommercesInLocalStorage, addCommerceToLocalStorage, updateCommerceInLocalStorage, deleteCommerceFromLocalStorage } from "./commerce.service.js";
import type { CommerceContextProps, ChildrenProps, CommerceProps, EditableDataProps } from "../../types/types";



export const CommerceContext = createContext<CommerceContextProps | null>(null);
export const useCommerce = (): CommerceContextProps => {
    const context = useContext(CommerceContext);
    if (!context) throw new Error("Error en useCommerce");
    return context;
};

export const CommerceProvider = ({ children }: ChildrenProps) => {
    const [commerces, setCommerces] = useState<CommerceProps[]>([]);
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

    const addCommerce = useCallback(async (commerce: CommerceProps): Promise<void> => {
        try {
            const newCommerce = await addCommerceApi(commerce);
            setCommerces(prev => [...prev, newCommerce]);
            addCommerceToLocalStorage(newCommerce);
        } catch (error) {
            console.error("Error creando comercio:", error);
        }
    }, []);

    const updateCommerce = useCallback(async (updatedCommerce: CommerceProps): Promise<void> => {
        try {
            const { _id, name, slug, image, description, address, isActive } = updatedCommerce.commerce;
            const editableData: EditableDataProps = { name, slug, image, description, address, isActive };

            const data = await updateCommerceApi(_id, editableData);
            setCommerces(prev => prev.map(commerce => (commerce.commerce._id === data._id ? { ...commerce, commerce: data } : commerce)));
            updateCommerceInLocalStorage({ ...updatedCommerce, commerce: data });
        } catch (error) {
            console.error("Error actualizando comercio:", error);
        }
    }, []);

    const deleteCommerce = useCallback(async (commerceId: string): Promise<void> => {
        try {
            await deleteCommerceApi(commerceId);
            setCommerces(prev => prev.filter(commerce => commerce.commerce._id !== commerceId));
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
        <CommerceContext.Provider
            value={contextValue}
        >
            {children}
            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </CommerceContext.Provider>
    );
};