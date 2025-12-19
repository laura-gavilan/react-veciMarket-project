import { memo, useCallback, useState } from "react";
import { useCart } from "../core/cart/useCart";
import { useTranslate } from "../translations/locales/useTranslate";

export const CartButton = memo(({ product }) => {
    const { addItem, loading } = useCart();
    const [toast, setToast] = useState(null);
    const {t} = useTranslate();

    const showToast = useCallback((message, duration = 2000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);


    const handleAddToCart = useCallback(async () => {
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
            showToast(t("toast.error_no_product_cart"));
        }
    }, [product, addItem, showToast]);

    const handleClick = useCallback((event) => {
        event.stopPropagation();
        handleAddToCart();
    }, [handleAddToCart]);

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                disabled={loading}
                className={`px-2 py-1 text-sm rounded transition-colors duration-300 font-medium mt-1 ${loading
                    ? "bg-gray-400 cursor-not-allowed text-gray-600"
                    : "btn-primary"
                    }`}
            >
                {loading ? (t("cart.adding")) : (t("cart.add"))}
            </button>

            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </>
    );
});
