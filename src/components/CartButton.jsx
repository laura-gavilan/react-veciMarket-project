import { useContext, useCallback } from "react";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../core/auth/useAuth";

export const CartButton = ({ product }) => {
    const { addToCart, cart } = useContext(CartContext);
    const { user } = useAuth();

    if (!user) return null; // solo usuarios logueados pueden añadir

    const isInCart = cart.items?.some((item) => item._id === product._id);

    // Memoizamos la función para que no se recree en cada render
    const handleClick = useCallback(
        (e) => {
            e.stopPropagation();
            addToCart(product);
        },
        [addToCart, product]
    );

    const buttonClasses = `
        px-4 py-2 rounded-xl shadow-md transition-all
        ${isInCart
            ? "bg-burdeos-400 hover:bg-burdeos-500"
            : "bg-[var(--color-mostaza-pastel)] hover:bg-[var(--color-mostaza)]"}
        text-[var(--color-burdeos-dark)]
    `;

    return (
        <button onClick={handleClick} className={buttonClasses}>
            {isInCart ? "➕ Añadir más" : "🛒 Añadir al carrito"}
        </button>
    );
};
