import { createContext, useContext, useState } from "react";
import { api } from "../core/http/axios";
import { getTokenFromLocalStorage } from "../core/auth/auth.service";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    // Añadir producto a la lista
    const addProduct = (product) => {
        setProducts((prev) => [...prev, product]);
    };

    // Actualizar producto existente
    const updateProduct = (updatedProduct, commerceId) => {
        setProducts((prev) =>
            prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
        );
    };

    // Eliminar producto
    const deleteProduct = async (productId) => {
        try {
            const token = getTokenFromLocalStorage();
            await api.delete(`/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts((prev) => prev.filter((p) => p._id !== productId));
        } catch (error) {
            console.error("Error eliminando producto:", error);
            alert("No se pudo eliminar el producto.");
        }
    };

    // Opcional: cargar productos de un comercio
    const loadProducts = async (commerceId) => {
        try {
            const { data } = await api.get(`/products?commerceId=${commerceId}`);
            setProducts(data);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    return (
        <ProductContext.Provider
            value={{ products, addProduct, updateProduct, deleteProduct, loadProducts }}
        >
            {children}
        </ProductContext.Provider>
    );
};

// Hook para usar el contexto
export const useProduct = () => useContext(ProductContext);

