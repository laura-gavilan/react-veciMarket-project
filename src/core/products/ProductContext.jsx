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
    deleteProductFromLocalStorage,
    patchProductImagesInLocalStorage,
    saveCategoriesInLocalStorage,
    getCategoriesFromLocalStorage
} from "./product.service.js";

export const ProductContext = createContext(null);
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(getProductsFromLocalStorage());
    const [categories, setCategories] = useState(getCategoriesFromLocalStorage());

    // --- Productos ---
    const loadAllProducts = async () => {
        const data = await getAllProductsApi();
        setProducts(data);
        saveProductsInLocalStorage(data);
    };

    const loadProductsByCommerce = async (commerceId) => {
        const data = await getProductsByCommerceApi(commerceId);
        setProducts(data);
        saveProductsInLocalStorage(data);
    };

    const addProduct = async (product) => {
        const data = await addProductApi(product);
        setProducts((prev) => [...prev, data]);
        addProductToLocalStorage(data);
    };

    const updateProduct = async (productId, updatedProduct) => {
        const data = await updateProductApi(productId, updatedProduct);
        setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
        updateProductInLocalStorage(data);
    };

    const updateProductImages = async (productId, images) => {
        const data = await patchProductImagesApi(productId, images);
        setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
        patchProductImagesInLocalStorage(productId, images);
    };

    const deleteProduct = async (productId) => {
        await deleteProductApi(productId);
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        deleteProductFromLocalStorage(productId);
    };

    // --- Categorías ---
    const loadCategories = async () => {
        const data = await getCategoriesApi();
        setCategories(data);
        saveCategoriesInLocalStorage(data);
    };

    const addCategory = async (category) => {
        const data = await addCategoryApi(category);
        setCategories((prev) => [...prev, data]);
        saveCategoriesInLocalStorage([...categories, data]);
    };

    const updateCategory = async (categoryId, updatedCategory) => {
        const data = await updateCategoryApi(categoryId, updatedCategory);
        const newCategories = categories.map((c) => (c._id === data._id ? data : c));
        setCategories(newCategories);
        saveCategoriesInLocalStorage(newCategories);
    };

    const deleteCategory = async (categoryId) => {
        await deleteCategoryApi(categoryId);
        const newCategories = categories.filter((c) => c._id !== categoryId);
        setCategories(newCategories);
        saveCategoriesInLocalStorage(newCategories);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                categories,
                loadAllProducts,
                loadProductsByCommerce,
                addProduct,
                updateProduct,
                updateProductImages,
                deleteProduct,
                loadCategories,
                addCategory,
                updateCategory,
                deleteCategory
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
