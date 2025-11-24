import { useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../core/http/axios";
import { ProductCard } from "./ProductCard";


export const Category = ({ products, refreshProducts, ownerId, commerceId }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const isOwner = user?._id === ownerId;

    const categories = useMemo(() => {
        const categoriesMap = {};
        products.forEach(product => {
            const cat = product.category || "other";
            if (!categoriesMap[cat]) categoriesMap[cat] = [];
            categoriesMap[cat].push(product);
        });
        return categoriesMap;
    }, [products]);

    const handleDelete = async (productId) => {
        if (!window.confirm("¿Eliminar producto?")) return;
        await api.delete(`/products/${productId}`);
        if (refreshProducts) refreshProducts();
    };

    const categoryNames = useMemo(() => ({
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
    }), []);

    const categorySection = useMemo(() => {
        return Object.keys(categories).map(category => (
            <div key={category} className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark border-b-2 border-primary-light inline-block pb-1">
                    {categoryNames[category] || category}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    {categories[category].map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            isOwner={isOwner}
                            commerceId={commerceId}
                            navigate={navigate}
                            handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        ));
    }, [categories, categoryNames, isOwner, commerceId, navigate]);

    return (
        <div className="flex flex-col gap-14">
            {categorySection}
        </div >
    );
};


