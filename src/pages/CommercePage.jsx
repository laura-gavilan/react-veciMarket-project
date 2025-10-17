import { useState, useEffect, useContext } from "react";
import { useCommerce } from "../core/commerce/CommerceContext";
import { useProduct } from "../core/products/ProductContext";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "../components/FavoriteButton";
import { CartContext } from "../contexts/CartContext";

export const CommercePage = () => {
    const { commerces } = useCommerce();
    const { products, loadAllProducts } = useProduct();
    const { cart, addToCart, loading } = useContext(CartContext);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showProducts, setShowProducts] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredCommerces, setFilteredCommerces] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const categories = [
        "all",
        "food",
        "books-paper",
        "health-beauty",
        "sports",
        "pets",
        "home",
        "clothing",
        "footwear",
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
        clothing: "Ropa",
        footwear: "Calzado",
        other: "Otras",
    };

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    useEffect(() => {
        if (!showProducts) {
            setFilteredProducts([]);
            return;
        }
        const searchLower = search.toLowerCase();
        const filteredProds = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchLower);
            const matchesCategory =
                selectedCategory === "all"
                    ? true
                    : product.category.includes(selectedCategory);
            return matchesSearch && matchesCategory;
        });
        setFilteredProducts(filteredProds);
        setFilteredCommerces(commerces);
    }, [search, products, commerces, selectedCategory, showProducts]);

    return (
        <div className="min-h-screen  px-6 py-12 flex flex-col items-center max-w-7xl mx-auto">
            <h1 className="text-center mb-8 text-4xl md:text-5xl font-title font-bold text-[var(--color-burdeos-dark)] leading-tight">
                Explora los <span className="text-[var(--color-mostaza)]">productos</span> y <span className="text-[var(--color-mostaza)]">comercios</span> de tu barrio
            </h1>

            <div className="mb-8 w-full md:w-1/2 relative">
                <input
                    type="text"
                    placeholder="Buscar producto..."
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

            <div className="w-full mb-10 flex flex-wrap gap-3 justify-center">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => { setSelectedCategory(category); setShowProducts(true); }}
                        className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                            ? "bg-[var(--color-mostaza)] text-[var(--color-burdeos-dark)] shadow-md scale-105"
                            : "bg-white text-[var(--color-burdeos-dark)] border border-[var(--color-burdeos-dark)] hover:bg-[var(--color-mostaza-pastel)] hover:scale-105"
                            }`}
                    >
                        {categoryNames[category]}
                    </button>
                ))}

                {showProducts && (
                    <button
                        onClick={() => setShowProducts(false)}
                        className="px-5 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                    >
                        Ocultar todos
                    </button>
                )}
            </div>

            {showProducts && selectedCategory && filteredProducts.length > 0 && (
                <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map(product => {
                        const commerce = commerces.find(c => c._id === product.commerceId);
                        return (
                            <div
                                key={product._id}
                                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer p-5 flex flex-col items-center text-center hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
                                onClick={() => commerce && navigate(`/commerce/${commerce._id}`)}
                            >
                                <div className="w-full h-44 overflow-hidden">
                                    {product.images?.[0] && (
                                        <img
                                            src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    )}
                                </div>

                                <h3 className="text-lg md:text-xl font-title font-semibold text-[var(--color-burdeos-dark)] mt-2">
                                    {product.name}
                                </h3>
                                <p className="text-[var(--color-burdeos-darker)] mt-1 font-medium">
                                    {product.price} €
                                </p>

                                <button
                                    disabled={loading}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!cart._id) return;
                                        addToCart(product);
                                    }}
                                    className={`flex-1 py-2 rounded-xl font-medium shadow-md transition-all ${cart?.loading || !cart?._id ? 'bg-gray-300 cursor-not-allowed' : 'bg-[var(--color-mostaza-pastel)] text-[var(--color-burdeos-dark)] hover:bg-[var(--color-mostaza)] hover:scale-105'}`}
                                >
                                    🛒 Añadir al carrito
                                </button>

                                {commerce && (
                                    <p className="text-gray-500 text-sm mt-1 truncate">Comercio:{commerce.name}</p>
                                )}
                                <FavoriteButton product={product} />

                            </div>
                        );
                    })}
                </div>
            )}

            {showProducts && selectedCategory && filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                    No hay productos en esta categoría.
                </p>
            )}

            <div className="w-full mt-12">
                <h2 className="text-2xl font-title font-bold text-[var(--color-burdeos-dark)] mb-6">
                    Comercios
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCommerces.length > 0 ? (
                        filteredCommerces.map(commerce => (
                            <div
                                key={commerce._id}
                                className="group bg-white rounded-3xl shadow-xl p-6 border border-[var(--color-burdeos-light)] overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                onClick={() => navigate(`/commerce/${commerce._id}`)}
                            >
                                {(commerce.image || commerce.images?.[0]) && (
                                    <img
                                        src={(commerce.image || commerce.images[0]).startsWith("/")
                                            ? (commerce.image || commerce.images[0])
                                            : `/commerces/${commerce.images?.[0] || commerce.image}`}
                                        alt={commerce.name}
                                        className="w-full h-44 sm:h-48 md:h-40 lg:h-36 object-cover rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                                <h2 className="text-lg sm:text-xl font-title font-semibold text-[var(--color-burdeos-dark)] text-center mt-2 leading-snug">
                                    {commerce.name}
                                </h2>
                                <p className="text-[var(--color-burdeos-darker)] italic text-center mt-1 line-clamp-3 text-sm">
                                    {commerce.description}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No se encontraron comercios.
                        </p>
                    )}

                    {showScrollTop && (
                        <button
                            onClick={scrollToTop}
                            className="fixed bottom-6 right-6 bg-[var(--color-mostaza)] text-[var(--color-burdeos-dark)] p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
                        >
                            ↑
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

