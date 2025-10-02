import { useContext, useEffect } from "react";
import { useParams, useNavigate, Outlet, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useProduct } from "../contexts/ProductContext";
import { useCommerce } from "../contexts/CommerceContext";

export const AdminDetailPage = () => {
    const { commerces, fetchCommerces } = useCommerce();
    const { user } = useContext(AuthContext);
    const { products, loadProducts, deleteProduct } = useProduct();
    const { commerceId } = useParams();
    const navigate = useNavigate();

    const selectedCommerce = commerces.find((c) => c._id === commerceId);

    useEffect(() => {
        if (commerces.length === 0) fetchCommerces();
    }, []);

    useEffect(() => {
        if (selectedCommerce) loadProducts(selectedCommerce._id);
    }, [selectedCommerce]);

    if (!selectedCommerce)
        return (
            <div className="p-6 text-center text-gray-500">
                <h1 className="text-xl font-semibold">No se encuentra el comercio</h1>
            </div>
        );

    const isOwner = user?._id === selectedCommerce?.ownerUserId?._id;
    const refreshProducts = () => loadProducts(selectedCommerce._id);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
            {/* Botón Volver */}
            <button
                onClick={() => navigate(-1)}
                className="self-start mb-4 px-4 py-2 bg-gray-100 text-gray-800 rounded-full shadow hover:bg-gray-200 transition-colors"
            >
                ← Volver
            </button>

            {/* Información del comercio */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-gray-900">{selectedCommerce.name}</h1>
                <p className="text-gray-700 mt-2">{selectedCommerce.description}</p>

                {isOwner && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        <button
                            onClick={() => navigate("edit")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Editar Comercio
                        </button>
                        <button
                            onClick={() => navigate("create")}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                        >
                            Crear Producto
                        </button>
                    </div>
                )}
            </div>

            {/* Productos */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">Productos</h2>
                {products.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {products
                            .filter((p) => p.commerceId === selectedCommerce._id)
                            .map((p) => (
                                <div
                                    key={p._id}
                                    className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition-shadow"
                                >
                                    <div>
                                        <span className="font-medium text-gray-800">{p.name}</span>
                                        <p className="text-gray-500 text-sm">{p.price}€</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            to={`edit/${p._id}`}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => {
                                                deleteProduct(p._id);
                                                refreshProducts();
                                            }}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hay productos aún</p>
                )}
            </div>

            {/* Outlet para rutas hijas */}
            <Outlet context={{ refreshProducts, selectedCommerce }} />
        </div>
    );
};