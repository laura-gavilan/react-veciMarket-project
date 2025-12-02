import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
    createCartApi,
    getCartsApi,
    addItemToCartApi,
    updateCartItemApi,
    deleteCartItemApi,
} from "../core/cart/cart.api.js";

import {
    getCartsFromLocalStorage,
    addCartToLocalStorage,
    addOrUpdateItemInCartLocal,
    deleteItemFromCartLocal,
    saveCartsInLocalStorage,
    clearUserCartsFromLocalStorage
} from "../core/cart/cart.service.js";

import { useAuth } from "../core/auth/useAuth.jsx";
import { addOrderToLocalStorage } from "../core/orders/orders.service.js";
import { useOrdersContext } from "./OrdersContext.jsx";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const userId = user?._id;

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addOrder } = useOrdersContext();
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, duration = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);

    const fetchCart = useCallback(async () => {
        setLoading(true);

        if (!userId) {
            let guestCart = getCartsFromLocalStorage("guest");
            if (!guestCart.length) {
                guestCart = [{
                    _id: "guest-cart",
                    userId: "guest",
                    status: "active",
                    items: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }];
                saveCartsInLocalStorage("guest", guestCart);
            }
            setCart(guestCart[0]);
            setLoading(false);
            return;
        }

        try {
            let carts = await getCartsApi(userId);
            if (!Array.isArray(carts)) carts = [];

            let activeCart = carts.find(cart => cart && cart.status === "active" && cart.userId === userId);
            if (!activeCart) {
                activeCart = await createCartApi({ userId, status: "active" });
            }

            activeCart.items = activeCart.items?.filter(i => i?.productId?._id) || [];

            const guestCart = getCartsFromLocalStorage("guest")[0];
            if (guestCart?.items?.length) {
                for (const item of guestCart.items) {
                    const exists = activeCart.items.find(item => item.productId._id === item.productId._id);
                    if (!exists) {
                        await addItemToCartApi(activeCart._id, {
                            productId: item.productId._id,
                            qty: item.qty,
                            priceSnapshot: item.priceSnapshot
                        });
                    }
                }
                carts = await getCartsApi(userId);
                activeCart = carts.find(c => c.status === "active");
                clearUserCartsFromLocalStorage("guest");
            }

            setCart(activeCart);
            addCartToLocalStorage(userId, activeCart);
        } catch (error) {
            console.error("Error cargando carrito API:", error);
            const localCart = getCartsFromLocalStorage(userId)
                .find(cart => cart.status === "active" && cart.userId === userId) || { items: [] };
            setCart(localCart);
        } finally {
            setLoading(false);
        }
    }, [userId]);


    const addItem = useCallback(async (product, qty = 1) => {
        if (!product?._id) {
            showToast("Producto inválido");
            return;
        }

        if (!cart) return showToast("No hay carrito disponible");


        setCart(prev => {
            const exists = prev.items.find(item => item.productId._id === product._id);
            if (exists) {
                return {
                    ...prev,
                    items: prev.items.map(item =>
                        item.productId._id === product._id
                            ? { ...item, qty: item.qty + qty }
                            : item
                    )
                };
            } else {
                return {
                    ...prev,
                    items: [...prev.items, { productId: { _id: product._id, ...product }, qty, priceSnapshot: product.price }]
                };
            }
        });


        try {
            if (userId) {
                const payload = { productId: product._id, qty, priceSnapshot: product.price };
                await addItemToCartApi(cart._id, payload);
                const carts = await getCartsApi(userId);
                const updatedCart = carts.find(c => c.status === "active");
                setCart(updatedCart);
                addCartToLocalStorage(userId, updatedCart);
            } else {
                addOrUpdateItemInCartLocal("guest", cart._id, { productId: { _id: product._id, ...product }, qty, priceSnapshot: product.price });
            }
        } catch (error) {
            console.error("Error al añadir producto al carrito", error);
            showToast("No se pudo añadir el producto");
        }
    }, [cart, userId, showToast]);


    const updateItem = useCallback(async (productId, qty) => {
        if (!cart) return;

        setCart(prev => ({
            ...prev,
            items: prev.items.map(i =>
                i.productId._id === productId ? { ...i, qty } : i
            )
        }));

        try {
            if (userId) {
                await updateCartItemApi(cart._id, productId, { qty });
                const carts = await getCartsApi(userId);
                const updatedCart = carts.find(cart => cart.status === "active");
                setCart(updatedCart);
                addCartToLocalStorage(userId, updatedCart);
            } else {
                addOrUpdateItemInCartLocal("guest", cart._id, { productId, qty });
            }
        } catch (error) {
            console.error("Error al actualizar el carrito", error);
            showToast("No se pudo actualizar el producto");
        }
    }, [cart, userId, showToast]);



    const removeItem = useCallback(async (productId) => {
        if (!cart) return;

        setCart(prev => ({
            ...prev,
            items: prev.items.filter(item => item.productId._id !== productId)
        }));

        try {
            if (userId) {
                await deleteCartItemApi(cart._id, productId);
                const carts = await getCartsApi(userId);
                const updatedCart = carts.find(cart => cart.status === "active");
                setCart(updatedCart);
                deleteItemFromCartLocal(userId, cart._id, productId);
            } else {
                deleteItemFromCartLocal("guest", cart._id, productId);
            }
        } catch (error) {
            console.error("Error al eliminar producto del carrito", error);
            showToast("No se pudo eliminar el producto");
        }
    }, [cart, userId, showToast]);


    const clearCart = useCallback(async () => {
        if (!cart?.items) return;
        for (const item of [...cart.items]) {
            await removeItem(item.productId._id);
        }
    }, [cart, removeItem]);

    const checkout = useCallback(async () => {
        if (!cart || cart.items.length === 0 || cart.status === "ordered") return null;

        const newOrder = {
            userId: user?._id || "guest",
            items: cart.items.map(i => ({
                productId: i.productId._id,
                name: i.productId.name,
                qty: i.qty,
                price: i.priceSnapshot
            })),
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        if (user?._id && addOrder) {
            try {
                const result = await addOrder(newOrder);
                await clearCart();
                const newCart = await createCartApi({ userId, status: "active" });
                setCart(newCart);
                addCartToLocalStorage(userId, newCart);
                return result;
            } catch (error) {
                console.error("Error al crear la orden del usuario:", error);
                return null;
            }
        } else {
            addOrderToLocalStorage(newOrder);
            await clearCart();
            const emptyCart = { ...cart, items: [], status: "ordered", updatedAt: new Date().toISOString() };
            setCart(emptyCart);
            saveCartsInLocalStorage("guest", [emptyCart]);
            showToast("✅ Compra realizada como invitado. Para ver el estado de tu pedido debes registrarte o iniciar sesión.");
            return newOrder;
        }
    }, [cart, userId, addOrder, clearCart, user, showToast]);

    const contextValue = useMemo(() => ({
        cart, loading, fetchCart, addItem, updateItem, removeItem, clearCart, checkout
    }), [cart, loading, fetchCart, addItem, updateItem, removeItem, clearCart, checkout]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </CartContext.Provider>
    );
};
