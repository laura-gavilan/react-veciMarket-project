import { useFavorites } from "../core/favorites/useFavorites";
import { FavoriteButton } from "../components/FavoriteButton.jsx";
import { CartButton } from "../components/CartButton.jsx";
import { useMemo } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary.jsx";
import { PageError } from "../components/PageError.jsx";

export const FavoritesPage = () => {
    const { favorites } = useFavorites();
    const hasFavorites = Array.isArray(favorites) && favorites.length > 0;

    const favoriteCards = useMemo(() => {
        return favorites.map((product, index) => (
                        <div
                            key={product._id || `fav-${index}`}
                            className="relative bg-white border border-primary-light)] rounded-3xl shadow-md p-4  flex flex-col items-center text-center justify-between h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {product.images?.[0] && (
                                <img
                                    src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                                    alt={product.name}
                                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-2xl mb-4 transition-transform duration-300 hover:scale-105"
                                />
                            )}

                            <h2 className="font-title font-semibold text-lg md:text-xl text-primary-dark">
                                {product.name}
                            </h2>
                            <p className="text-primary-dark mt-1 font-medium">{product.price} €</p>

                            <div className="mt-3 flex gap-2 justify-center">
                                <FavoriteButton product={product} />
                                <CartButton product={product} />
                            </div>
                        </div>
                    ))
    }, [favorites]);

    return (
        <ErrorBoundary
                    fallback={
                        <PageError
                            title="Error al cargar tus favoritos."
                            message="No se han cargado los favoritos. Por favor, vuelve a reintentarlo."
                            onRetry={() => window.location.reload()}
                        />
            
                    }
                >
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-primary text-center">
                Mis productos favoritos
            </h1>

            {!hasFavorites && (
                <p className="text-center text-gray-500 mt-4">
                    No tienes productos favoritos.
                </p>
            )}

            {hasFavorites && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favoriteCards}
                </div>
            )}
        </div>
        </ErrorBoundary>
    );
};

