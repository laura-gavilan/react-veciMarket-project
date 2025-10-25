import { useAuth } from "../core/auth/useAuth";
import { useCart } from "../core/cart/useCart";

export const CartButton = ({ product }) => {
    const { addItem, loading } = useCart();
    const { user } = useAuth();

    const handleAddToCart = async () => {
        if (!user) {
            alert("Debes iniciar sesión para añadir productos al carrito");
            return;
        }

        if (!product?._id) {
            console.error("Producto no tiene ID válido");
            return;
        }

        try {
            await addItem(product, 1);
            alert(`✅ ${product.name} añadido al carrito.`);
        } catch (error) {
            console.error(error);
            alert("⚠️ No se pudo añadir el producto al carrito.");
        }
    };

    return (
        <button
            type="button"
            onClick={handleAddToCart}
            disabled={loading}
            className={`px-4 py-2 rounded transition-colors duration-300 font-medium mt-1 ${loading
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza)] hover:bg-[var(--color-burdeos-light)]"
                }`}
        >
            {loading ? "Añadiendo..." : "🛒 Añadir"}
        </button>
    );
};
