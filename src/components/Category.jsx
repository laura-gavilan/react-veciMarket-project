import { useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../core/http/axios";

export const Category = ({ products, deleteProduct, refreshProducts, ownerId, commerceId }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const isOwner = user?._id === ownerId;

    // Agrupar productos por categoría
    const categories = useMemo(() => {
        const catMap = {};
        products.forEach(product => {
            const cat = product.category || "other";
            if (!catMap[cat]) catMap[cat] = [];
            catMap[cat].push(product);
        });
        return catMap;
    }, [products]);

    const handleDelete = async (productId) => {
        if (!window.confirm("¿Eliminar producto?")) return;
        await api.delete(`/products/${productId}`);
        if (refreshProducts) refreshProducts();
    };

    const categoryNames = {
        all: "Todas",
        food: "Alimentación",
        "books-paper": "Libros & Papelería",
        "health-beauty": "Salud & Belleza",
        sports: "Deportes",
        pets: "Animales",
        home: "Hogar",
        other: "Otras",
    };

    return (
        <div className="flex flex-col gap-8">
            {Object.keys(categories).map(category => (
                <div key={category}>
                    <h2 className="text-2xl font-bold mb-4 capitalize">
                        {categoryNames[category] || category}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories[category].map(product => (
                            <div
                                key={product._id}
                                className="bg-[var(--color-gray-warm)] rounded-2xl shadow-md border border-[var(--color-burdeos-light)] overflow-hidden hover:shadow-2xl hover:scale-105 transition-all flex flex-col cursor-pointer"
                            >
                                {product.images?.[0] && (
                                    <img
                                        src={
                                            product.images[0].startsWith("http")
                                                ? product.images[0]
                                                : product.images[0].startsWith("/products/")
                                                    ? product.images[0]
                                                    : `/products/${product.images[0]}`
                                        }
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-t-2xl"
                                    />
                                )}

                                <div className="p-5 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[var(--color-burdeos-dark)]">
                                            {product.name}
                                        </h3>
                                        <p className="text-[var(--color-burdeos-light)] font-bold mt-2">
                                            {product.price.toFixed(2)} €
                                        </p>
                                    </div>

                                    {isOwner && (
                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={() => navigate(`/admin/commerce/${commerceId}/edit/${product._id}`)}
                                                className="flex-1 bg-[var(--color-burdeos-dark)] hover:bg-[var(--color-burdeos-light)] text-[var(--color-mostaza-pastel)] py-2 rounded-xl text-center font-medium transition-all shadow-sm hover:shadow-md"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


