import { createContext, useContext, useState } from "react";
import {
    getAllProductsApi,
    getProductsByCommerceApi,
    addProductApi,
    updateProductApi,
    deleteProductApi,
    patchProductImagesApi,
    getCategoriesApi,
    addCategoryApi,
    updateCategoryApi,
    deleteCategoryApi
} from "./product.api.js";

import {
    saveProductsInLocalStorage,
    getProductsFromLocalStorage,
    addProductToLocalStorage,
    updateProductInLocalStorage,
    patchProductImagesInLocalStorage,
    saveCategoriesInLocalStorage,
    getCategoriesFromLocalStorage
} from "./product.service.js";

export const ProductContext = createContext(null);
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(getProductsFromLocalStorage());
    const [categories, setCategories] = useState(getCategoriesFromLocalStorage());


    const loadAllProducts = async () => {
        try {
            const data = await getAllProductsApi();
            setProducts(data);
            saveProductsInLocalStorage(data);
        } catch (error) {
            console.error("Error cargando todos los produtos", error);
        }
    };


    const loadProductsByCommerce = async (commerceId) => {
        try {
            const data = await getProductsByCommerceApi(commerceId);
            setProducts(data);
            saveProductsInLocalStorage(data);
        } catch (error) {
            console.error("Error cargando products por comercio", error);
        }

    };

    const addProduct = async (product) => {
        try {
            const data = await addProductApi(product);
            setProducts((prev) => [...prev, data]);
            addProductToLocalStorage(data);
        } catch (error) {
            console.error("Error agregando producto", error);
        }

    };

    const updateProduct = async (productId, updatedProduct) => {
        try {
            const data = await updateProductApi(productId, updatedProduct);
            setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
            updateProductInLocalStorage(data);
        } catch (error) {
            console.error("Error actualizando producto", error);
        }

    };

    const updateProductImages = async (productId, images) => {
        try {
            const data = await patchProductImagesApi(productId, images);
            setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
            patchProductImagesInLocalStorage(productId, images);
        } catch (error) {
            console.error("Error actualizando imágenes del producto", error);
        }

    };

    const deleteProduct = async (productId) => {
        try {
            await deleteProductApi(productId);
            let newProducts;
            setProducts((prev) => {
                newProducts = prev.filter((p) => p._id !== productId)
                return newProducts;
            });
            saveProductsInLocalStorage(newProducts);
        }
        catch (error) {
            console.log("Error borrando producto en deleteProduct")
            console.error(error)
        }
    };


    const loadCategories = async () => {
        try {
            const data = await getCategoriesApi();
            setCategories(data);
            saveCategoriesInLocalStorage(data);
        } catch (error) {
            console.error("Error cargando categorías", error);
        }

    };

    const addCategory = async (category) => {
        try {
            const data = await addCategoryApi(category);
            setCategories((prev) => [...prev, data]);
            saveCategoriesInLocalStorage([...categories, data]);
        } catch (error) {
            console.error("Error agregando categoría", error);
        }

    };

    const updateCategory = async (categoryId, updatedCategory) => {
        try {
            await updateCategoryApi(categoryId, updatedCategory);
            const newCategories = categories.map((c) => (c._id === data._id ? data : c));
            setCategories(newCategories);
            saveCategoriesInLocalStorage(newCategories);
        } catch (error) {
            console.error("Error actualizando categoría", error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            await deleteCategoryApi(categoryId);
            const newCategories = categories.filter((c) => c._id !== categoryId);
            setCategories(newCategories);
            saveCategoriesInLocalStorage(newCategories);
        } catch (error) {
            console.error("Error eliminando categoría");
        }

    };

    return (
        <ProductContext.Provider
            value={{ products, categories, loadAllProducts, loadProductsByCommerce, addProduct, updateProduct, updateProductImages, deleteProduct, loadCategories, addCategory, updateCategory, deleteCategory }} >
            {children}
        </ProductContext.Provider>
    );
};
