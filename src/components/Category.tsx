import { memo, useCallback, useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../core/http/axios";
import { ProductCard, type Product } from "./ProductCard";
import { useTranslate } from "../translations/locales/useTranslate";

export interface CategoryProps {
    products: Product[];
    refreshProducts: () => void;
    ownerId: string | null;
    commerceId: string;
};

export type CategoryKey =
    | "all"
    | "food"
    | "books-paper"
    | "health-beauty"
    | "sports"
    | "pets"
    | "home"
    | "clothing"
    | "footwear"
    | "other";


export type CategoryLabels = Record<CategoryKey, string>;


export const Category = memo<CategoryProps>(({ products, refreshProducts, ownerId, commerceId }) => {
    const auth = useContext(AuthContext);
    if (!auth) return null;
    const { user } = auth;

    const isOwner = useMemo(() => user?._id === ownerId, [user?._id, ownerId]);
    const { t } = useTranslate();

    const categories = useMemo(() => {
        const categoriesMap: { [key: string]: Product[] } = {};
        products.forEach(product => {
            const category = product.category?.[0] ?? "other";
            if (!categoriesMap?.[category]) categoriesMap[category] = [];
            categoriesMap[category].push(product);
        });
        return categoriesMap;
    }, [products]);

    const handleDelete = useCallback(async (productId: string) => {
        console.log("Renderizado eliminar producto")
        if (!window.confirm("¿Eliminar producto?")) return;
        await api.delete(`/products/${productId}`);
        refreshProducts?.();
    }, [refreshProducts]);


    const categoryNames = useMemo<CategoryLabels>(() => ({
        all: t("categories.all"),
        food: t("categories.food"),
        "books-paper": t("categories.books-paper"),
        "health-beauty": t("categories.health-beauty"),
        sports: t("categories.sports"),
        pets: t("categories.pets"),
        home: t("categories.home"),
        clothing: t("categories.clothing"),
        footwear: t("categories.footwear"),
        other: t("categories.other"),
    }), [t]);

    const categorySection = useMemo(() => {
        return (Object.keys(categories) as CategoryKey[]).map(category => (
            <div key={category} className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark border-b-2 border-primary-light inline-block pb-1">
                    {categoryNames[category] || category}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    {categories[category].map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            isOwner={isOwner}
                            commerce={{ name: commerceId }}
                            handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        ));
    }, [categories, categoryNames, isOwner, commerceId, handleDelete]);

    return (
        <div className="flex flex-col gap-14">
            {categorySection}
        </div >
    );
});


