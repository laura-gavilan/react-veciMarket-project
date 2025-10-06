import { useState } from "react";
import { Link } from "react-router-dom";

export const CommerceProducts = ({
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
        food: "Food",
        "books-paper": "Books & Paper",
        "health-beauty": "Health & Beauty",
        sports: "Sports",
        pets: "Pets",
        home: "Home",
        other: "Other",
    };

    // Filtrado de productos
    const filteredProducts = products.filter((p) => {
        if (!p) return false;
        const matchesCommerce = commerceId ? p.commerceId === commerceId : true;
        const matchesCategory =
            selectedCategory === "all" ? true : p.category === selectedCategory;
        return matchesCommerce && matchesCategory;
    });

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
                Productos
            </h2>

            {/* Selector de categoría */}
            <div className="mb-6 flex items-center gap-3">
                <label className="text-gray-700 font-medium">Categoría:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all bg-white shadow-sm"
                >
                    {commerceCategory && !categories.includes(commerceCategory) && (
                        <option value={commerceCategory}>
                            {categoryNames[commerceCategory] || commerceCategory}
                        </option>
                    )}
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {categoryNames[cat]}
                        </option>
                    ))}
                </select>
            </div>

            {/* Lista de productos */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {filteredProducts.map((p) => (
                        <div
                            key={p._id}
                            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow flex justify-between items-center"
                        >
                            <div>
                                <span className="font-semibold text-gray-800 text-lg">{p.name}</span>
                                <p className="text-gray-500 mt-1">{p.price}€</p>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    to={`edit/${p._id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                                >
                                    Editar
                                </Link>
                                {deleteProduct && refreshProducts && (
                                    <button
                                        onClick={() => {
                                            deleteProduct(p._id);
                                            refreshProducts();
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
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