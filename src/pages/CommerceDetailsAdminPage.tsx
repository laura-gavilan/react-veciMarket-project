import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext, type AuthContextType } from "../contexts/AuthContext";
import { useProduct } from "../core/products/ProductContext";
import { useCommerce } from "../core/commerce/CommerceContext";
import { BackButton } from "../components/BackButton";
import { CommerceHeader } from "../components/CommerceHeader";
import { OwnerActions } from "../components/OwnerActions";
import { ScrollToTop } from "../components/ScrollToTop";
import { ProductCardInfo } from "../components/ProductCardInfo";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { PageError } from "../components/PageError";
import { useTranslate } from "../translations/locales/useTranslate";


const CommerceDetailsAdminPage = () => {
    const { commerces, fetchCommerces, deleteCommerce } = useCommerce();
    const context = useContext<AuthContextType | null>(AuthContext);
    if (!context) throw new Error("Error en CommerceDetailsAdminPage");
    const { user } = context;
    const { t } = useTranslate();

    const { products, loadProductsByCommerce, deleteProduct } = useProduct();
    const { commerceId } = useParams<{ commerceId: string }>();
    if (!commerceId) {
        return <PageError title="Comercio no encontrado" message="No se encontró el ID del comercio" onRetry={() => window.location.reload()} />;
    }
    const navigate = useNavigate();
    const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

    const selectedCommerce = useMemo(() =>
        commerces.find(commerce => commerce._id === commerceId),
        [commerces, commerceId]);

    const isOwner: boolean = useMemo(() => {
        if (!user || !selectedCommerce) return false;
        return user._id === selectedCommerce.ownerUserId;
    }, [user, selectedCommerce]);

    useEffect(() => {
        if (commerces.length === 0) fetchCommerces();
    }, [commerces.length, fetchCommerces]);

    useEffect(() => {
        if (selectedCommerce) loadProductsByCommerce(selectedCommerce._id);
    }, [selectedCommerce]);

    useEffect(() => {
        const onScroll = () => setShowScrollTop(window.scrollY > 300);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleDeleteCommerce = useCallback(async () => {
        if (!selectedCommerce) return;
        if (window.confirm("¿Seguro que quieres eliminar este comercio?")) {
            await deleteCommerce(selectedCommerce._id);
            navigate("/admin");
        }
    }, [deleteCommerce, selectedCommerce, navigate]);

    const handleNavigateProduct = useCallback(
        (commerceId: string, productId: string) => {
            navigate(`/admin/commerce/${commerceId}/product/${productId}`);
        },
        [navigate]
    );

    const renderedProducts = useMemo(() => {
        if (!selectedCommerce) return [];

        return products
            .filter(product => product.commerceId === selectedCommerce._id)
            .map(product => (
                <ProductCardInfo
                    key={product._id}
                    product={product}
                    isOwner={isOwner}
                    commerceId={selectedCommerce._id}
                    navigate={handleNavigateProduct}
                    handleDelete={deleteProduct}
                />
            ));
    }, [products, selectedCommerce, isOwner, navigate, deleteProduct]);


    if (!selectedCommerce)
        return (
            <div className="flex items-center justify-center min-h-screen text-primary-dark">
                <h1 className="text-2xl font-semibold">{t("commerces.no_commerces")}</h1>
            </div>
        );

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
            <div className="min-h-screen bg-neutral items-center py-12 px-6 flex flex-col gap-14">
                <BackButton />

                <CommerceHeader commerce={selectedCommerce} />


                {isOwner && (
                    <OwnerActions
                        commerceId={commerceId}
                        onDelete={handleDeleteCommerce}
                    />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {renderedProducts}

                    {showScrollTop && <ScrollToTop />}
                </div>
            </div >
        </ErrorBoundary>

    );
};

export default CommerceDetailsAdminPage;



