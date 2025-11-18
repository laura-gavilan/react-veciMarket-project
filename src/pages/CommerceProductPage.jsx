import { useParams } from "react-router-dom";
import { useCommerce } from "../core/commerce/CommerceContext";
import { useProduct } from "../core/products/ProductContext";
import { CommerceCard } from "../components/CommerceCard";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";
import { ProductModal } from "../components/ProductModal";

export const CommerceProductPage = () => {
    const { commerceId } = useParams();
    const { commerces, fetchCommerces } = useCommerce();
    const { products, loadAllProducts } = useProduct();
    const [loading, setLoading] = useState(true);
    const [modalProduct, setModalProduct] = useState(null);


    useEffect(() => {
        const loadData = async () => {
            if (commerces.length === 0) await fetchCommerces();
            if (products.length === 0) await loadAllProducts();
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Cargando comercio y productos...</p>;
    }

    const commerce = commerces.find(c => c._id === commerceId);

    if (!commerce) {
        return <p className="text-center mt-10 text-red-500">No se encontró el comercio.</p>;
    }

    const commerceProducts = products.filter(p => p.commerceId === commerceId);

    const handleProductClick = (product) => {
        setModalProduct(product);
        console.log("Producto seleccionado:", product);
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <CommerceCard commerce={commerce} />

            <div>
                <h2 className="text-2xl font-title font-bold text-primary-dark mb-4">
                    Productos de {commerce.name}
                </h2>
                {commerceProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {commerceProducts.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                commerce={commerce}
                                onClick={() => handleProductClick(product)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No hay productos disponibles.</p>
                )}
            </div>

            {modalProduct && (
                <ProductModal
                    product={modalProduct}
                    onClose={() => setModalProduct(null)}
                />
            )}
        </div>
    );
};
