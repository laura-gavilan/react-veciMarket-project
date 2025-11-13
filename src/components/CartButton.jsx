import { useCart } from "../core/cart/useCart";

export const CartButton = ({ product }) => {
    const { addItem, loading } = useCart();
    

    const handleAddToCart = async () => {
        if (!product?._id) {
            console.error("Producto no tiene ID válido");
            return;
        }

        try {
            await addItem(product, 1);
            alert(`✅ ${product.name} añadido al carro.`);
        } catch (error) {
            console.error(error);
            alert("⚠️ No se pudo añadir el producto al carro.");
        }
    };

    return (
        <button
            type="button"
            onClick={(event) => {
                event.stopPropagation();
                handleAddToCart();
            }}
            disabled={loading}
            className={`px-4 py-2 rounded transition-colors duration-300 font-medium mt-1 ${loading
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "btn-primary"
                }`}
        >
            {loading ? "Añadiendo..." : "Añadir"}
        </button>
    );
};
