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
            <div className="p-6 text-center text-gray-500">
                <h1 className="text-2xl font-semibold">No se encuentra el comercio</h1>
            </div>
        );

    const isOwner = user?._id === selectedCommerce?.ownerUserId?._id;
    const refreshProducts = () => loadProductsByCommerce(selectedCommerce._id);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">
            <button
                onClick={() => navigate(-1)}
                className="self-start px-5 py-2 bg-white border border-gray-300 rounded-full shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
                ← Volver
            </button>

            <div className="relative bg-gradient-to-r from-purple-500 to-violet-700 text-white rounded-3xl p-10 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
                <h1 className="text-4xl font-extrabold mb-4">{selectedCommerce.name}</h1>
                <p className="text-white/90 text-lg mb-6">{selectedCommerce.description}</p>

                
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>

                {isOwner && (
                    <div className="flex flex-wrap gap-4 mt-6">
                        <button
                            onClick={() => navigate("edit")}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                        >
                            Editar Comercio
                        </button>
                        <button
                            onClick={() => navigate("create")}
                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 text-white"
                        >
                            Crear Producto
                        </button>
                        <button
                            onClick={async () => {
                                if (window.confirm("¿Seguro que quieres eliminar este comercio?")) {
                                    await deleteCommerce(selectedCommerce._id);
                                    navigate("/");
                                }
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 text-white"
                        >
                            Eliminar Comercio
                        </button>
                    </div>
                )}
            </div>

            <Category
                products={products}
                commerceId={selectedCommerce._id}
                deleteProduct={deleteProduct}
                refreshProducts={refreshProducts}
            />

            <Outlet context={{ refreshProducts, selectedCommerce }} />
        </div>
    );
};