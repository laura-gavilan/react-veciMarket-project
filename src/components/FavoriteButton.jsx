import { useFavorites } from "../core/favorites/useFavorites";

export const FavoriteButton = ({ product }) => {
    const { favorites, addFavorite, deleteFavorite } = useFavorites();
    const isFavorite = favorites.some(favorite => favorite._id === product._id);


    const toggleFavorite = (event) => {
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

