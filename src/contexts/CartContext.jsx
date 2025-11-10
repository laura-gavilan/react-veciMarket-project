import { createContext, useContext, useState, useEffect } from "react";
import {
    createCartApi,
    getCartsApi,
    addItemToCartApi,
    updateCartItemApi,
    deleteCartItemApi,
    checkoutCartApi
} from "../core/cart/cart.api.js";

import {
    getCartsFromLocalStorage,
    addCartToLocalStorage,
    updateCartInLocalStorage,
    addOrUpdateItemInCartLocal,
    deleteItemFromCartLocal,
    mergeGuestCartWithUserCart,
    saveCartsInLocalStorage
} from "../core/cart/cart.service.js";

import { useAuth } from "../core/auth/useAuth.jsx";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const userId = user?._id;

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        setLoading(true);

        if (!userId) {
            const localCarts = getCartsFromLocalStorage(null);
            let activeCart = localCarts[0] || { _id: "guest", items: [] };
            setCart(activeCart);
            setLoading(false);
            return;
        }

        try {
            mergeGuestCartWithUserCart(userId);

            const carts = await getCartsApi(userId);
            let activeCart = carts.find(cart => cart.status === "active" && cart.userId === userId);

            if (!activeCart) {
                activeCart = await createCartApi({ userId, status: "active" });
            }

            setCart(activeCart);
            addCartToLocalStorage(userId, activeCart);
        } catch (error) {
            console.error("Error cargando carrito API:", error);
            const localData = getCartsFromLocalStorage(userId);
            const localCart = localData.find(cart => cart.status === "active" && cart.userId === userId) || null;
            setCart(localCart);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (product, qty = 1) => {
        if (!product?._id) return;

        // Usuario logueado
        if (userId) {
            if (!cart) throw new Error("No hay carrito disponible");
            const payload = { productId: product._id, qty, priceSnapshot: product.price };
            const updatedCart = await addItemToCartApi(cart._id, payload);
            setCart(updatedCart);
            addOrUpdateItemInCartLocal(userId, updatedCart._id, { productId: product, qty });
            return;
        }

        // Guest
        let guestCart = getCartsFromLocalStorage("guest");
        if (!guestCart.length) {
            guestCart = [{ _id: "guest-cart", items: [] }];
            saveCartsInLocalStorage("guest", guestCart);
        }
        const cartId = guestCart[0]._id;

        addOrUpdateItemInCartLocal("guest", cartId, { productId: product, qty });
        setCart(guestCart[0]);
    };



    const updateItem = async (productId, qty) => {
        if (!cart) return;

        if (!userId) {
            addOrUpdateItemInCartLocal(null, cart._id, { productId: product, qty });
            setCart(prev => ({ ...prev }));
        } else {
            const updatedCart = await updateCartItemApi(cart._id, productId, { qty });
            setCart(updatedCart);
            addOrUpdateItemInCartLocal(userId, updatedCart._id, { productId, qty });
        }
    };

    const removeItem = async (productId) => {
        if (!cart) return;

        if (!userId) {
            deleteItemFromCartLocal(null, cart._id, productId);
            setCart(prev => ({ ...prev }));
        } else {
            const updatedCart = await deleteCartItemApi(cart._id, productId);
            setCart(updatedCart.cart || updatedCart);
            deleteItemFromCartLocal(userId, cart._id, productId);
        }
    };

    const clearCart = async () => {
        if (!cart?.items) return;

        for (const item of [...cart.items]) {
            await removeItem(item.productId._id);
        }
    };


    const checkout = async () => {
        if (!userId || !cart || cart.status === "ordered") return null;

        const result = await checkoutCartApi(cart._id);
        setCart(result.cart);
        updateCartInLocalStorage(userId, result.cart);

        const newCart = await createCartApi({ userId, status: "active" });
        setCart(newCart);
        addCartToLocalStorage(userId, newCart);

        return result;
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    return (
        <CartContext.Provider value={{ cart, loading, fetchCart, addItem, updateItem, removeItem, clearCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
};
