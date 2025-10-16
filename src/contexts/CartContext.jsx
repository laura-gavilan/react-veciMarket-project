import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../core/auth/useAuth";
import { getCartApi, createCartApi, updateCartApi } from "../core/cart/cart.api";

export const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState({ _id: null, userId: null, items: [], total: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?._id) loadCart(user._id);
        else {
            setCart({ _id: null, userId: null, items: [], total: 0 });
            setLoading(false);
        }
    }, [user]);

    const loadCart = async (userId) => {
        setLoading(true);
        try {
            let existingCart = await getCartApi(userId);
            if (!existingCart) {
                existingCart = await createCartApi({ userId, items: [], total: 0, status: "active" });
            }
            setCart(existingCart);
        } catch (error) {
            console.error("Error al cargar el carrito:", error);
            setCart({ _id: null, userId, items: [], total: 0 });
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product) => {
        if (!cart._id) return;

        const itemInCart = cart.items.find(i => i.productId === product._id);
        const updatedItems = itemInCart
            ? cart.items.map(i =>
                i.productId === product._id ? { ...i, quantity: i.quantity + 1 } : i
            )
            : [...cart.items, { productId: product._id, name: product.name, price: product.price, quantity: 1 }];

        const updatedCart = {
            ...cart,
            items: updatedItems,
            total: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0)
        };

        try {
            const savedCart = await updateCartApi(cart._id, updatedCart); // <- usar _id
            setCart(savedCart);
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
        }
    };

    const removeFromCart = async (productId) => {
        if (!cart._id) return;

        const updatedItems = cart.items.filter(i => i.productId !== productId);
        const updatedCart = { ...cart, items: updatedItems, total: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0) };
        try {
            const savedCart = await updateCartApi(cart.id, updatedCart);
            setCart(savedCart);
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
        }
    };

    const clearCart = async () => {
        if (!cart._id) return;

        const clearedCart = { ...cart, items: [], total: 0 };
        try {
            const savedCart = await updateCartApi(cart.id, clearedCart);
            setCart(savedCart);
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};


