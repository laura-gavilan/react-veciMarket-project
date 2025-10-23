const CART_KEY = "carts";

export const getCartsFromLocalStorage = () => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveCartsInLocalStorage = (carts) => {
    localStorage.setItem(CART_KEY, JSON.stringify(carts));
};

export const addCartToLocalStorage = (cart) => {
    const current = getCartsFromLocalStorage();
    saveCartsInLocalStorage([...current, cart]);
};

export const updateCartInLocalStorage = (updatedCart) => {
    const current = getCartsFromLocalStorage();
    const updated = current.map(c => c._id === updatedCart._id ? updatedCart : c);
    saveCartsInLocalStorage(updated);
};

export const addOrUpdateItemInCartLocal = (cartId, item) => {
    const current = getCartsFromLocalStorage();
    const updated = current.map(c => {
        if (c._id === cartId) {
            const exists = c.items.find(i => i.productId._id === item.productId._id);
            if (exists) {
                c.items = c.items.map(i => i.productId._id === item.productId._id ? { ...i, qty: item.qty } : i);
            } else {
                c.items.push(item);
            }
        }
        return c;
    });
    saveCartsInLocalStorage(updated);
};

export const deleteItemFromCartLocal = (cartId, productId) => {
    const current = getCartsFromLocalStorage();
    const updated = current.map(c => {
        if (c._id === cartId) {
            c.items = c.items.filter(i => i.productId.id !== productId);
        }
        return c;
    });
    saveCartsInLocalStorage(updated);
};
