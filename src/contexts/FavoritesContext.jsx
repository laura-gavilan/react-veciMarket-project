import { createContext, useContext, useState } from "react";
import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    saveFavoritesInLocalStorage,
} from "../core/favorites/favorites.service";
import {
    addFavoriteApi,
    deleteFavoritesApi,
    getFavoritesApi,
} from "../core/favorites/favorites.api";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const data = getFavoritesFromLocalStorage();
        return Array.isArray(data) ? data : [];
    });

    const loadFavorites = async (userId) => {
        try {
            const data = await getFavoritesApi(userId);
            const favs = Array.isArray(data.favoritos) ? data.favoritos : [];
            setFavorites(favs);
            saveFavoritesInLocalStorage(favs);
        } catch (error) {
            console.error("Error en loadFavorites", error);
        }
    };

    const addFavorite = async (userId, product) => {
        try {
            await addFavoriteApi(userId, product._id);
            setFavorites((prev) => [...prev, product]);
            addFavoriteToLocalStorage(product);
        } catch (error) {
            console.error("Error en addFavorite", error);
        }
    };

    const deleteFavorite = async (userId, productId) => {
        try {
            await deleteFavoritesApi(userId, productId);
            const newFavorites = favorites.filter((f) => f._id !== productId);
            setFavorites(newFavorites);
            saveFavoritesInLocalStorage(newFavorites);
        } catch (error) {
            console.error("Error en deleteFavorite", error);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, loadFavorites, addFavorite, deleteFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
