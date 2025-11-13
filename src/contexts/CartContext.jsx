import { createContext, useContext, useState, useEffect } from "react";
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
    mergeGuestCartWithUserCart,
    saveCartsInLocalStorage
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

    const fetchCart = async () => {
        setLoading(true);

        const showToast = (message, duration = 3000) => {
            setToast(message);
            setTimeout(() => setToast(null), duration);
        };


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
            mergeGuestCartWithUserCart(userId);

            const carts = await getCartsApi(userId);
            let activeCart = carts.find(c => c.status === "active" && c.userId === userId);

            if (!activeCart) {
                activeCart = await createCartApi({ userId, status: "active" });
            }

            setCart(activeCart);
            addCartToLocalStorage(userId, activeCart);
        } catch (error) {
            console.error("Error cargando carrito API:", error);
            const localData = getCartsFromLocalStorage(userId);
            const localCart = localData.find(c => c.status === "active" && c.userId === userId) || null;
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
        let guestCarts = getCartsFromLocalStorage("guest");
        if (!guestCarts.length) {
            guestCarts = [{
                _id: "guest-cart",
                userId: "guest",
                status: "active",
                items: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }];
            saveCartsInLocalStorage("guest", guestCarts);
        }
        const guestCart = guestCarts[0];

        addOrUpdateItemInCartLocal("guest", guestCart._id, { productId: product, qty, priceSnapshot: product.price });
        setCart(prev => ({
            ...guestCart,
            items: guestCart.items.find(item => item.productId._id === product._id)
                ? guestCart.items.map(item => item.productId._id === product._id ? { ...item, qty } : item)
                : [...guestCart.items, { productId: product, qty, priceSnapshot: product.price }]
        }));
    };



    const updateItem = async (productId, qty) => {
        if (!cart) return;

        if (!userId) {
            addOrUpdateItemInCartLocal("guest", cart._id, { productId, qty });
            setCart(prev => ({
                ...prev,
                items: prev.items.map(i =>
                    i.productId._id === productId ? { ...i, qty } : i
                )
            }));
        } else {
            const updatedCart = await updateCartItemApi(cart._id, productId, { qty });
            setCart(updatedCart);
            addOrUpdateItemInCartLocal(userId, updatedCart._id, { productId, qty });
        }
    };

    const removeItem = async (productId) => {
        if (!cart) return;

        if (!userId) {
            deleteItemFromCartLocal("guest", cart._id, productId);
            setCart(prev => ({
                ...prev,
                items: prev.items.filter(item => item.productId._id !== productId)
            }));
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
        if (!cart || cart.items.length === 0 || cart.status === "ordered") return null;

        const newOrder = {
            userId: user?._id || "guest",
            items: cart.items.map((item) => ({
                productId: item.productId._id,
                name: item.productId.name,
                qty: item.qty,
                price: item.priceSnapshot
            })),
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        if (user?._id && addOrder) {
            // Usuario logueado: enviamos a API y agregamos al estado global
            try {
                const result = await addOrder(newOrder); // Agrega al estado global de OrdersContext
                await clearCart(); // limpiar carrito
                const newCart = await createCartApi({ userId, status: "active" });
                setCart(newCart);
                addCartToLocalStorage(userId, newCart);
                return result;
            } catch (error) {
                console.error("Error al crear la orden del usuario:", error);
                return null;
            }
        } else {
            // Invitado: solo guardamos localmente
            addOrderToLocalStorage(newOrder);
            await clearCart();
            setCart((prev) => ({
                ...prev,
                items: [],
                status: "ordered",
                updatedAt: new Date().toISOString()
            }));
            saveCartsInLocalStorage("guest", [{ ...cart, items: [], status: "ordered", updatedAt: new Date().toISOString() }]);
            showToast("✅ Compra realizada como invitado. Para ver el estado de tu pedido debes registrarte o iniciar sesión.");
            return newOrder;
        }
    };


    useEffect(() => {
        fetchCart();
    }, [userId]);



    return (
        <CartContext.Provider value={{ cart, loading, fetchCart, addItem, updateItem, removeItem, clearCart, checkout }}>
            {children}
            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </CartContext.Provider>
    );
};

