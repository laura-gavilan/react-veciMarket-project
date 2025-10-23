import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");

    const { cart, loading, addItem, updateItem, removeItem, checkout } = context;

    const getItemQty = (productId) => {
        return cart?.items?.find(item => item.productId._id === productId)?.qty || 0;
    };

    const getTotalItems = () => {
        return cart?.items?.reduce((sum, item) => sum + item.qty, 0) || 0;
    };

    return {
        cart,
        loading,
        addItem,
        updateItem,
        removeItem,
        checkout,
        getItemQty,
        getTotalItems
    };
};
