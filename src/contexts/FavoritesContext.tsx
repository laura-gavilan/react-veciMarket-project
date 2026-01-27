import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    saveFavoritesInLocalStorage,
} from "../core/favorites/favorites.service";
import { useAuth } from "../core/auth/useAuth";
import { addFavoriteApi, deleteFavoritesApi, getFavoritesApi } from "../core/favorites/favorites.api";
import { useNavigate } from "react-router-dom";
import type { ChildrenProps, Product, UseFavoritesProps } from "../types/types";

export const FavoritesContext = createContext<UseFavoritesProps | null>(null);

export const FavoritesProvider = ({ children }: ChildrenProps) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<Product[]>([]);
    const userId = user?._id;
    const navigate = useNavigate();
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                if (!userId) {
                    setFavorites([]);
                    return;
                }

                const data = await getFavoritesApi(userId);
                const serverFavs = Array.isArray(data.favoritos) ? data.favoritos : [];
                setFavorites(serverFavs);
                saveFavoritesInLocalStorage(userId, serverFavs);
            } catch (error) {
                console.error("Error cargando favoritos desde API", error);
                const localFavs = getFavoritesFromLocalStorage(userId);
                setFavorites(localFavs);
            }
        };
        loadFavorites();
    }, [userId]);

    const showToast = useCallback((message: string, duration: number = 2000) => {
        setToast(message);
        const timeout = setTimeout(() => setToast(null), duration);
        return () => clearTimeout(timeout);
    }, []);


    const addFavorite = useCallback(async (product: Product) => {
        if (!userId) {
            showToast("Debes iniciar sesión para ver tu wishlist.");
            navigate("/login");
            return;
        };

        if (!product?._id) {
            console.error("Producto inválido", product);
            return;
        };

        try {
            await addFavoriteApi(userId, product._id);
            setFavorites((prev) => [...prev, product]);
            addFavoriteToLocalStorage(userId, product);
            showToast(`${product.name} añadido a favoritos`);
        } catch (error) {
            console.error("Error en addFavorite", error);
            showToast("No se pudo añadir a favoritos");
        }
    }, [userId, navigate, showToast]);


    const deleteFavorite = useCallback(async (productId: string) => {
        if (!userId) {
            return;
        };

        try {
            await deleteFavoritesApi(userId, productId);
            const newFavorites = favorites.filter((favorite) => favorite._id !== productId);
            setFavorites(newFavorites);
            saveFavoritesInLocalStorage(userId, newFavorites);
            showToast("Favorito eliminado");
        } catch (error) {
            console.error("Error en deleteFavorite", error);
            showToast("No se pudo eliminar el favorito");
        }
    }, [userId, showToast]);


    const isFavorite = useCallback((productId: string): boolean => {
        return favorites.some((favorite) => favorite._id === productId);
    }, [favorites]);

    const toggleFavorite = useCallback(async (product: Product) => {
        if (!product?._id) return;

        if (isFavorite(product._id)) {
            await deleteFavorite(product._id);
        } else {
            await addFavorite(product);
        }
    }, [isFavorite, addFavorite, deleteFavorite]);

    const totalFavorites = favorites.length;

    const contextValue: UseFavoritesProps = useMemo(() => ({ favorites, addFavorite, deleteFavorite, isFavorite, toggleFavorite, totalFavorites }), [favorites, addFavorite, deleteFavorite, isFavorite, toggleFavorite, totalFavorites]);

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50">
                    {toast}
                </div>
            )}
        </FavoritesContext.Provider>
    );
};

