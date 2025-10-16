import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth/useAuth";
import { useCart } from "../core/cart/useCart";


export const CartButton = ({ product }) => {
    const { user } = useAuth();
    const { addToCart, loading } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (event) => {
        event.stopPropagation();
        if (!user?._id) {
            alert("Debes iniciar sesión para añadir productos al carrito");
            return navigate("/login");
        }
        addToCart(product);
    };

    return (
        <button onClick={handleAddToCart} disabled={loading} className="btn-secondary">
            {loading ? "Añadiendo..." : "🛒 Añadir al carrito"}
        </button>
    );
};