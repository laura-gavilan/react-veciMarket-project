import { useState, useEffect } from "react";
import { useCommerce } from "../core/commerce/CommerceContext";
import { useProduct } from "../core/products/ProductContext";
import { useNavigate } from "react-router-dom";

export const CommercePage = () => {
    const { commerces, search, setSearch } = useCommerce();
    const { products, loadAllProducts } = useProduct();
    const navigate = useNavigate();
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

    const filteredCommerces = commerces
        .filter((commerce) =>
            commerce.name.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 5); // Mostrar solo 5 comercios

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
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center bg-general">

            {/* Título principal */}
            <h1 className="text-center mb-8 text-4xl md:text-5xl font-title font-semibold text-[var(--color-burdeos-dark)] leading-tight">
                Explora los <span className="text-[var(--color-mostaza)]">comercios</span> y los <span className="text-[var(--color-mostaza)]">productos</span> de tu barrio
            </h1>

            {/* Buscador */}
            <div className="mb-8 w-full md:w-1/2 relative">
                <input
                    type="text"
                    placeholder="Buscar comercio..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-5 py-3 rounded-full border border-[var(--color-burdeos-dark)] bg-white text-[var(--color-burdeos-dark)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] shadow-sm transition-all duration-300"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-burdeos-dark)] transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Categorías */}
            <div className="w-full mb-10">
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                                ? "bg-[var(--color-mostaza)] text-[var(--color-burdeos-dark)] shadow-md scale-105"
                                : "bg-white text-[var(--color-burdeos-dark)] border border-[var(--color-burdeos-dark)] hover:bg-[var(--color-mostaza-pastel)] hover:scale-105"
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
                            Ocultar todas
                        </button>
                    )}
                </div>

                {/* Productos filtrados */}
                {selectedCategory && (
                    <div className="w-full mt-8">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {filteredProducts.map((product) => {
                                    const commerce = commerces.find(c => c._id === product.commerceId);
                                    return (
                                        <div
                                            key={product._id}
                                            className="group bg-white border border-gray-200 rounded-3xl shadow-md overflow-hidden cursor-pointer p-5 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                            onClick={() => commerce && navigate(`/commerce/${commerce._id}`)}
                                        >
                                            {product.images?.[0] && (
                                                <img
                                                    src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                                                    alt={product.name}
                                                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                                                />
                                            )}
                                            <h3 className="text-lg md:text-xl font-title font-semibold text-[var(--color-burdeos-dark)]">
                                                {product.name}
                                            </h3>
                                            <p className="text-[var(--color-burdeos-darker)] mt-1 font-medium">
                                                {product.price} €
                                            </p>
                                            {commerce && (
                                                <p className="text-gray-500 text-sm mt-1 truncate">{commerce.name}</p>
                                            )}
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

            {/* Comercios */}
            <div className="w-full mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCommerces.length > 0 ? (
                        filteredCommerces.map((commerce) => (
                            <div
                                key={commerce._id}
                                className="group bg-white rounded-3xl shadow-md p-6 border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                onClick={() => navigate(`/commerce/${commerce._id}`)}
                            >
                                {(commerce.image || commerce.images?.[0]) && (
                                    <img
                                        src={(commerce.image || commerce.images[0]).startsWith("http")
                                            ? (commerce.image || commerce.images[0])
                                            : commerce.image?.startsWith("/images/")
                                                ? commerce.image
                                                : `/commerces/${commerce.images?.[0] || commerce.image}`
                                        }
                                        alt={commerce.name}
                                        className="w-full h-44 sm:h-48 md:h-40 lg:h-36 object-cover rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                                <h2 className="text-lg sm:text-xl md:text-lg lg:text-base font-title font-semibold text-[var(--color-burdeos-dark)] text-center mt-2 leading-snug">
                                    {commerce.name}
                                </h2>
                                <p className="text-[var(--color-burdeos-darker)] italic text-center mt-1 line-clamp-3 text-sm sm:text-sm md:text-xs lg:text-xs">
                                    {commerce.description}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No se encontraron comercios.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

