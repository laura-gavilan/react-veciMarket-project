import { memo, useMemo } from "react";
import { Category } from "./Category";
import { useTranslate } from "../translations/locales/useTranslate";
import type { Product } from "./ProductCard";
import type { Commerce } from "../types/types";


export type ProductsSectionProps = {
    products: Product[];
    selectedCommerce: Commerce | null;
    refreshProducts: () => void;
};


export const ProductsSection = memo(({ products, selectedCommerce, refreshProducts }: ProductsSectionProps) => {
    if (!selectedCommerce) return null;
    const { t } = useTranslate();

    const filteredProducts = useMemo(() =>
        products.filter(product => product.commerceId === selectedCommerce._id),
        [products, selectedCommerce._id]
    );

    return (
        <div className="bg-white rounded-3xl shadow-lg p-10 border border-primary-light">
            <div className="flex justify-center items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark border-b-2 border-primary-light pb-2">
                    {t("products.products_commerce")}
                </h2>
            </div>

            <Category
                products={filteredProducts}
                ownerId={selectedCommerce.ownerUserId || null}
                refreshProducts={refreshProducts}
                commerceId={selectedCommerce._id}
            />
        </div>
    );
});