import { useState, useEffect, useMemo, useCallback } from "react";
import { useCommerce } from "../core/commerce/CommerceContext";
import { useProduct } from "../core/products/ProductContext";
import { useNavigate } from "react-router-dom";
import { ProductModal } from "../components/ProductModal";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { ProductCard } from "../components/ProductCard";
import { CommerceCard } from "../components/CommerceCard";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { PageError } from "../components/PageError";
import { useTranslate } from "../translations/locales/useTranslate";

const CommercePage = () => {
    const { commerces } = useCommerce();
    const { products, loadAllProducts } = useProduct();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showProducts, setShowProducts] = useState(true);

    const [modalProduct, setModalProduct] = useState(null);
    const [modalCommerce, setModalCommerce] = useState(null);

    const { t } = useTranslate();

    const categories = useMemo(() => [
        "all", "food", "books-paper", "health-beauty", "sports",
        "pets", "home", "clothing", "footwear", "other"
    ], []);

    const categoryNames = useMemo(() => {
        return {
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
        };
    }, [t]);


    useEffect(() => { loadAllProducts(); }, []);

    const handleSearch = useCallback((value) => {
        setSearch(value);
    }, []);

    const openProductModal = useCallback((product, commerce) => {
        setModalProduct(product);
        setModalCommerce(commerce);
    }, []);

    const navigateToCommerce = useCallback(
        (id) => navigate(`/commerce/${id}`),
        [navigate]
    );

    const filteredProducts = useMemo(() => {
        if (!showProducts) return [];

        const searchLower = search.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(searchLower) &&
            (selectedCategory === "all" || product.category.includes(selectedCategory))
        );
    }, [products, search, selectedCategory, showProducts]);


    const memoProductsCards = useMemo(() => {
        return filteredProducts.map(product => {
            const commerce = commerces.find(commerce => commerce._id === product.commerceId);
            return (
                <ProductCard
                    key={`${product._id}-${product.commerceId}`}
                    product={product}
                    commerce={commerce}
                    onClick={() => openProductModal(product, commerce)}
                />
            );
        })
    }, [filteredProducts, commerces, openProductModal]);

    const memoCommercesCards = useMemo(() => {
        return commerces.map(commerce => (
            <CommerceCard
                key={commerce._id}
                commerce={commerce}
                onClick={() => navigateToCommerce(commerce._id)} />
        ));
    }, [commerces, navigateToCommerce]);

    return (
        <ErrorBoundary
            fallback={
                <PageError
                    title="Error al cargar la página."
                    message="Algo salío mal. No se han podido mostrar los comercios y productos. Por favor, recargue la página."
                    onRetry={() => window.location.reload()}
                />
            }>

            <div className="min-h-screen px-6 py-12 flex flex-col items-center max-w-7xl mx-auto">
                <h1 className="text-center mb-8 text-4xl md:text-5xl font-title font-bold text-primary-dark leading-tight">
                    {t("commerces.title.title_part1")} <span className="text-accent-primary">{t("commerces.title.title_highlight1")}</span> {t("commerces.title.title_part2")} <span className="text-accent-primary">{t("commerces.title.title_highlight2")}</span> {t("commerces.title.title_part3")}
                </h1>

                <SearchBar onSearch={handleSearch} />

                <CategoryFilter
                    categories={categories}
                    categoryName={categoryNames}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setShowProducts={setShowProducts}
                    showProducts={showProducts} />


                {showProducts && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch">
                        {memoProductsCards}
                    </div>
                )}

                {showProducts && filteredProducts.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        {t("commerces.no_products_filter")}
                    </p>
                )}

                <div className="w-full mt-12">
                    <h2 className="text-2xl font-title font-bold text-primary-dark mb-6">
                        {t("commerces.commerces")}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {commerces.length > 0 ? memoCommercesCards : (
                            <p className="col-span-full text-center text-gray-500">
                                {t("commerces.no_commerces")}
                            </p>
                        )}
                    </div>
                </div>

                {modalProduct &&
                    <ProductModal
                        product={modalProduct}
                        commerce={modalCommerce}
                        onClose={() => setModalProduct(null)}
                    />
                }
            </div>
        </ErrorBoundary>
    );
};

export default CommercePage;
