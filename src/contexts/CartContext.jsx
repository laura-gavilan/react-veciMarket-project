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
    deleteItemFromCartLocal
} from "../core/cart/cart.service.js";

import { useAuth } from "../core/auth/useAuth.jsx";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const userId = user?._id;

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar carrito del usuario actual
    const fetchCart = async () => {
        setLoading(true);
        if (!userId) {
            setCart(null);
            setLoading(false);
            return;
        }

        try {
            const carts = await getCartsApi(userId);
            // 🔹 Buscar carrito activo para este usuario
            let activeCart = carts.find(c => c.status === "active" && c.userId === userId);

            // 🔹 Si no existe, crear uno nuevo
            if (!activeCart) {
                activeCart = await createCartApi({ userId, status: "active" });
            }

            setCart(activeCart);
            addCartToLocalStorage(userId, activeCart);
        } catch (error) {
            console.error("Error cargando carrito API:", error);

            // fallback a localStorage
            const localData = getCartsFromLocalStorage(userId);
            const localCart = localData.find(c => c.status === "active" && c.userId === userId) || null;
            setCart(localCart);
        } finally {
            setLoading(false);
        }
    };

    // Añadir producto al carrito
    const addItem = async (product, qty = 1) => {
        if (!userId) throw new Error("Debes iniciar sesión para añadir productos");
        if (!cart) throw new Error("No hay carrito disponible");

        const payload = { productId: product._id, qty, priceSnapshot: product.price };
        const updatedCart = await addItemToCartApi(cart._id, payload);

        setCart(updatedCart);
        addOrUpdateItemInCartLocal(userId, updatedCart._id, { productId: product, qty });
    };

    // Actualizar producto
    const updateItem = async (productId, qty) => {
        if (!userId) throw new Error("Debes iniciar sesión para actualizar el carrito");
        if (!cart) return;

        const updatedCart = await updateCartItemApi(cart._id, productId, { qty });
        setCart(updatedCart);
        addOrUpdateItemInCartLocal(userId, updatedCart._id, { productId, qty });
    };

    // Eliminar producto
    const removeItem = async (productId) => {
        if (!userId) throw new Error("Debes iniciar sesión para eliminar productos");
        if (!cart) return;

        const updatedCart = await deleteCartItemApi(cart._id, productId);
        setCart(updatedCart.cart || updatedCart);
        deleteItemFromCartLocal(userId, cart._id, productId);
    };

    // Vaciar carrito
    const clearCart = async () => {
        if (!userId) throw new Error("Debes iniciar sesión para vaciar el carrito");
        if (!cart?.items) return;

        for (const item of [...cart.items]) {
            await removeItem(item.productId._id);
        }
    };

    // Checkout
    const checkout = async () => {
        if (!userId) throw new Error("Debes iniciar sesión para finalizar la compra");
        if (!cart || cart.status === "ordered") return;

        const result = await checkoutCartApi(cart._id);
        setCart(result.cart);
        updateCartInLocalStorage(userId, result.cart);

        // Crear nuevo carrito activo
        const newCart = await createCartApi({ userId, status: "active" });
        setCart(newCart);
        addCartToLocalStorage(userId, newCart);

        return result;
    };

    // Cargar carrito automáticamente cuando cambia el usuario
    useEffect(() => {
        if (userId) fetchCart();
        else setCart(null); // limpiar carrito si no hay usuario
    }, [userId]);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                fetchCart,
                addItem,
                updateItem,
                removeItem,
                clearCart,
                checkout
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
