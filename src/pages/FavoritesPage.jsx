import { useEffect } from "react";
import { useFavorites } from "../core/favorites/useFavorites";
import { useAuth } from "../core/auth/useAuth";
import { FavoriteButton } from "../components/FavoriteButton.jsx"; // reutilizamos el botón de corazón

export const FavoritesPage = () => {
    const { user } = useAuth();
    const { favorites, loadFavorites } = useFavorites();

    useEffect(() => {
        if (user?._id) {
            loadFavorites(user._id);
        }
    }, [user]);

    if (!user) return <p>Debes iniciar sesión para ver tus favoritos</p>;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
                Mis productos favoritos
            </h1>

            {favorites.length === 0 ? (
                <p className="text-center text-gray-500">No tienes productos favoritos.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((product) => (
                        <div
                            key={product._id}
                            className="relative bg-white border border-gray-200 rounded-3xl shadow-md p-5 flex flex-col items-center text-center"
                        >
                            {product.images?.[0] && (
                                <img
                                    src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                                    alt={product.name}
                                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg mb-4"
                                />
                            )}

                            <h2 className="font-semibold text-lg md:text-xl">{product.name}</h2>
                            <p className="text-gray-700 mt-1 font-medium">{product.price} €</p>

                            {/* Botón de favorito para eliminar */}
                            <FavoriteButton product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
