import { useCallback, useContext, useMemo } from "react";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import type { Product, UseFavoritesProps  } from "../../types/types";


export const useFavorites = (): UseFavoritesProps => {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
    }

    const { favorites, addFavorite, deleteFavorite } = context;

    const isFavorite = useCallback((productId: string): boolean => {
        return favorites.some((favorite: Product) => favorite._id === productId);
    }, [favorites]);


    const toggleFavorite = useCallback(async (product: Product): Promise<void> => {
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
    }, [isFavorite, addFavorite, deleteFavorite]);

    const totalFavorites = useMemo(() => favorites.length, [favorites]);

    return { favorites, addFavorite, deleteFavorite, isFavorite, toggleFavorite, totalFavorites };
};