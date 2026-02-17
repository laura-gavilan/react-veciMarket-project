import type { CartItemsType } from "../../components/CartItems";
import type { Cart } from "../../types/types";

const CART_KEY_ID = "carts_";
const GUEST_CART_KEY = "guest_cart";

const getCartKey = (userId: string): string => {
    if (!userId || userId === "guest") return GUEST_CART_KEY;
    return `${CART_KEY_ID}${userId}`;
};

export const getCartsFromLocalStorage = (userId: string): Cart[] => {
    const data = localStorage.getItem(getCartKey(userId));
    return data ? JSON.parse(data) : [];
};

export const saveCartsInLocalStorage = (userId: string, carts: Cart[]): void => {
    localStorage.setItem(getCartKey(userId), JSON.stringify(carts));
};


export const addCartToLocalStorage = (userId: string, cart: Cart) : void=> {
    if (!cart?._id) return;
    const current = getCartsFromLocalStorage(userId);
    const exists = current.find(cart => cart._id === cart._id);
    if (exists) {
        const updated = current.map(cart => cart._id === cart._id ? cart : cart);
        saveCartsInLocalStorage(userId, updated);
    } else {
        saveCartsInLocalStorage(userId, [...current, cart]);
    }
};


export const updateCartInLocalStorage = (userId: string, updatedCart: Cart): void => {
    if (!updatedCart?._id) return;
    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(cart => (cart._id === updatedCart._id ? updatedCart : cart));
    saveCartsInLocalStorage(userId, updated);
};


export const addOrUpdateItemInCartLocal = (userId: string, cartId: string, item: CartItemsType): void => {
    if (!item?.productId?._id || !cartId) return;

    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(cart => {
        if (!cart?._id || !Array.isArray(cart.items)) return cart;

        if (cart._id === cartId) {
            const exists = cart.items.find(cartItem => cartItem.productId?._id === item.productId._id);
            if (exists) {
                cart.items = cart.items.map(cartItem =>
                    cartItem.productId?._id === item.productId._id
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

export const deleteItemFromCartLocal = (userId: string, cartId: string, productId: string): void => {
    if (!cartId || !productId) return;
    const current = getCartsFromLocalStorage(userId);
    const updated = current.map(cart => {
        if (cart._id === cartId) {
            cart.items = cart.items.filter(cartItem => cartItem.productId?._id !== productId);
        }
        return cart;
    });
    saveCartsInLocalStorage(userId, updated);
};

export const clearUserCartsFromLocalStorage = (userId: string) => {
    localStorage.removeItem(getCartKey(userId));
};



