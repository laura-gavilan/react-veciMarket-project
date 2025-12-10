import { memo, useMemo } from "react";
import { Category } from "./Category";

export const ProductsSection = memo(({ products, selectedCommerce, refreshProducts }) => {
    if (!selectedCommerce) return null;

    const filteredProducts = useMemo(() =>
        products.filter(product => product.commerceId === selectedCommerce._id),
        [products, selectedCommerce._id]
    );

    return (
        <div className="bg-white rounded-3xl shadow-lg p-10 border border-primary-light">
            <div className="flex justify-center items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark border-b-2 border-primary-light pb-2">
                    Productos del Comercio
                </h2>
            </div>

            <Category
                products={filteredProducts}
                ownerId={selectedCommerce.ownerUserId?._id || null}
                refreshProducts={refreshProducts}
                commerceId={selectedCommerce._id}
            />
        </div>
    );
});