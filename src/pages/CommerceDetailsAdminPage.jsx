import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useProduct } from "../core/products/ProductContext";
import { useCommerce } from "../core/commerce/CommerceContext";
import { BackButton } from "../components/BackButton";
import { CommerceHeader } from "../components/CommerceHeader";
import { OwnerActions } from "../components/OwnerActions";
import { ProductsSection } from "../components/ProductsSection";
import { ScrollToTop } from "../components/ScrollToTop";
import { ProductCardInfo } from "../components/ProductCardInfo";

export const CommerceDetailsAdminPage = () => {
    const { commerces, fetchCommerces, deleteCommerce } = useCommerce();
    const { user } = useContext(AuthContext);
    const { products, loadProductsByCommerce, deleteProduct } = useProduct();
    const { commerceId } = useParams();
    const navigate = useNavigate();
    const [showScrollTop, setShowScrollTop] = useState(false);

    const selectedCommerce = commerces.find(commerce => commerce._id === commerceId);
    const isOwner = user?._id === selectedCommerce?.ownerUserId?._id;

    useEffect(() => {
        if (commerces.length === 0) fetchCommerces();
    }, []);

    useEffect(() => {
        if (selectedCommerce) loadProductsByCommerce(selectedCommerce._id);
    }, [selectedCommerce]);

    useEffect(() => {
        const onScroll = () => setShowScrollTop(window.scrollY > 300);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const refreshProducts = () => {
        if (selectedCommerce) loadProductsByCommerce(selectedCommerce._id);
    };

    if (!selectedCommerce)
        return (
            <div className="flex items-center justify-center min-h-screen text-primary-dark">
                <h1 className="text-2xl font-semibold">No se encuentra el comercio</h1>
            </div>
        );

    return (
        <div className="min-h-screen bg-neutral py-12 px-6 flex flex-col gap-14">

            <BackButton />

            <CommerceHeader commerce={selectedCommerce} />

            {isOwner && (
                <OwnerActions
                    commerceId={commerceId}
                    onDelete={async () => {
                        if (window.confirm("¿Seguro que quieres eliminar este comercio?")) {
                            await deleteCommerce(selectedCommerce._id);
                            navigate("/admin");
                        }
                    }}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products
                    .filter(product => product.commerceId === selectedCommerce._id)
                    .map(product => (
                        <ProductCardInfo
                            key={product._id}
                            product={product}
                            isOwner={isOwner}
                            commerceId={selectedCommerce._id}
                            navigate={navigate}
                            handleDelete={deleteProduct}
                        />
                    ))}

                {showScrollTop && <ScrollToTop />}
            </div>
        </div>
    );
};



