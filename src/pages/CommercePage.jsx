import { useState, useEffect } from "react";
import { useCommerce } from "../core/commerce/CommerceContext";
import { useProduct } from "../core/products/ProductContext";
import { useNavigate } from "react-router-dom";

export const CommercePage = () => {
    const { commerces } = useCommerce();
    const { products, loadAllProducts } = useProduct();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const categories = [
        "all",
        "food",
        "books-paper",
        "health-beauty",
        "sports",
        "pets",
        "home",
        "other"
    ];

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

    useEffect(() => {
        loadAllProducts();
    }, []);

    const filteredCommerces = commerces.filter((commerce) =>
        commerce.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (selectedCategory && selectedCategory !== "all") {
            const filtered = products.filter((product) =>
                product.category.includes(selectedCategory)
            );
            setFilteredProducts(filtered);
        } else if (selectedCategory === "all") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts([]);
        }
    }, [selectedCategory, products]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center bg-gradient-to-b from-violet-50 to-white">

            <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-center text-violet-900">
                Explora los <span className="text-violet-700">comercios</span> de tu barrio
            </h1>

            <div className="mb-8 w-full md:w-1/2">
                <input
                    type="text"
                    placeholder="Buscar comercio..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-5 py-3 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:border-transparent shadow-sm transition-all duration-300"
                />
            </div>

            <div className="w-full mb-10">
                <h3 className="text-xl md:text-3xl font-extrabold mb-6 text-center text-violet-900">
                    O si lo prefieres, explora <span className="text-violet-700">productos</span> por categorías
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 rounded-full border font-medium transition-colors duration-300 ${selectedCategory === category
                                ? "bg-violet-700 text-white border-violet-700 shadow-lg"
                                : "bg-white text-violet-700 border-violet-700 hover:bg-violet-100"
                                }`}
                        >
                            {categoryNames[category]}
                        </button>
                    ))}
                    {selectedCategory && (
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="px-5 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                        >
                            Ocultar todos
                        </button>
                    )}
                </div>

                {selectedCategory && (
                    <div className="w-full mt-8">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {filteredProducts.map((product) => {
                                    const commerce = commerces.find(commerce => commerce._id === product.commerceId);
                                    return (
                                        <div
                                            key={product._id}
                                            className="group bg-white border border-gray-200 rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
                                            onClick={() => commerce && navigate(`/commerce/${commerce._id}`)}
                                        >
                                            {product.images?.[0] && (
                                                <img
                                                    src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                                                    alt={product.name}
                                                    className="w-20 h-20 object-cover rounded-lg border"
                                                />
                                            )}
                                            <div className="p-5 flex flex-col items-center text-center">
                                                <h3 className="text-lg font-semibold text-violet-900">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-700 mt-1 font-medium">
                                                    {product.price} €
                                                </p>
                                                {commerce && (
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        {commerce.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 mt-4">
                                No hay productos en esta categoría.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {filteredCommerces.length > 0 ? (
                    filteredCommerces.map((commerce) => (
                        <div
                            key={commerce._id}
                            className="group bg-white rounded-3xl shadow-lg p-6 border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            {(commerce.image || commerce.images?.[0]) && (
                                <img
                                    src={
                                        (commerce.image || commerce.images[0]).startsWith("http")
                                            ? (commerce.image || commerce.images[0])
                                            : commerce.image?.startsWith("/images/")
                                                ? commerce.image // viene con /images/commerces/...
                                                : `/commerces/${commerce.images?.[0] || commerce.image}`
                                    }
                                    alt={commerce.name}
                                    className="w-full h-48 object-cover rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-105"
                                />
                            )}
                            <h2
                                onClick={() => navigate(`/commerce/${commerce._id}`)}
                                className="text-2xl font-bold text-violet-900 text-center mt-4 cursor-pointer hover:text-violet-700 transition-colors duration-300"
                            >
                                {commerce.name}
                            </h2>
                            <p className="text-gray-600 italic text-center mt-2">{commerce.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="col-span-2 text-center text-gray-500">
                        No se encontraron comercios.
                    </p>
                )}
            </div>
        </div>
    );
};