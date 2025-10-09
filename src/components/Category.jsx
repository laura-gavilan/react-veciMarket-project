import { useState } from "react";
import { Link } from "react-router-dom";

export const Category = ({
    products,
    commerceId,
    commerceCategory,
    deleteProduct,
    refreshProducts,
}) => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = [
        "all",
        "food",
        "books-paper",
        "health-beauty",
        "sports",
        "pets",
        "home",
        "other",
    ];

    const categoryNames = {
        all: "Todas",
        food: "Alimentación",
        "books-paper": "Libros & Papelería",
        "health-beauty": "Salud & Belleza",
        sports: "Deportes",
        pets: "Animales",
        home: "Casa",
        other: "Otras",
    };

    const filteredProducts = products.filter((product) => {
        if (!product) return false;
        const matchesCommerce = commerceId ? product.commerceId === commerceId : true;
        const matchesCategory =
            selectedCategory === "all" ? true : product.category === selectedCategory;
        return matchesCommerce && matchesCategory;
    });

    return (
        <div className="mt-6">
            <h2 className="text-h4 font-title font-semibold text-[var(--color-burdeos-dark)] mb-6 border-b border-[var(--color-burdeos-light)] pb-2">
                Productos
            </h2>

            <div className="mb-6 flex items-center gap-3">
                <label className="text-[var(--color-burdeos-dark)] font-semibold">Categoría:</label>
                <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    className="border border-gray-300 rounded-3xl px-4 py-2 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] transition-all"
                >
                    {commerceCategory && !categories.includes(commerceCategory) && (
                        <option value={commerceCategory}>
                            {categoryNames[commerceCategory] || commerceCategory}
                        </option>
                    )}
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {categoryNames[category]}
                        </option>
                    ))}
                </select>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-xl transition-shadow flex justify-between items-center"
                        >
                            {product.images?.[0] && (
                                <img
                                    src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                                    alt={product.name}
                                    className="w-24 h-24 object-cover rounded-2xl border border-[var(--color-burdeos-light)] shadow-sm"
                                />
                            )}
                            <div className="flex-1 mx-4">
                                <span className="font-semibold text-[var(--color-burdeos-dark)] text-lg">{product.name}</span>
                                <p className="text-gray-500 mt-1">{product.price}€</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link
                                    to={`edit/${product._id}`}
                                    className="btn-primary text-sm"
                                >
                                    Editar
                                </Link>
                                {deleteProduct && refreshProducts && (
                                    <button
                                        onClick={() => {
                                            deleteProduct(product._id);
                                            refreshProducts();
                                        }}
                                        className="btn-secondary text-sm"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No hay productos en esta categoría</p>
            )}
        </div>
    );
};
