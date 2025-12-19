import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../core/auth/useAuth.jsx";
import { useCallback, useMemo, useState } from "react";
import { CreditCardModal } from "../components/CreditCardModal.jsx";
import { CartItems } from "../components/CartItems.jsx";
import { ErrorBoundary } from "../components/ErrorBoundary.jsx";
import { PageError } from "../components/PageError.jsx";
import { useTranslate } from "../translations/locales/useTranslate.js";


const CartPage = () => {
    const {
        cart,
        loading,
        updateItem,
        removeItem,
        checkout
    } = useCart();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [toast, setToast] = useState(null);
    const [showCardModal, setShowCardModal] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const { t } = useTranslate();

    const showToast = useCallback((message, duration = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);

    const cartItems = useMemo(() => {
        if (!cart || !cart.items) return [];
        return cart.items.filter(item => item?.productId?._id);
    }, [cart]);


    const total = useMemo(() => {
        if (!cart?.items?.length) return 0;

        if (cart?.items?.length)
            return cart.items.reduce((acc, item) => {
                const price = item.priceSnapshot ?? item.productId?.price ?? 0;
                return acc + price * item.qty;
            }, 0);
    }, [cart]);

    const openPaymentModal = () => {
        if (!user?._id) {
            showToast(t("toast.cart"));
            navigate("/login");
            return;
        }

        setShowCardModal(true);
    };


    const confirmPayment = useCallback(async () => {
        if (cardNumber.length < 16 || expiry.length < 4 || cvc.length < 3) {
            showToast(t("toast.confirm_cart"));
            return;
        }

        try {
            const newOrder = await checkout();
            if (newOrder) {
                setShowCardModal(false);
                showToast(t("toast.new_order"));
                navigate("/orders");
            } else {
                showToast(t("toast.error_new_order"));
            }
        } catch (error) {
            console.error("Error:", error);
            showToast(t("toast.error_pay"));
        }
    }, [cardNumber, expiry, cvc, showToast, checkout, navigate]);


    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">{t("cart.no_cart")}</h2>
                <p><a href="/commerce" className="underline">{t("cart.add_products_cart")}</a> </p>
            </div>
        );
    }


    return (
        <ErrorBoundary
            fallback={
                <PageError
                    title="Error al cargar tu cesta."
                    message="No se han podido cargar los productos de tu cesta. Por favor vuelve a intentarlo."
                    onRetry={() => window.location.reload()}
                />

            }
        >
            <div className="max-w-4xl mx-auto p-8">
                <h2 className="text-3xl font-semibold mb-6 text-center text-primary">{t("cart.title")}</h2>

                {loading && <p className="text-center text-primary-dark">{t("components.loading")}</p>}

                <div className="space-y-6">
                    {cartItems.map((item, index) => (
                        <CartItems
                            key={`${item.productId._id}-${index}`}
                            item={item}
                            updateItem={updateItem}
                            removeItem={removeItem} />
                    ))}
                </div>

                <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-primary-light pt-6">
                    <h3 className="text-2xl font-bold text-primary-dark">
                        {t("cart.total")}: <span className="text-accent-primary">{total.toFixed(2)} €</span>
                    </h3>
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={openPaymentModal}
                            className="btn-primary elevation w-full md:w-auto"
                        >
                            {t("cart.finish_cart")}
                        </button>
                    </div>
                </div>

                <CreditCardModal
                    isOpen={showCardModal}
                    onClose={() => setShowCardModal(false)}
                    onConfirm={confirmPayment}
                    cardNumber={cardNumber}
                    setCardNumber={setCardNumber}
                    expiry={expiry}
                    setExpiry={setExpiry}
                    cvc={cvc}
                    setCvc={setCvc}
                />

                {toast && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                        {toast}
                    </div>
                )}

            </div>
        </ErrorBoundary>
    );
};

export default CartPage;

