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
    clearUserCartsFromLocalStorage,
} from "../core/cart/cart.service.js";

import { useAuth } from "../core/auth/useAuth.jsx";
import { addOrderToLocalStorage } from "../core/orders/orders.service.js";
import { useOrdersContext } from "./OrdersContext.jsx";

import type { Cart, CartContextValue, ChildrenProps, Product } from "../types/types.js";


export const CartContext = createContext<CartContextValue | null>(null);

export const useCart = (): CartContextValue => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};

export const CartProvider = ({ children }: ChildrenProps) => {
    const { user } = useAuth();
    const userId = user?._id;
    const { addOrder } = useOrdersContext();

    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = useCallback((message: string, duration: number = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);

    const storageKey = useMemo(() => (userId ? `cart_${userId}` : "cart_guest"), [userId]);

    const fetchCart = useCallback(async (): Promise<void> => {
        setLoading(true);

        try {
            if (!userId) {
                let guestCart = getCartsFromLocalStorage("guest")?.[0];
                if (!guestCart) {
                    guestCart = {
                        _id: "guest-cart",
                        userId: "guest",
                        status: "active",
                        items: [],
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    saveCartsInLocalStorage("guest", [guestCart]);
                };
                setCart(guestCart);
                return;
            }


            let carts: Cart[] = (await getCartsApi(userId)) || [];
            carts = carts.filter(cart => cart.userId === userId);
            let activeCart: Cart = carts.find(cart => cart.status === "active") || (await createCartApi({ userId, status: "active" }));
            activeCart.items = activeCart.items?.filter(item => item?.productId?._id) || [];

            
            const guestCart = getCartsFromLocalStorage("guest")?.[0];
            if (guestCart?.items?.length) {
                for (const guestItem of guestCart.items) {
                    if (!guestItem?.productId?._id) continue;

                    const existingItem = activeCart.items.find(item => item.productId._id === guestItem.productId._id);
                    if (existingItem) {
                        existingItem.qty += guestItem.qty;
                        await updateCartItemApi(activeCart._id, guestItem.productId._id, { qty: existingItem.qty });
                    } else {
                        activeCart.items.push({ ...guestItem });
                        await addItemToCartApi(activeCart._id, {
                            productId: guestItem.productId._id,
                            qty: guestItem.qty,
                            priceSnapshot: guestItem.priceSnapshot
                        });
                    }
                }
                clearUserCartsFromLocalStorage("guest");
            }

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


    const updateCartState = useCallback((update: (prevCart: Cart) => Cart): Cart | undefined => {
        let newCart: Cart | undefined;
        setCart(prevCart => {
            if (!prevCart) return prevCart;
            newCart = update(prevCart);
            addCartToLocalStorage(userId || "guest", newCart);
            return newCart;
        });
        return newCart;
    }, [userId]);


    const addItem = useCallback(
        async (product: Product, qty: number = 1): Promise<void> => {
            if (!product?._id) return showToast("Producto inválido");

            const newCart = updateCartState(prevCart => {
                const exists = prevCart.items.find(item => item.productId._id === product._id);
                return exists
                    ? { ...prevCart, items: prevCart.items.map(item => item.productId._id === product._id ? { ...item, qty: item.qty + qty } : item) }
                    : { ...prevCart, items: [...prevCart.items, { productId: { ...product }, qty, priceSnapshot: product.price }] };
            });

            try {
                const cartId = newCart?._id || (userId ? undefined : "guest-cart");
                if (userId && cartId) {
                    await addItemToCartApi(cartId, { productId: product._id, qty, priceSnapshot: product.price });
                } else {
                    addOrUpdateItemInCartLocal("guest", "guest-cart", { productId: { ...product }, qty, priceSnapshot: product.price });
                }
            } catch (error) {
                console.error("Error al añadir producto al carrito", error);
                showToast("No se pudo añadir el producto");
            }
        },
        [userId, showToast, updateCartState]
    );

    
    const updateItem = useCallback(
        async (productId: string, qty: number): Promise<void> => {
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
        }, [userId, showToast, updateCartState]);

    
    const removeItem = useCallback(
        async (productId: string): Promise<void> => {
            const newCart = updateCartState(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => item.productId._id !== productId)
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

    const clearCart = useCallback(async (): Promise<void> => {
        if (!cart?.items?.length) return;
        for (const item of [...cart.items]) {
            await removeItem(item.productId._id);
        }
    }, [cart, removeItem]);


    const checkout = useCallback(async (): Promise<unknown> => {
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
        };
        
        const emptyCart: Cart = {
            _id: cart._id || "guest-cart",
            items: [],
            status: "ordered",
            createdAt: cart.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        addOrderToLocalStorage(newOrder);
        await clearCart();
        setCart(emptyCart);
        saveCartsInLocalStorage("guest", [emptyCart]);
        showToast("✅ Compra realizada como invitado. Para ver el estado de tu pedido debes registrarte o iniciar sesión.");

        return newOrder;

    }, [cart, userId, addOrder, clearCart, user, showToast])


    const contextValue = useMemo<CartContextValue>(() => ({
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
