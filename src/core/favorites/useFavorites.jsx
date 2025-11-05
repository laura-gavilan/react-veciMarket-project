import { useContext } from "react";
import { FavoritesContext } from "../../contexts/FavoritesContext";

export const useFavorites = () => {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("Error");
    }

    const { favorites, addFavorite, deleteFavorite } = context;

    const isFavorite = (productId) => {
        if (!productId) return false;

        if (productId) return favorites.some((fav) => fav.id === productId);
    };

    const toggleFavorite = async (product) => {
        if (!product?._id) {
            console.error("Producto inválido", product);
            return;
        }

        try {
            if (isFavorite(product._id)) {
                await deleteFavorite(product._id);
            } else {
                await addFavorite(product);
            }
        } catch (error) {
            console.error("Error al alternar favorito", error);
        }
    };

    const totalFavorites = favorites.lenght;

    return { favorites, addFavorite, deleteFavorite, isFavorite, toggleFavorite, totalFavorites };
};