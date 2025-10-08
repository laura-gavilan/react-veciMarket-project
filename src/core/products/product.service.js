export const saveProductsInLocalStorage = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
};

export const getProductsFromLocalStorage = () => {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : [];
};

export const addProductToLocalStorage = (product) => {
    const products = getProductsFromLocalStorage();
    products.push(product);
    saveProductsInLocalStorage(products);
};

export const updateProductInLocalStorage = (updatedProduct) => {
    const products = getProductsFromLocalStorage();
    const newProducts = products.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p
    );
    saveProductsInLocalStorage(newProducts);
};

export const patchProductImagesInLocalStorage = (productId, images) => {
    const products = getProductsFromLocalStorage();
    const newProducts = products.map((p) =>
        p._id === productId ? { ...p, images } : p
    );
    saveProductsInLocalStorage(newProducts);
};

export const deleteProductFromLocalStorage = (productId) => {
    const products = getProductsFromLocalStorage();
    const newProducts = products.filter((p) => p._id !== productId);
    saveProductsInLocalStorage(newProducts);
};


export const saveCategoriesInLocalStorage = (categories) => {
    localStorage.setItem("categories", JSON.stringify(categories));
};

export const getCategoriesFromLocalStorage = () => {
    const data = localStorage.getItem("categories");
    return data ? JSON.parse(data) : [];
};