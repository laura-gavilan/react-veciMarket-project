const CART_KEY_ID = "carts_";
const GUEST_CART_KEY = "guest_cart";

const getCartKey = (userId) => {
    return userId ? `${CART_KEY_ID}${userId}` : GUEST_CART_KEY;
};

export const getCartsFromLocalStorage = (userId) => {
    const data = localStorage.getItem(getCartKey(userId));
    return data ? JSON.parse(data) : [];
};

export const saveCartsInLocalStorage = (userId, carts) => {
    localStorage.setItem(getCartKey(userId), JSON.stringify(carts));
};


export const addCartToLocalStorage = (userId, cart) => {
    const current = getCartsFromLocalStorage(userId);
    saveCartsInLocalStorage(userId, [...current, cart]);
};


export const updateCartInLocalStorage = (userId, updatedCart) => {
    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(cart => (cart._id === updatedCart._id ? updatedCart : cart));
    saveCartsInLocalStorage(userId, updated);
};


export const addOrUpdateItemInCartLocal = (userId, cartId, item) => {
    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(cart => {
        if (!cart) return cart;
        if (cart._id === cartId) {
            const exists = cart.items.find(cartItem => cartItem.productId._id === item.productId._id);
            if (exists) {
                cart.items = cart.items.map(cartItem =>
                    cartItem.productId._id === item.productId._id
                        ? { ...cartItem, qty: item.qty, priceSnapshot: item.priceSnapshot || cartItem.priceSnapshot || cartItem.productId.price || 0 }
                        : cartItem
                );
            } else {
                cart.items.push({
                    ...item,
                    priceSnapshot: item.priceSnapshot || item.productId.price || 0
                });
            }
        }
        return cart;
    });
    saveCartsInLocalStorage(userId, updated);
};

export const deleteItemFromCartLocal = (userId, cartId, productId) => {
    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(cart => {
        if (cart._id === cartId) {
            cart.items = cart.items.filter(cartItem => cartItem.productId._id !== productId);
        }
        return cart;
    });
    saveCartsInLocalStorage(userId, updated);
};

export const clearUserCartsFromLocalStorage = (userId) => {
    localStorage.removeItem(getCartKey(userId));
};

// 🔹 (Opcional) Fusionar carrito de invitado con el del usuario logueado
export const mergeGuestCartWithUserCart = (userId) => {
    if (!userId) return;

    const guestCart = getCartsFromLocalStorage(null);
    const userCart = getCartsFromLocalStorage(userId);

    if (guestCart.length > 0) {
        const merged = [...userCart, ...guestCart];
        saveCartsInLocalStorage(userId, merged);
        clearUserCartsFromLocalStorage(null); // Limpiar carrito del invitado
    }
};

