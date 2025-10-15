// FavoriteButton.jsx
import { useFavorites } from "../core/favorites/useFavorites";
import { useAuth } from './../core/auth/useAuth';

export const FavoriteButton = ({ product }) => {
    const { user } = useAuth();
    const { favorites, addFavorite, deleteFavorite } = useFavorites();

    // Comprobamos si el producto ya está en favoritos
    const isFavorite = Array.isArray(favorites) && favorites.some(f => f._id === product._id);

    const toggleFavorite = (event) => {
        event.stopPropagation();
        if (!user?._id) {
            navigate("/login");
            return alert("Debes iniciar sesión")
        }
            

        if (isFavorite) {
            deleteFavorite(user._id, product._id);
        } else {
            addFavorite(user._id, product);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 text-2xl z-10`}
            style={{
                pointerEvents: "auto",   // siempre clicable
            }}
        >
            {isFavorite ? "❤️" : "🤍"}
        </button>
    );
};

