import { createContext, useContext, useState } from "react";
import { api } from "../core/http/axios";
import { getTokenFromLocalStorage } from "../core/auth/auth.service";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

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

    const loadAllProducts = async () => {
        try {
            const { data } = await api.get("/products");
            setProducts(data);
        } catch (error) {
            console.error("Error cargando todos los productos:", error);
        }
    };

    const loadCategories = async () => {
        try {
            const { data } = await api.get("/products/categories");
            setCategories(data);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };

    const addCategory = async (category) => {
        try {
            const token = getTokenFromLocalStorage();
            const { data } = await api.post("/products/categories", category, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories((prev) => [...prev, data]);
        } catch (error) {
            console.error("Error creando categoría:", error);
            alert("No se pudo crear la categoría.");
        }
    };

    const updateCategory = async (updatedCategory) => {
        try {
            const token = getTokenFromLocalStorage();
            const { data } = await api.put(`/products/categories/${updatedCategory._id}`, updatedCategory, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories((prev) =>
                prev.map((c) => (c._id === data._id ? data : c))
            );
        } catch (error) {
            console.error("Error actualizando categoría:", error);
            alert("No se pudo actualizar la categoría.");
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const token = getTokenFromLocalStorage();
            await api.delete(`/products/categories/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories((prev) => prev.filter((c) => c._id !== categoryId));
        } catch (error) {
            console.error("Error eliminando categoría:", error);
            alert("No se pudo eliminar la categoría.");
        }
    };

    return (
        <ProductContext.Provider
            value={{ products, addProduct, updateProduct, deleteProduct, loadProducts, loadAllProducts, categories, loadCategories, addCategory, updateCategory, deleteCategory }}
        >
            {children}
        </ProductContext.Provider>
    );
};

// Hook para usar el contexto
export const useProduct = () => useContext(ProductContext);

