import { useState } from "react";
import { useCart } from "../core/cart/useCart";

export const CartButton = ({ product }) => {
    const { addItem, loading } = useCart();
    const [toast, setToast] = useState(null);

    const showToast = (message, duration = 2000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    };


    const handleAddToCart = async () => {
        if (!product?._id) {
            console.error("Producto no tiene ID válido");
            showToast("Producto inválido");
            return;
        }

        try {
            await addItem(product, 1);
            showToast(`✅ ${product.name} añadido al carro`);
        } catch (error) {
            console.error(error);
            showToast("⚠️ No se pudo añadir al carro");
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    handleAddToCart();
                }}
                disabled={loading}
                className={`px-2 py-1 text-sm rounded transition-colors duration-300 font-medium mt-1 ${loading
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "btn-primary"
                    }`}
            >
                {loading ? "Añadiendo..." : "Añadir"}
            </button>

            {/* Toast flotante */}
            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </>
    );
};
