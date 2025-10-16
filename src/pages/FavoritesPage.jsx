import { useEffect } from "react";
import { useFavorites } from "../core/favorites/useFavorites";
import { useAuth } from "../core/auth/useAuth";
import { FavoriteButton } from "../components/FavoriteButton.jsx"; 

export const FavoritesPage = () => {
    const { user } = useAuth();
    const { favorites, loadFavorites } = useFavorites();

    useEffect(() => {
        if (user?._id) {
            loadFavorites(user._id);
        }
    }, [user]);

    if (!user)
        return <p className="text-center mt-10 text-[var(--color-burdeos-dark)] font-sans text-lg">
            Debes iniciar sesión para ver tus favoritos
        </p>;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-[var(--color-burdeos-dark)] text-center">
                Mis productos favoritos
            </h1>

            {favorites.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">
                    No tienes productos favoritos.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((product) => (
                        <div
                            key={product._id}
                            className="relative bg-white border border-[var(--color-burdeos-light)] rounded-3xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {product.images?.[0] && (
                                <img
                                    src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                                    alt={product.name}
                                    className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-2xl mb-4 transition-transform duration-300 hover:scale-105"
                                />
                            )}

                            <h2 className="font-title font-semibold text-lg md:text-xl text-[var(--color-burdeos-dark)]">
                                {product.name}
                            </h2>
                            <p className="text-[var(--color-burdeos-darker)] mt-1 font-medium">{product.price} €</p>

                            <div className="mt-2">
                                <FavoriteButton product={product} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

