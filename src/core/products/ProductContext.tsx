import { createContext, useCallback, useContext, useMemo, useState } from "react";
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
import type { CategoryType, ChildrenProps } from "../../types/types.js";
import type { Product } from './../../components/ProductCard';

export type ProductContextType = {
    products: Product[];
    categories: CategoryType[];
    loadAllProducts: () => Promise<void>;
    loadProductsByCommerce: (commerceId: string) => Promise<void>;
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (productId: string, updatedProduct: Partial<Product>) => Promise<void>;
    updateProductImages: (productId: string, images: string[]) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    loadCategories: () => Promise<void>;
    addCategory: (category: string) => Promise<void>;
    updateCategory: (categoryId: string, updatedCategory: string) => Promise<void>;
    deleteCategory: (categoryId: string) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | null>(null);
export const useProduct = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProduct must be used within a ProductProvider");
    return context;
};

export const ProductProvider = ({ children }: ChildrenProps) => {
    const [products, setProducts] = useState<Product[]>(getProductsFromLocalStorage() ?? []);
    const [categories, setCategories] = useState<CategoryType[]>(getCategoriesFromLocalStorage() ?? []);


    const loadAllProducts = useCallback(async (): Promise<void> => {
        try {
            const data = await getAllProductsApi();
            setProducts(data);
            saveProductsInLocalStorage(data);
        } catch (error) {
            console.error("Error cargando todos los produtos", error);
        }
    }, []);


    const loadProductsByCommerce = useCallback(async (commerceId: string): Promise<void> => {
        try {
            const data = await getProductsByCommerceApi(commerceId);
            setProducts(data);
            saveProductsInLocalStorage(data);
        } catch (error) {
            console.error("Error cargando products por comercio", error);
        }
    }, []);


    const addProduct = useCallback(async (product: Product): Promise<void> => {
        try {
            const data = await addProductApi(product);
            setProducts((prev) => [...prev, data]);
            addProductToLocalStorage(data);
        } catch (error) {
            console.error("Error agregando producto", error);
        }
    }, []);

    const updateProduct = useCallback(async (productId: string, updatedProduct: Partial<Product>): Promise<void> => {
        try {
            const data = await updateProductApi(productId, updatedProduct);
            setProducts((prev) => prev.map((product) => (product._id === data._id ? data : product)));
            updateProductInLocalStorage(data);
        } catch (error) {
            console.error("Error actualizando producto", error);
        }
    }, []);

    const updateProductImages = useCallback(async (productId: string, images: string[]): Promise<void> => {
        try {
            const data = await patchProductImagesApi(productId, images);
            setProducts((prev) => prev.map((product) => (product._id === data._id ? data : product)));
            patchProductImagesInLocalStorage(productId, images);
        } catch (error) {
            console.error("Error actualizando imágenes del producto", error);
        }

    }, []);

    const deleteProduct = useCallback(async (productId: string): Promise<void> => {
        try {
            await deleteProductApi(productId);
            let newProducts;
            setProducts((prev) => {
                newProducts = prev.filter((product) => product._id !== productId)
                saveProductsInLocalStorage(newProducts);
                return newProducts;
            });
        }
        catch (error) {
            console.log("Error borrando producto en deleteProduct")
            console.error(error)
        }
    }, []);


    const loadCategories = useCallback(async (): Promise<void> => {
        try {
            const data: CategoryType[] = await getCategoriesApi();
            setCategories(data);
            saveCategoriesInLocalStorage(data);
        } catch (error) {
            console.error("Error cargando categorías", error);
        }
    }, []);


    const addCategory = useCallback(async (categoryName: string): Promise<void> => {
        try {
            const category: CategoryType = { _id: '', name: categoryName };
            await addCategoryApi(category);
            setCategories(prev => {
                const newCategories = [...prev, category];
                saveCategoriesInLocalStorage(newCategories);
                return newCategories;
            });
        } catch (error) {
            console.error("Error agregando categoría", error);
        }
    }, []);


    const updateCategory = useCallback(async (categoryId: string, updatedName: string): Promise<void> => {
        try {

            await updateCategoryApi(categoryId, { name: updatedName });
            const newCategories = categories.map(category =>
                category._id === categoryId ? { ...category, name: updatedName } : category
            );
            setCategories(newCategories);
            saveCategoriesInLocalStorage(newCategories);
        } catch (error) {
            console.error("Error actualizando categoría", error);
        }
    }, [categories]);


    const deleteCategory = useCallback(async (categoryId: string): Promise<void> => {
        try {
            await deleteCategoryApi(categoryId);
            const newCategories = categories.filter(category => category._id !== categoryId);
            setCategories(newCategories);
            saveCategoriesInLocalStorage(newCategories);
        } catch (error) {
            console.error("Error eliminando categoría");
        }
    }, [categories]);

    const contextValue = useMemo<ProductContextType>(() => ({
        products, categories, loadAllProducts, loadProductsByCommerce, addProduct, updateProduct, updateProductImages, deleteProduct, loadCategories, addCategory, updateCategory, deleteCategory
    }),
        [products, categories, loadAllProducts, loadProductsByCommerce, addProduct, updateProduct, updateProductImages, deleteProduct, loadCategories, addCategory, updateCategory, deleteCategory]);

    return (
        <ProductContext.Provider value={contextValue} >
            {children}
        </ProductContext.Provider>
    );
};
