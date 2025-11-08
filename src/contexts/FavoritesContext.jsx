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

    useEffect(() => {
        const loadFavorites = async () => {
            if (!user?._id) {
                setFavorites([]);
                return;
            }

            try {
                const data = await getFavoritesApi(user._id);
                const favs = Array.isArray(data.favoritos) ? data.favoritos : [];
                setFavorites(favs);
                saveFavoritesInLocalStorage(user._id, favs);
            } catch (error) {
                console.error("Error cargando favoritos desde API", error);
                const localFavs = getFavoritesFromLocalStorage(user._id);
                setFavorites(localFavs);
            }
        };
        loadFavorites();
    }, [user]);

    const addFavorite = async (product) => {
        if (!user?._id) {
            alert("Debes iniciar sesión para marcar favoritos");
            return;
        }
        if (!product?._id) {
            console.error("Producto inválido", product);
            return;
        }

        try {
            await addFavoriteApi(user._id, product._id);
            setFavorites((prev) => [...prev, product]);
            addFavoriteToLocalStorage(user._id, product);
        } catch (error) {
            console.error("Error en addFavorite", error);
        }
    };

    const deleteFavorite = async (productId) => {
        if (!user?._id) {
            alert("Debes iniciar sesión para eliminar favoritos");
            return;
        }

        try {
            await deleteFavoritesApi(user._id, productId);
            const newFavorites = favorites.filter((favorite) => favorite._id !== productId);
            setFavorites(newFavorites);
            saveFavoritesInLocalStorage(user._id, newFavorites);
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

