import { useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../core/http/axios";

export const Category = ({ products, refreshProducts, ownerId, commerceId }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const isOwner = user?._id === ownerId;

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
        clothing: "Ropa",
        footwear: "Calzado",
        other: "Otras",
    };

    return (
        <div className="flex flex-col gap-14">
            {Object.keys(categories).map(category => (
                <div key={category} className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-dark border-b-2 border-primary-light inline-block pb-1">
                        {categoryNames[category] || category}
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        {categories[category].map(product => (
                            <div
                                key={product._id}
                                className="group bg-neutral-warm rounded-3xl shadow-md border border-primary-light overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                {product.images?.[0] && (
                                    <div className="w-full h-48 overflow-hidden rounded-t-3xl">
                                        <img
                                            src={
                                                product.images[0].startsWith("http")
                                                    ? product.images[0]
                                                    : product.images[0].startsWith("/products/")
                                                        ? product.images[0]
                                                        : `/products/${product.images[0]}`
                                            }
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary truncate">
                                            {product.name}
                                        </h3>
                                        <p className="text-primary-dark font-bold mt-1 text-base">
                                            {product.price.toFixed(2)} €
                                        </p>
                                    </div>

                                    {isOwner && (
                                        <div className="flex gap-3 mt-3 justify-center">
                                            <button
                                                onClick={() => navigate(`/admin/commerce/${commerceId}/edit/${product._id}`)}
                                                className="px-3 py-1 text-sm rounded-lg btn-primary hover:scale-105 transition-transform"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-transform"
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


