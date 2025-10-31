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
    const updated = current.map(c => (c._id === updatedCart._id ? updatedCart : c));
    saveCartsInLocalStorage(userId, updated);
};


export const addOrUpdateItemInCartLocal = (userId, cartId, item) => {
    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(c => {
        if (c._id === cartId) {
            const exists = c.items.find(i => i.productId._id === item.productId._id);
            if (exists) {
                c.items = c.items.map(i =>
                    i.productId._id === item.productId._id
                        ? { ...i, qty: item.qty }
                        : i
                );
            } else {
                c.items.push(item);
            }
        }
        return c;
    });
    saveCartsInLocalStorage(userId, updated);
};

export const deleteItemFromCartLocal = (userId, cartId, productId) => {
    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(c => {
        if (c._id === cartId) {
            c.items = c.items.filter(i => i.productId._id !== productId);
        }
        return c;
    });
    saveCartsInLocalStorage(userId, updated);
};

export const clearUserCartsFromLocalStorage = (userId) => {
    localStorage.removeItem(getCartKey(userId));
};
