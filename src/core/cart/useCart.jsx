import { useCallback, useContext, useMemo } from "react";
import { CartContext } from "../../contexts/CartContext";


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");

    const { cart, loading, addItem, updateItem, removeItem, checkout } = context;

    const getItemQty = useCallback((productId) => {
        if (!cart?.items?.length) return 0;
        const item = cart.items.find(i => i?.productId?._id === productId);
        return item?.qty || 0;
    }, [cart]);

    // Total de todos los items en el carrito
    const getTotalItems = useCallback(() => {
        if (!cart?.items?.length) return 0;
        return cart.items.reduce((sum, item) => sum + (item?.qty || 0), 0);
    }, [cart]);

    const valueMemo = useMemo(() => ({
        cart, loading, addItem, updateItem, removeItem, checkout, getItemQty, getTotalItems
    }), [cart, loading, addItem, updateItem, removeItem, checkout, getItemQty, getTotalItems]);

    return valueMemo;
};
