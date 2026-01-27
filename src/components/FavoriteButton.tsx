import { useFavorites } from "../core/favorites/useFavorites";
import type { FavoriteButtonProps, Product } from "../types/types";


export const FavoriteButton = ({ product }: FavoriteButtonProps) => {
    const { favorites, addFavorite, deleteFavorite } = useFavorites();
    const isFavorite: boolean = favorites.some((favorite: Product)=> favorite._id === product._id);


    const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (isFavorite) {
            deleteFavorite(product._id);
        } else {
            addFavorite(product);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 text-2xl z-10`}
            style={{
                pointerEvents: "auto",
            }}
        >
            {isFavorite ? "❤️" : "🤍"}
        </button>
    );
};

