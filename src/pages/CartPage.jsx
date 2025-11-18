import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../core/auth/useAuth.jsx";
import { useState } from "react";
import { CreditCardModal } from "../components/CreditCardModal.jsx";

export const CartPage = () => {
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

    const showToast = (message, duration = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    };

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">🛒 Tu cesta está vacía</h2>
                <p>Agrega productos para comenzar tu compra.</p>
            </div>
        );
    }

    const total = cart.items.reduce(
        (acc, item) => acc + (item.priceSnapshot ?? item.productId?.price ?? 0) * item.qty,
        0
    );

    
    const openPaymentModal = () => {
        if (!user?._id) {
            showToast("Debes iniciar sesión para finalizar la compra y ver tu pedido.");
            navigate("/login");
            return;
        }

        setShowCardModal(true);
    };

    
    const confirmPayment = async () => {
        if (cardNumber.length < 16 || expiry.length < 4 || cvc.length < 3) {
            showToast("Introduce todos los datos de la tarjeta correctamente.");
            return;
        }

        try {
            const newOrder = await checkout();
            if (newOrder) {
                setShowCardModal(false);
                showToast("✅ Compra realizada correctamente");
                navigate("/orders");
            } else {
                showToast("Ocurrió un error al finalizar la compra.");
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("Error al procesar el pago.");
        }
    };

    const handleCheckout = () => {
        if (!user?._id) {
            showToast("Debes iniciar sesión para finalizar la compra.");
            return navigate("/login");
        }

        setShowCardModal(true); 
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-3xl font-semibold mb-6 text-center text-primary">Mi cesta de la compra</h2>

            {loading && <p className="text-center text-primary-dark">Cargando...</p>}

            <div className="space-y-6">
                {cart.items.map((item, index) => (
                    <div
                        key={`${item.productId?._id}-${index}`}
                        className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-3xl p-4"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.productId?.images?.[0]}
                                alt={item.productId?.name}
                                className="w-24 h-24 object-cover rounded-xl"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-primary-dark">
                                    {item.productId?.name}
                                </h3>
                                <p className="text-primary-dark">
                                    {item.productId?.description || "Sin descripción"}
                                </p>
                                <p className="font-bold mt-1 text-primary-dark">
                                    Precio: {(item.priceSnapshot ?? item.productId?.price ?? 0).toFixed(2)} €
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 mt-4 md:mt-0">
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-3 py-1 rounded-lg"
                                    onClick={() =>
                                        updateItem(item.productId._id, item.qty - 1)
                                    }
                                    disabled={item.qty <= 1}
                                >
                                    -
                                </button>
                                <span className="text-lg font-semibold">{item.qty}</span>
                                <button
                                    className="px-3 py-1 rounded-lg"
                                    onClick={() =>
                                        updateItem(item.productId._id, item.qty + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className="text-sm text-red-600 hover:underline"
                                onClick={() => removeItem(item.productId._id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-primary-light pt-6">
                <h3 className="text-2xl font-bold text-primary-dark">
                    Total: <span className="text-accent-primary">{total.toFixed(2)} €</span>
                </h3>
                <div className="flex justify-center mt-8">
                    <button
                        onClick={openPaymentModal}
                        className="btn-primary elevation w-full md:w-auto"
                    >
                        Finalizar compra
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
    );
};


