import { createContext, useContext, useState, useEffect } from "react";
import {
    createCartApi,
    getCartsApi,
    getCartByIdApi,
    addItemToCartApi,
    updateCartItemApi,
    deleteCartItemApi,
    checkoutCartApi
} from "../core/cart/cart.api.js";

import {
    getCartsFromLocalStorage,
    saveCartsInLocalStorage,
    addCartToLocalStorage,
    updateCartInLocalStorage,
    addOrUpdateItemInCartLocal,
    deleteItemFromCartLocal
} from "../core/cart/cart.service.js";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, userId }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar carrito desde API o localStorage
    const fetchCart = async () => {
        setLoading(true);
        try {
            let carts = await getCartsApi(userId);
            let activeCart = carts.find(c => c.status === "active");

            if (!activeCart) {
                activeCart = await createCartApi({ userId, status: "active" });
            }

            setCart(activeCart);
            addCartToLocalStorage(activeCart);
        } catch (error) {
            console.error("Error cargando carrito desde API:", error);

            const localData = getCartsFromLocalStorage();
            const localCart =
                localData.find(c => c.userId === userId && c.status === "active") || null;
            setCart(localCart);
        } finally {
            setLoading(false);
        }
    };

    // Añadir item al carrito
    const addItem = async (product, qty = 1) => {
        if (!cart) return;
        try {
            const payload = {
                productId: product._id,
                qty,
                priceSnapshot: product.price
            };
            const updatedCart = await addItemToCartApi(cart._id, payload);
            setCart(updatedCart);
            addOrUpdateItemInCartLocal(cart._id, { productId: product, qty });
        } catch (error) {
            console.error("Error añadiendo producto al carrito:", error);
            alert(error.response?.data?.error || "Error añadiendo producto al carrito");
        }
    };

    // Actualizar cantidad de un item
    const updateItem = async (productId, qty) => {
        if (!cart) return;
        try {
            const updatedCart = await updateCartItemApi(cart._id, productId, { qty });
            setCart(updatedCart);
            addOrUpdateItemInCartLocal(cart._id, { productId, qty });
        } catch (error) {
            console.error("Error actualizando producto en carrito:", error);
            alert(error.response?.data?.error || "Error actualizando producto en carrito");
        }
    };

    // Eliminar item del carrito
    const removeItem = async (productId) => {
        if (!cart) return;
        try {
            const updatedCart = await deleteCartItemApi(cart._id, productId);
            setCart(updatedCart.cart || updatedCart);
            deleteItemFromCartLocal(cart._id, productId);
        } catch (error) {
            console.error("Error eliminando producto del carrito:", error);
            alert(error.response?.data?.error || "Error eliminando producto del carrito");
        }
    };

    // Vaciar carrito
    const clearCart = async () => {
        if (!cart) return;
        try {
            for (const item of cart.items) {
                await removeItem(item.productId._id);
            }
        } catch (error) {
            console.error("Error vaciando carrito:", error);
        }
    };

    // Checkout del carrito
    const checkout = async () => {
        if (!cart) return;

        if (cart.status === "ordered") {
            alert("Este carrito ya fue finalizado.");
            return;
        }

        try {
            const result = await checkoutCartApi(cart._id);
            setCart(result.cart);
            updateCartInLocalStorage(result.cart);

            // Crear un nuevo carrito activo automáticamente
            const newCart = await createCartApi({ userId: cart.userId, status: "active" });
            setCart(newCart);
            addCartToLocalStorage(newCart);

            return result;
        } catch (error) {
            console.error("Error realizando checkout:", error);
            alert(error.response?.data?.error || "Error realizando checkout");
        }
    };

    useEffect(() => {
        fetchCart();
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
