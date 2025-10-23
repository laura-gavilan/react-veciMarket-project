import { useCart } from "../core/cart/useCart";

export const CartButton = ({ product }) => {
    const { addItem, loading } = useCart();

    const handleAddToCart = async () => {
        console.log("Producto que se va a añadir:", product);
    console.log("ID que se enviará:", product._id);
        if (!product?._id) {
            console.error("❌ El producto no tiene un ID válido.");
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
            className={`px-4 py-2 rounded transition ${
                loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
            {loading ? "Añadiendo..." : "🛒 Añadir al carrito"}
        </button>
    );
};
