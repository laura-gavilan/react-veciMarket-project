import type { Product } from "../../components/ProductCard";
import type { CategoryType } from "../../types/types";


export const saveProductsInLocalStorage = (products: Product[]) => {
    localStorage.setItem("products", JSON.stringify(products));
};

export const getProductsFromLocalStorage = (): Product[] => {
    const data = localStorage.getItem("products");
    if (!data || data === "undefined") return [];

    try {
        return JSON.parse(data) as Product[];
    } catch (error) {
        console.error("JSON parse error in products:", error);
        return [];
    }
};

export const addProductToLocalStorage = (product: Product) => {
    const products = getProductsFromLocalStorage();
    products.push(product);
    saveProductsInLocalStorage(products);
};

export const updateProductInLocalStorage = (updatedProduct: Product) => {
    const products = getProductsFromLocalStorage();
    const newProducts = products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
    );
    saveProductsInLocalStorage(newProducts);
};

export const patchProductImagesInLocalStorage = (productId: string, images: string[]) => {
    const products = getProductsFromLocalStorage();
    const newProducts = products.map((product) =>
        product._id === productId ? { ...product, images } : product
    );
    saveProductsInLocalStorage(newProducts);
};

export const deleteProductFromLocalStorage = (productId: string): void => {
    const products = getProductsFromLocalStorage();
    const newProducts = products.filter((product) => product._id !== productId);
    saveProductsInLocalStorage(newProducts);
};


export const saveCategoriesInLocalStorage = (categories: CategoryType[])=> {
    localStorage.setItem("categories", JSON.stringify(categories));
};

export const getCategoriesFromLocalStorage = (): CategoryType[] => {
    const data = localStorage.getItem("categories");
    return data ? JSON.parse(data) : [];
};