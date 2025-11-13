import { createContext, useContext, useEffect, useState } from "react";
import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    saveFavoritesInLocalStorage,
    deleteFavoriteFromLocalStorage,
} from "../core/favorites/favorites.service";
import { useAuth } from "../core/auth/useAuth";
import { addFavoriteApi, deleteFavoritesApi, getFavoritesApi } from "../core/favorites/favorites.api";
import { useNavigate } from "react-router-dom";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const userId = user?._id;
    const navigate = useNavigate();

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


    const addFavorite = async (product) => {
        if (!userId) {
            alert("Debes iniciar sesión para ver tu wishlist.");
            navigate("/login");
            return;
        }

        if (!product?._id) {
            console.error("Producto inválido", product);
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

