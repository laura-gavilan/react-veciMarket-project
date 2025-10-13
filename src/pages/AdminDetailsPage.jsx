import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useProduct } from "../core/products/ProductContext";
import { useCommerce } from "../core/commerce/CommerceContext";
import { Category } from "../components/Category";

export const AdminDetailPage = () => {
    const { commerces, fetchCommerces, deleteCommerce } = useCommerce();
    const { user } = useContext(AuthContext);
    const { products, loadProductsByCommerce, deleteProduct } = useProduct();
    const { commerceId } = useParams();
    const navigate = useNavigate();
    const [showScrollTop, setShowScrollTop] = useState(false);

    const selectedCommerce = commerces.find(c => c._id === commerceId);
    const isOwner = user?._id === selectedCommerce?.ownerUserId?._id;

    useEffect(() => {
        if (commerces.length === 0) fetchCommerces();
    }, []);

    useEffect(() => {
        if (selectedCommerce) loadProductsByCommerce(selectedCommerce._id);
    }, [selectedCommerce]);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const refreshProducts = () => {
        if (selectedCommerce) loadProductsByCommerce(selectedCommerce._id);
    };

    if (!selectedCommerce)
        return (
            <div className="flex items-center justify-center min-h-screen text-[var(--color-burdeos-darker)]">
                <h1 className="text-2xl font-semibold">No se encuentra el comercio</h1>
            </div>
        );

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
            {/* Botón Volver */}
            <button onClick={() => navigate(-1)} className="btn-secondary self-start">
                ← Volver
            </button>

            {/* Información del Comercio */}
            <div className="card-form relative overflow-hidden p-6 rounded-2xl shadow-lg bg-[var(--color-gray-warm)]">
                <h1 className="text-h2 font-title font-semibold text-[var(--color-burdeos-dark)] mb-4">
                    {selectedCommerce.name}
                </h1>
                <p className="text-[var(--color-burdeos-darker)] text-base/[150%] mb-6">
                    {selectedCommerce.description}
                </p>

                {isOwner && (
                    <div className="flex flex-wrap gap-4 mt-6">
                        <button onClick={() => navigate(`/admin/commerce/${commerceId}/edit`)} className="btn-primary">
                            Editar Comercio
                        </button>
                        <button onClick={() => navigate(`/admin/commerce/${commerceId}/create`)} className="btn-primary">
                            Crear Producto
                        </button>
                        <button
                            onClick={async () => {
                                if (window.confirm("¿Seguro que quieres eliminar este comercio?")) {
                                    await deleteCommerce(selectedCommerce._id);
                                    navigate("/admin");
                                }
                            }}
                            className="btn-secondary"
                        >
                            Eliminar Comercio
                        </button>
                    </div>
                )}
            </div>

            {/* Productos con categorías */}
            <Category
                products={products.filter(p => p.commerceId === selectedCommerce._id)}
                ownerId={selectedCommerce.ownerUserId?._id}
                refreshProducts={refreshProducts}
                commerceId={selectedCommerce._id} // <- PASAMOS EL COMMERCE ID
            />

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-[var(--color-mostaza)] text-[var(--color-burdeos-dark)] p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
                >
                    ↑
                </button>
            )}
        </div>
    );
};

