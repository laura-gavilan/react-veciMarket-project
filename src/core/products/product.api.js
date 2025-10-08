import { api } from "../http/axios";

export const getAllProductsApi = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error cargando todos los productos:", error);
        throw error;
    }
};

export const getProductsByCommerceApi = async (commerceId) => {
    try {
        const response = await api.get(`/products?commerceId=${commerceId}`);
        return response.data;
    } catch (error) {
        console.error("Error cargando productos del comercio:", error);
        throw error;
    }
};

export const addProductApi = async (product) => {
    try {
        const response = await api.post("/products", product);
        return response.data;
    } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
    }
};

export const updateProductApi = async (productId, updatedProduct) => {
    try {
        const response = await api.patch(`/products/${productId}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error("Error actualizando producto:", error);
        throw error;
    }
};

export const deleteProductApi = async (productId) => {
    try {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error eliminando producto:", error);
        throw error;
    }
};

export const patchProductImagesApi = async (productId, images) => {
    try {
        const response = await api.patch(`/products/${productId}/images`, { images });
        return response.data;
    } catch (error) {
        console.error("Error actualizando imágenes del producto:", error);
        throw error;
    }
};

export const getCategoriesApi = async () => {
    try {
        const response = await api.get("/products/categories");
        return response.data;
    } catch (error) {
        console.error("Error cargando categorías:", error);
        throw error;
    }
};

export const addCategoryApi = async (category) => {
    try {
        const response = await api.post("/products/categories", category);
        return response.data;
    } catch (error) {
        console.error("Error creando categoría:", error);
        throw error;
    }
};

export const updateCategoryApi = async (categoryId, updatedCategory) => {
    try {
        const response = await api.put(`/products/categories/${categoryId}`, updatedCategory);
        return response.data;
    } catch (error) {
        console.error("Error actualizando categoría:", error);
        throw error;
    }
};

export const deleteCategoryApi = async (categoryId) => {
    try {
        const response = await api.delete(`/products/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error eliminando categoría:", error);
        throw error;
    }
};