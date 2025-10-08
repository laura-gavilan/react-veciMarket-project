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
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
                Productos
            </h2>


            <div className="mb-6 flex items-center gap-3">
                <label className="text-gray-700 font-medium">Categoría:</label>
                <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all bg-white shadow-sm"
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
                            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow flex justify-between items-center"
                        >
                            {product.images?.[0] && (
                                <img
                                    src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded-lg border"
                                />
                            )}
                            <div>
                                <span className="font-semibold text-gray-800 text-lg">{product.name}</span>
                                <p className="text-gray-500 mt-1">{product.price}€</p>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    to={`edit/${product._id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                                >
                                    Editar
                                </Link>
                                {deleteProduct && refreshProducts && (
                                    <button
                                        onClick={() => {
                                            deleteProduct(product._id);
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