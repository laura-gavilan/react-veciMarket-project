import type { CategoryType } from "../../types/types";
import { api } from "../http/axios";
import type { Product } from './../../components/ProductCard';

export const getAllProductsApi = async (): Promise<Product[]> => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error cargando todos los productos:", error);
        throw error;
    }
};

export const getProductsByCommerceApi = async (commerceId: string): Promise<Product[]> => {
    try {
        const response = await api.get(`/products?commerceId=${commerceId}`);
        return response.data;
    } catch (error) {
        console.error("Error cargando productos del comercio:", error);
        throw error;
    }
};

export const addProductApi = async (product: Omit<Product, "_id">): Promise<Product> => {
    try {
        const response = await api.post("/products", product);
        return response.data;
    } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
    }
};

export const updateProductApi = async (productId: string, updatedProduct: Partial<Product>): Promise<Product> => {
    try {
        const response = await api.patch(`/products/${productId}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error("Error actualizando producto:", error);
        throw error;
    }
};

export const deleteProductApi = async (productId: string): Promise<{message: string}> => {
    try {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error eliminando producto:", error);
        throw error;
    }
};

export const patchProductImagesApi = async (productId: string, images: string[]): Promise<Product> => {
    try {
        const response = await api.patch(`/products/${productId}/images`, { images });
        return response.data;
    } catch (error) {
        console.error("Error actualizando imágenes del producto:", error);
        throw error;
    }
};

export const getCategoriesApi = async (): Promise<CategoryType[]> => {
    try {
        const response = await api.get("/products/categories");
        return response.data;
    } catch (error) {
        console.error("Error cargando categorías:", error);
        throw error;
    }
};

export const addCategoryApi = async (category: CategoryType): Promise<{ message: string }> => {
    try {
        const response = await api.post("/products/categories", category);
        return response.data;
    } catch (error) {
        console.error("Error creando categoría:", error);
        throw error;
    }
};

export const updateCategoryApi = async (categoryId: string, updatedCategory: { name: string}): Promise<{message: string}> => {
    try {
        const response = await api.put(`/products/categories/${categoryId}`, updatedCategory);
        return response.data;
    } catch (error) {
        console.error("Error actualizando categoría:", error);
        throw error;
    }
};

export const deleteCategoryApi = async (categoryId: string): Promise<{message: string}> => {
    try {
        const response = await api.delete(`/products/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error eliminando categoría:", error);
        throw error;
    }
};