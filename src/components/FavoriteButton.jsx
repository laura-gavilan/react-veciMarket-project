import { useNavigate } from "react-router-dom";
import { useFavorites } from "../core/favorites/useFavorites";
import { useAuth } from './../core/auth/useAuth';

export const FavoriteButton = ({ product }) => {
    const { user } = useAuth();
    const { favorites, addFavorite, deleteFavorite } = useFavorites();
    const isFavorite = Array.isArray(favorites) && favorites.some(f => f._id === product._id);
    const navigate = useNavigate();

    const toggleFavorite = (event) => {
        event.stopPropagation();
        if (!user?._id) {
            navigate("/login");
            return alert("Debes iniciar sesión")
        }
            

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

