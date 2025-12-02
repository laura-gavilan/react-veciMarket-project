import { useCallback, useContext, useMemo } from "react";
import { CartContext } from "../../contexts/CartContext";


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");

    const { cart, loading, addItem, updateItem, removeItem, checkout } = context;

    const getItemQty = useCallback((productId) => {
        return cart?.items?.find(item => item.productId._id === productId)?.qty || 0;
    }, [cart]);

    const getTotalItems = useCallback(() => {
        return cart?.items?.reduce((sum, item) => sum + item.qty, 0) || 0;
    }, [cart]);

    const valueMemo = useMemo(() => ({
        cart, loading, addItem, updateItem, removeItem, checkout, getItemQty, getTotalItems
    }), [cart, loading, addItem, updateItem, removeItem, checkout, getItemQty, getTotalItems]);

    return valueMemo;
};
