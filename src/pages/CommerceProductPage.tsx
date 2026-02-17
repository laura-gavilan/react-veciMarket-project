import { useParams } from "react-router-dom";
import { useCommerce } from "../core/commerce/CommerceContext";
import { useProduct } from "../core/products/ProductContext";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useMemo, useState } from "react";
import { ProductModal } from "../components/ProductModal";
import { CommerceHeader } from "../components/CommerceHeader";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { PageError } from "../components/PageError";
import { useTranslate } from "../translations/locales/useTranslate";
import type { ProductType } from "../components/CartItems";
import type { Commerce } from "../types/types";

const CommerceProductPage = () => {
    const { commerceId } = useParams<{commerceId: string}>();
    const { commerces, fetchCommerces } = useCommerce();
    const { products, loadAllProducts } = useProduct();
    const [loading, setLoading] = useState<boolean>(true);
    const [modalProduct, setModalProduct] = useState<ProductType | null>(null);
    const { t } = useTranslate();


    useEffect(() => {
        const loadData = async () => {
            if (commerces.length === 0) await fetchCommerces();
            if (products.length === 0) await loadAllProducts();
            setLoading(false);
        };
        loadData();
    }, [commerces.length,products.length , fetchCommerces, loadAllProducts]);


    const commerce: Commerce | undefined = useMemo(() =>
        commerces.find(commerce => commerce._id === commerceId
        ), [commerces, commerceId]);


    const commerceProducts: ProductType[] = useMemo(
        () => products.filter(product => product.commerceId === commerceId
        ), [products, commerceId]);

    const memoProductsCards = useMemo(() => {
        return commerceProducts.map(product => (
            <ProductCard
                key={product._id}
                product={product}
                commerce={commerce}
                onClick={() => setModalProduct(product)}
            />
        ))
    }, [commerceProducts, commerce, setModalProduct]);

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">{t("products.loading")}</p>;
    }


    return (
        <ErrorBoundary
            fallback={
                <PageError
                    title="Error al cargar tus comercios"
                    message="No se han cargado los comercios.Por favor, vuelve a reintentarlo."
                    onRetry={() => window.location.reload()}
                />

            }
        >
            <div className="container mx-auto p-6 space-y-8">
                {commerce && <CommerceHeader commerce={commerce} />}

                <div>
                    <h2 className="text-2xl font-title font-bold text-primary-dark mb-4">
                        Productos de {commerce?.name}
                    </h2>
                    {commerceProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {memoProductsCards}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">{t("products.no_products")}</p>
                    )}
                </div>

                {modalProduct && (
                    <ProductModal
                        product={modalProduct}
                        commerce={commerce ?? null}
                        onClose={() => setModalProduct(null)}
                    />
                )}
            </div>
        </ErrorBoundary>
    );
};

export default CommerceProductPage;
