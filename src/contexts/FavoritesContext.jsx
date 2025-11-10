import { createContext, useContext, useEffect, useState } from "react";
import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    saveFavoritesInLocalStorage,
} from "../core/favorites/favorites.service";
import { useAuth } from "../core/auth/useAuth";
import { addFavoriteApi, deleteFavoritesApi, getFavoritesApi } from "../core/favorites/favorites.api";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const userId = user?._id;

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                if (!userId) {
                    const localFavs = getFavoritesFromLocalStorage(null);
                    setFavorites(localFavs);
                    return;
                }


                const data = await getFavoritesApi(userId);
                const serverFavs = Array.isArray(data.favoritos) ? data.favoritos : [];
                const guestFavs = getFavoritesFromLocalStorage(null);

                const merged = [
                    ...serverFavs,
                    ...guestFavs.filter(guest => !serverFavs.some(server => server._id === guest._id)),
                ];

                setFavorites(merged);
                saveFavoritesInLocalStorage(userId, merged);
                saveFavoritesInLocalStorage(null, []);
            } catch (error) {
                console.error("Error cargando favoritos desde API", error);
                const localFavs = getFavoritesFromLocalStorage(userId);
                setFavorites(localFavs);
            }
        };
        loadFavorites();
    }, [userId]);

    const addFavorite = async (product) => {
        if (!product?._id) {
            console.error("Producto inválido", product);
            return;
        }

        if (!userId) {
            addFavoriteToLocalStorage(null, product);
            setFavorites(prev => [...prev, product]);
            return;
        }

        try {
            await addFavoriteApi(userId, product._id);
            setFavorites((prev) => [...prev, product]);
            addFavoriteToLocalStorage(userId, product);
        } catch (error) {
            console.error("Error en addFavorite", error);
        }
    };

    const deleteFavorite = async (productId) => {
        if (!userId) {
            deleteFavoriteFromLocalStorage(null, productId);
            setFavorites(prev => prev.filter(f => f._id !== productId));
            return;
        }

        try {
            await deleteFavoritesApi(userId, productId);
            const newFavorites = favorites.filter((favorite) => favorite._id !== productId);
            setFavorites(newFavorites);
            saveFavoritesInLocalStorage(userId, newFavorites);
        } catch (error) {
            console.error("Error en deleteFavorite", error);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, deleteFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

