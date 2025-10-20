import { createContext, useEffect, useState } from "react";
import { createCartApi } from "../core/cart/cart.api.js";
import { getCartFromLocalStorage, saveCartInLocalStorage } from "../core/cart/cart.service.js";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ id: null, items: [] });

    useEffect(() => {
        const initCart = async () => {
            const storedCart = getCartFromLocalStorage();

            if (storedCart?.id) {
                setCart(storedCart);
            } else {
                try {
                    const response = await createCartApi();
                    const newCart = { id: response._id || response.id, items: response.items || [] };

                    saveCartInLocalStorage(newCart);
                    setCart(newCart);
                } catch (error) {
                    console.error("Error creando carrito:", error);
                }
            }
        };

        initCart();
    }, []);

    const addToCart = (product) => {
        const existingItem = cart.items.find(i => i._id === product._id);
        const updatedItems = existingItem
            ? cart.items.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
            : [...cart.items, { ...product, quantity: 1 }];

        const updatedCart = { ...cart, items: updatedItems };
        setCart(updatedCart);
        saveCartInLocalStorage(updatedCart);
    };

    const updateCartItem = (productId, quantity) => {
        const updatedItems = cart.items.map(i =>
            i._id === productId ? { ...i, quantity } : i
        );
        const updatedCart = { ...cart, items: updatedItems };
        setCart(updatedCart);
        saveCartInLocalStorage(updatedCart);
    };

    const deleteFromCart = (productId) => {
        const updatedItems = cart.items.filter(i => i._id !== productId);
        const updatedCart = { ...cart, items: updatedItems };
        setCart(updatedCart);
        saveCartInLocalStorage(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItem, deleteFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
