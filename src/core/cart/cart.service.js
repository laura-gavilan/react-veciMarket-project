// cart.service.js
const CART_KEY_PREFIX = "carts_"; // Cada usuario tendrá su propia key: carts_{userId}

// 🔑 Obtener la key de LocalStorage para un usuario
const getCartKey = (userId) => `${CART_KEY_PREFIX}${userId}`;

// 🧠 Obtener todos los carritos de un usuario
export const getCartsFromLocalStorage = (userId) => {
    if (!userId) return [];
    const data = localStorage.getItem(getCartKey(userId));
    return data ? JSON.parse(data) : [];
};

// 💾 Guardar todos los carritos de un usuario
export const saveCartsInLocalStorage = (userId, carts) => {
    if (!userId) return;
    localStorage.setItem(getCartKey(userId), JSON.stringify(carts));
};

// ➕ Añadir un nuevo carrito para un usuario
export const addCartToLocalStorage = (userId, cart) => {
    const current = getCartsFromLocalStorage(userId);
    saveCartsInLocalStorage(userId, [...current, cart]);
};

// 🔄 Actualizar un carrito existente
export const updateCartInLocalStorage = (userId, updatedCart) => {
    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(c => (c._id === updatedCart._id ? updatedCart : c));
    saveCartsInLocalStorage(userId, updated);
};

// 🧮 Añadir o actualizar un item dentro del carrito de un usuario
export const addOrUpdateItemInCartLocal = (userId, cartId, item) => {
    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(c => {
        if (c._id === cartId) {
            // Si ya existe el producto, actualizar cantidad
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

// ❌ Eliminar item de un carrito de un usuario
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

// 🧹 Limpiar todos los carritos de un usuario (opcional)
export const clearUserCartsFromLocalStorage = (userId) => {
    localStorage.removeItem(getCartKey(userId));
};
