import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
    createCartApi,
    getCartsApi,
    getCartByIdApi,
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
    clearUserCartsFromLocalStorage,
} from "../core/cart/cart.service.js";

import { useAuth } from "../core/auth/useAuth.jsx";
import { addOrderToLocalStorage } from "../core/orders/orders.service.js";
import { useOrdersContext } from "./OrdersContext.jsx";

// -------------------------------
// Context
// -------------------------------
export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const userId = user?._id;
    const { addOrder } = useOrdersContext();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, duration = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);

    const storageKey = useMemo(() => (userId ? `cart_${userId}` : "cart_guest"), [userId]);

    // -------------------------------
    // Fetch / Merge Carrito
    // -------------------------------
    const fetchCart = useCallback(async () => {
        setLoading(true);

        try {
            if (!userId) {
                // Carrito de invitado
                let guestCart = getCartsFromLocalStorage("cart_guest")?.[0];
                if (!guestCart) {
                    guestCart = {
                        _id: "guest-cart",
                        userId: "guest",
                        status: "active",
                        items: [],
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    saveCartsInLocalStorage("cart_guest", [guestCart]);
                }
                setCart(guestCart);
                return;
            }

            // Carrito de usuario logueado
            let carts = (await getCartsApi(userId)) || [];
            carts = carts.filter(c => c.userId === userId);
            let activeCart = carts.find(c => c.status === "active") || (await createCartApi({ userId, status: "active" }));

            activeCart.items = activeCart.items?.filter(i => i?.productId?._id) || [];

            // Merge carrito invitado directamente
            const guestCart = getCartsFromLocalStorage("cart_guest")?.[0];
            if (guestCart?.items?.length) {
                for (const guestItem of guestCart.items) {
                    if (!guestItem?.productId?._id) continue;

                    const existingItem = activeCart.items.find(i => i.productId._id === guestItem.productId._id);

                    try {
                        if (existingItem) {
                            // Sumar cantidades
                            const newQty = existingItem.qty + guestItem.qty;
                            await updateCartItemApi(activeCart._id, guestItem.productId._id, { qty: newQty });

                            // Actualizar en memoria
                            existingItem.qty = newQty;
                        } else {
                            // Añadir item nuevo
                            await addItemToCartApi(activeCart._id, {
                                productId: guestItem.productId._id,
                                qty: guestItem.qty,
                                priceSnapshot: guestItem.priceSnapshot
                            });

                            // Añadir a memoria
                            activeCart.items.push({ ...guestItem });
                        }
                    } catch (error) {
                        console.error("Error al mergear item del carrito:", error);
                    }
                }

                // Limpiar carrito invitado
                clearUserCartsFromLocalStorage("cart_guest");

                // Refrescar carrito activo desde API
                activeCart = await getCartByIdApi(activeCart._id);
            }

            // Guardar en state y LocalStorage
            setCart(activeCart);
            addCartToLocalStorage(userId, activeCart);

        } catch (error) {
            console.error("Error cargando carrito:", error);
            const localCart = getCartsFromLocalStorage(storageKey)?.[0];
            setCart(localCart || { items: [], status: "active" });
        } finally {
            setLoading(false);
        }
    }, [userId, storageKey]);


    // -------------------------------
    // Helper para actualizar carrito
    // -------------------------------
    const updateCartState = useCallback(
        (callback) => {
            let newCart;
            setCart(prevCart => {
                if (!prevCart) return prevCart;
                newCart = callback(prevCart);
                addCartToLocalStorage(userId || "guest", newCart);
                return newCart;
            });
            return newCart;
        },
        [userId]
    );

    // -------------------------------
    // Añadir producto
    // -------------------------------
    const addItem = useCallback(
        async (product, qty = 1) => {
            if (!product?._id) return showToast("Producto inválido");

            const newCart = updateCartState(prevCart => {
                const exists = prevCart.items.find(i => i.productId._id === product._id);
                return exists
                    ? { ...prevCart, items: prevCart.items.map(i => i.productId._id === product._id ? { ...i, qty: i.qty + qty } : i) }
                    : { ...prevCart, items: [...prevCart.items, { productId: { _id: product._id, ...product }, qty, priceSnapshot: product.price }] };
            });

            try {
                const cartId = newCart?._id || (userId ? undefined : "guest-cart");
                if (userId && cartId) {
                    await addItemToCartApi(cartId, { productId: product._id, qty, priceSnapshot: product.price });
                } else {
                    addOrUpdateItemInCartLocal("guest", "guest-cart", { productId: { _id: product._id, ...product }, qty, priceSnapshot: product.price });
                }
            } catch (error) {
                console.error("Error al añadir producto al carrito", error);
                showToast("No se pudo añadir el producto");
            }
        },
        [userId, showToast, updateCartState]
    );

    // -------------------------------
    // Actualizar producto
    // -------------------------------
    const updateItem = useCallback(
        async (productId, qty) => {
            const newCart = updateCartState(prevCart => ({
                ...prevCart,
                items: prevCart.items.map(item => item.productId._id === productId ? { ...item, qty } : item)
            }));

            try {
                const cartId = newCart?._id || (userId ? undefined : "guest-cart");
                if (userId && cartId) {
                    await updateCartItemApi(cartId, productId, { qty });
                } else {
                    addOrUpdateItemInCartLocal("guest", "guest-cart", { productId, qty });
                }
            } catch (error) {
                console.error("Error al actualizar producto", error);
                showToast("No se pudo actualizar el producto");
            }
        },
        [userId, showToast, updateCartState]
    );

    // -------------------------------
    // Eliminar producto
    // -------------------------------
    const removeItem = useCallback(
        async (productId) => {
            const newCart = updateCartState(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(i => i.productId._id !== productId)
            }));

            try {
                const cartId = newCart?._id || (userId ? undefined : "guest-cart");
                if (userId && cartId) {
                    await deleteCartItemApi(cartId, productId);
                } else {
                    deleteItemFromCartLocal("guest", "guest-cart", productId);
                }
            } catch (error) {
                console.error("Error al eliminar producto", error);
                showToast("No se pudo eliminar el producto");
            }
        },
        [userId, showToast, updateCartState]
    );

    // -------------------------------
    // Vaciar carrito
    // -------------------------------
    const clearCart = useCallback(async () => {
        if (!cart?.items?.length) return;
        for (const item of [...cart.items]) {
            await removeItem(item.productId._id);
        }
    }, [cart, removeItem]);

    // -------------------------------
    // Checkout
    // -------------------------------
    const checkout = useCallback(async () => {
        if (!cart || !cart.items.length || cart.status === "ordered") return null;

        const newOrder = {
            userId: user?._id || "guest",
            items: cart.items.map(i => ({
                productId: i.productId._id,
                name: i.productId.name,
                qty: i.qty,
                price: i.priceSnapshot,
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
            saveCartsInLocalStorage("cart_guest", [emptyCart]);
            showToast("✅ Compra realizada como invitado. Para ver el estado de tu pedido debes registrarte o iniciar sesión.");
            return newOrder;
        }
    }, [cart, userId, addOrder, clearCart, user, showToast]);

    // -------------------------------
    // Context value
    // -------------------------------
    const contextValue = useMemo(() => ({
        cart,
        loading,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        checkout
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
