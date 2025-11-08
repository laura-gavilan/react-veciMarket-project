const CART_KEY_ID = "carts_"; 

const getCartKey = (userId) => `${CART_KEY_ID}${userId}`;

export const getCartsFromLocalStorage = (userId) => {
    if (!userId) return [];
    const data = localStorage.getItem(getCartKey(userId));
    return data ? JSON.parse(data) : [];
};

export const saveCartsInLocalStorage = (userId, carts) => {
    if (!userId) return;
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
        if (cart._id === cartId) {
            const exists = cart.items.find(cartItem => cartItem.productId._id === item.productId._id);
            if (exists) {
                cart.items = cart.items.map(cartItem =>
                    cartItem.productId._id === item.productId._id
                        ? { ...cartItem, qty: item.qty }
                        : cartItem
                );
            } else {
                cart.items.push(item);
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
