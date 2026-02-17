import { useFavorites } from "../core/favorites/useFavorites";
import type { Product } from "./ProductCard";



export type FavoriteButtonProps = {
    product: Product;
}

export const FavoriteButton = ({ product }: FavoriteButtonProps) => {
    const { favorites, addFavorite, deleteFavorite } = useFavorites();
    const isFavorite: boolean = favorites.some((fav: Product)=> fav._id === product._id);


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

