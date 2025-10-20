// cart.service.js

// Guardar carrito en localStorage
export const saveCartInLocalStorage = (cart) => {
    try {
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Carrito guardado en localStorage:", cart);
    } catch (error) {
        console.error("Error guardando carrito en localStorage:", error);
    }
};

// Recuperar carrito de localStorage
export const getCartFromLocalStorage = () => {
    try {
        const cart = localStorage.getItem("cart");
        if (!cart) return null;
        return JSON.parse(cart);
    } catch (error) {
        console.error("Error leyendo carrito de localStorage:", error);
        return null;
    }
};

// Eliminar carrito de localStorage
export const removeCartFromLocalStorage = () => {
    try {
        localStorage.removeItem("cart");
        console.log("Carrito eliminado de localStorage");
    } catch (error) {
        console.error("Error eliminando carrito de localStorage:", error);
    }
};

// Actualizar un producto en el carrito de localStorage
export const updateCartItemInLocalStorage = (productId, quantity) => {
    try {
        const cart = getCartFromLocalStorage();
        if (!cart) return null;

        const updatedItems = cart.items.map((item) =>
            item._id === productId ? { ...item, quantity } : item
        );

        const updatedCart = { ...cart, items: updatedItems };
        saveCartInLocalStorage(updatedCart);
        return updatedCart;
    } catch (error) {
        console.error("Error actualizando producto en localStorage:", error);
        return null;
    }
};

// Agregar un producto al carrito de localStorage
export const addItemToLocalStorageCart = (product) => {
    try {
        const cart = getCartFromLocalStorage() || { id: null, items: [] };

        const existingItem = cart.items.find((item) => item._id === product._id);
        let updatedItems;

        if (existingItem) {
            updatedItems = cart.items.map((item) =>
                item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedItems = [...cart.items, { ...product, quantity: 1 }];
        }

        const updatedCart = { ...cart, items: updatedItems };
        saveCartInLocalStorage(updatedCart);
        return updatedCart;
    } catch (error) {
        console.error("Error agregando producto al carrito en localStorage:", error);
        return null;
    }
};

// Eliminar un producto del carrito de localStorage
export const removeItemFromLocalStorageCart = (productId) => {
    try {
        const cart = getCartFromLocalStorage();
        if (!cart) return null;

        const updatedItems = cart.items.filter((item) => item._id !== productId);
        const updatedCart = { ...cart, items: updatedItems };
        saveCartInLocalStorage(updatedCart);
        return updatedCart;
    } catch (error) {
        console.error("Error eliminando producto del carrito en localStorage:", error);
        return null;
    }
};
