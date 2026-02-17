import { memo, useCallback } from "react";
import { CartButton } from "./CartButton";
import { FavoriteButton } from "./FavoriteButton";
import { useTranslate } from "../translations/locales/useTranslate";

export interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    image?: string[];
    images?: string[];
    // newFavorites?: Product[];
    category?: string;
    commerceId?: string;
};

export type ProductCardProps = {
    product: Product,
    commerce?: { name: string };
    onClick?: () => void;
    isOwner?: boolean;
    handleDelete?: (productId: string) => void;
};

export const ProductCard = memo<ProductCardProps>(({ product, commerce, onClick, isOwner, handleDelete }) => {
    let image: string | null = null;
    const { t } = useTranslate();

    if (product.images?.[0]) {
        const img = product.images[0];
        if (img.startsWith("http") || img.startsWith("/products/")) {
            image = img;
        } else {
            image = `/products/${img}`;
        }
    };

    const handleDeleteClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (handleDelete) {
            handleDelete(product._id);
        }
    }, [handleDelete, product._id]);


    return (
        <div
            className="group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer p-5 flex flex-col justify-between text-center hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 h-full"
            onClick={onClick}
        >
            {image && (
                <div className="w-full h-44 overflow-hidden">
                    <img
                        src={image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            <h3 className="text-lg md:text-xl font-title font-semibold text-primary-dark mt-2">
                {product.name}
            </h3>
            <p className="text-primary-dark mt-1 font-medium">{product.price} €</p>
            {commerce && (
                <p className="text-gray-500 text-sm mt-1 truncate">{t("commerces.commerces")}: {commerce.name}</p>
            )}

            <FavoriteButton product={product} />

            <div className="flex justify-center">
                <CartButton product={product} small />

                {isOwner && (
                    <button
                        onClick={handleDeleteClick}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl text-sm"
                    >
                        {t("components.delete")}
                    </button>
                )}
            </div>
        </div>
    );
});