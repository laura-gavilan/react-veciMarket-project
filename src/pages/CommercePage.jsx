import { useState, useEffect } from "react";
import { useCommerce } from "../core/commerce/CommerceContext";
import { useProduct } from "../core/products/ProductContext";
import { useNavigate } from "react-router-dom";
import { ProductModal } from "../components/ProductModal";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { ProductCard } from "../components/ProductCard";
import { CommerceCard } from "../components/CommerceCard";

export const CommercePage = () => {
    const { commerces } = useCommerce();
    const { products, loadAllProducts } = useProduct();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showProducts, setShowProducts] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);


    const [modalProduct, setModalProduct] = useState(null);
    const [modalCommerce, setModalCommerce] = useState(null);

    const categories = [
        "all", "food", "books-paper", "health-beauty", "sports",
        "pets", "home", "clothing", "footwear", "other"
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


    useEffect(() => { loadAllProducts(); }, []);

    useEffect(() => {
        if (!showProducts) {
            setFilteredProducts([]);
            return;
        }
        const searchLower = search.toLowerCase();

        setFilteredProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(searchLower) &&
                (selectedCategory === "all" || product.category.includes(selectedCategory))
            )
        );

    }, [search, products, selectedCategory, showProducts]);

    return (
        <div className="min-h-screen px-6 py-12 flex flex-col items-center max-w-7xl mx-auto">
            <h1 className="text-center mb-8 text-4xl md:text-5xl font-title font-bold text-primary-dark leading-tight">
                Explora los <span className="text-accent-primary">productos</span> y <span className="text-accent-primary">comercios</span> de tu barrio
            </h1>

            <SearchBar search={search} setSearch={setSearch} />

            <CategoryFilter
                categories={categories}
                categoryName={categoryNames}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setShowProducts={setShowProducts}
                showProducts={showProducts} />


            {showProducts && filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch">
                    {filteredProducts.map(product => {
                        const commerce = commerces.find(commerce => commerce._id === product.commerceId);
                        return (
                            <ProductCard
                                key={`${product._id}-${product.commerceId}`}
                                product={product}
                                commerce={commerce}
                                onClick={() => {
                                    setModalProduct(product);
                                    setModalCommerce(commerce);
                                }} />
                        );
                    })}
                </div>
            )}

            {showProducts && filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                    No hay productos en esta categoría.
                </p>
            )}

            <div className="w-full mt-12">
                <h2 className="text-2xl font-title font-bold text-primary-dark mb-6">
                    Comercios
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {commerces.length > 0 && commerces.map(commerce => (
                        <CommerceCard
                            key={commerce._id}
                            commerce={commerce}
                            onClick={() => navigate(`/commerce/${commerce._id}`)} />

                    ))}

                    {commerces.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">
                            No se encontraron comercios.
                        </p>
                    )}
                </div>
            </div>

            {modalProduct && 
                <ProductModal
                    product={modalProduct}
                    commerce={modalCommerce}
                    onClose={() => setModalProduct(null)}
                />
            };
        </div>
    );
};
