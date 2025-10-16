const CART_KEY = "cart";

// 🧭 Obtener carrito desde localStorage
export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : { products: [], total: 0 };
};

// 💾 Guardar carrito en localStorage
export const saveCartInLocalStorage = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// 🛒 Añadir producto al carrito local
export const addProductToLocalCart = (product) => {
    const cart = getCartFromLocalStorage();
    const existingProduct = cart.products.find((p) => p._id === product._id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.products.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            images: product.images,
        });
    }

    cart.total = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    saveCartInLocalStorage(cart);
    return cart;
};

// ➖ Eliminar un producto del carrito local
export const removeProductFromLocalCart = (productId) => {
    const cart = getCartFromLocalStorage();
    const updatedProducts = cart.products.filter((p) => p._id !== productId);
    const total = updatedProducts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const updatedCart = { ...cart, products: updatedProducts, total };
    saveCartInLocalStorage(updatedCart);
    return updatedCart;
};

// 🧹 Vaciar carrito local
export const clearLocalCart = () => {
    const emptyCart = { products: [], total: 0 };
    saveCartInLocalStorage(emptyCart);
    return emptyCart;
};