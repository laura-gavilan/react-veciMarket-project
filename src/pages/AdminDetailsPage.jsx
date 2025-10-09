import { useContext, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
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

    const selectedCommerce = commerces.find((commerce) => commerce._id === commerceId);

    useEffect(() => {
        if (commerces.length === 0) fetchCommerces();
    }, []);

    useEffect(() => {
        if (selectedCommerce) loadProductsByCommerce(selectedCommerce._id);
    }, [selectedCommerce]);

    if (!selectedCommerce)
        return (
            <div className="flex items-center justify-center min-h-screen text-[var(--color-burdeos-darker)]">
                <h1 className="text-2xl font-semibold">No se encuentra el comercio</h1>
            </div>
        );

    const isOwner = user?._id === selectedCommerce?.ownerUserId?._id;
    const refreshProducts = () => loadProductsByCommerce(selectedCommerce._id);

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
            {/* Botón Volver */}
            <button
                onClick={() => navigate(-1)}
                className="btn-secondary self-start"
            >
                ← Volver
            </button>

            {/* Información del Comercio */}
            <div className="card-form relative overflow-hidden">
                <h1 className="text-h2 font-title font-semibold text-[var(--color-burdeos-dark)] mb-4">
                    {selectedCommerce.name}
                </h1>
                <p className="text-[var(--color-burdeos-darker)] text-base/[150%] mb-6">
                    {selectedCommerce.description}
                </p>

                {/* Efectos decorativos */}
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[var(--color-mostaza-pastel)]/20 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[var(--color-mostaza-pastel)]/10 blur-3xl pointer-events-none"></div>

                {isOwner && (
                    <div className="flex flex-wrap gap-4 mt-6">
                        <button
                            onClick={() => navigate("edit")}
                            className="btn-primary"
                        >
                            Editar Comercio
                        </button>
                        <button
                            onClick={() => navigate("create")}
                            className="btn-primary"
                        >
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

            {/* Productos */}
            <Category
                products={products}
                commerceId={selectedCommerce._id}
                deleteProduct={deleteProduct}
                refreshProducts={refreshProducts}
            />

            {/* Rutas hijas */}
            <Outlet context={{ refreshProducts, selectedCommerce }} />
        </div>
    );
};

