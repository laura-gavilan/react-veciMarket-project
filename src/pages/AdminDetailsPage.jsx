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

    const selectedCommerce = commerces.find(commerce => commerce._id === commerceId);
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
            <div className="flex items-center justify-center min-h-screen text-primary-dark">
                <h1 className="text-2xl font-semibold">No se encuentra el comercio</h1>
            </div>
        );

    return (
        <div className="min-h-screen bg-neutral py-12 px-6 flex flex-col gap-14">
            <button
                onClick={() => navigate(-1)}
                className="self-start px-6 py-2 bg-primary-dark text-accent-primary-light rounded-full shadow-md hover:bg-primary-light hover:scale-105 transition-all font-semibold"
            >
                ← Volver
            </button>


            <div className="bg-white rounded-3xl shadow-lg p-10 border border-primary-light hover:shadow-2xl transition-all duration-300">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">
                    {selectedCommerce.name}
                </h1>

                <p className="text-primary-dark text-lg leading-relaxed mb-8">
                    {selectedCommerce.description}
                </p>

                {isOwner && (
                    <div className="flex flex-wrap gap-4 mt-4">
                        <button
                            onClick={() => navigate(`/admin/commerce/${commerceId}/edit`)}
                            className="px-5 py-2 rounded-full font-semibold bg-primary-dark text-accent-primary-light hover:bg-primary-light hover:scale-105 transition-all shadow-md"
                        >
                            ✏️ Editar Comercio
                        </button>

                        <button
                            onClick={() => navigate(`/admin/commerce/${commerceId}/create`)}
                            className="px-5 py-2 rounded-full font-semibold bg-accent-primary-light text-primary-dark hover:bg-accent-primary hover:scale-105 transition-all shadow-md"
                        >
                            ➕ Crear Producto
                        </button>

                        <button
                            onClick={async () => {
                                if (window.confirm("¿Seguro que quieres eliminar este comercio?")) {
                                    await deleteCommerce(selectedCommerce._id);
                                    navigate("/admin");
                                }
                            }}
                            className="px-5 py-2 rounded-full font-semibold bg-primary-light text-white hover:bg-primary-dark hover:scale-105 transition-all shadow-md"
                        >
                            🗑️ Eliminar Comercio
                        </button>
                    </div>
                )}
            </div>


            <div className="bg-white rounded-3xl shadow-lg p-10 border border-primary-light">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-dark border-b-2 border-primary-light pb-2">
                        Productos del Comercio
                    </h2>
                </div>

                <Category
                    products={products.filter(p => p.commerceId === selectedCommerce._id)}
                    ownerId={selectedCommerce.ownerUserId?._id}
                    refreshProducts={refreshProducts}
                    commerceId={selectedCommerce._id}
                />
            </div>


            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-accent-primary-light text-primary-dark p-3 rounded-full shadow-lg hover:scale-110 hover:bg-accent-primary transition-transform duration-300 z-50"
                    title="Volver arriba"
                >
                    ↑
                </button>
            )}
        </div>
    );
};


