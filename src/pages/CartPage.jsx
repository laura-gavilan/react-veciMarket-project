import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
    const { cart, removeFromCart, clearCart, loading } = useContext(CartContext);
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-[var(--color-burdeos-dark)] text-xl font-semibold">
                Cargando carrito...
            </div>
        );
    }

    if (!cart || !Array.isArray(cart.products) || cart.products.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center bg-[var(--color-gray-warm)] p-6">
                <h1 className="text-3xl font-bold text-[var(--color-burdeos-dark)] mb-4">
                    Tu carrito está vacío 🛒
                </h1>
                <button
                    onClick={() => navigate("/commerce")}
                    className="px-6 py-3 bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] rounded-2xl font-semibold shadow-md hover:bg-[var(--color-burdeos-light)] hover:scale-105 transition-all"
                >
                    Ir a comprar
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-gray-warm)] p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-[var(--color-burdeos-light)] p-10 flex flex-col gap-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-burdeos-dark)] text-center mb-8">
                    Tu Carrito 🛍️
                </h1>

                <div className="flex flex-col gap-6">
                    {cart.products.map((item) => (
                        <div
                            key={item.productId}
                            className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-[var(--color-burdeos-light)] pb-4"
                        >
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                                <div className="w-20 h-20 bg-[var(--color-gray-warm)] rounded-xl flex items-center justify-center text-[var(--color-burdeos-dark)] font-bold text-lg">
                                    🛒
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[var(--color-burdeos-dark)]">
                                        {item.name || "Producto"}
                                    </h3>
                                    <p className="text-[var(--color-burdeos-darker)]">
                                        Precio: {item.price.toFixed(2)} €
                                    </p>
                                    <p className="text-[var(--color-burdeos-darker)]">
                                        Cantidad: {item.quantity}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="px-4 py-2 bg-[var(--color-burdeos-light)] text-white rounded-full shadow-md hover:bg-[var(--color-burdeos-dark)] transition-all"
                            >
                                🗑️ Quitar
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-8 border-t border-[var(--color-burdeos-light)] pt-6">
                    <h2 className="text-2xl font-bold text-[var(--color-burdeos-dark)]">
                        Total: {cart.total.toFixed(2)} €
                    </h2>
                    <div className="flex gap-4">
                        <button
                            onClick={clearCart}
                            className="px-5 py-3 bg-[var(--color-burdeos-light)] text-white rounded-2xl font-semibold shadow-md hover:bg-[var(--color-burdeos-dark)] transition-all"
                        >
                            Vaciar carrito
                        </button>
                        <button
                            onClick={() => alert("Simulación de compra completada 🎉")}
                            className="px-6 py-3 bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] rounded-2xl font-semibold shadow-md hover:bg-[var(--color-burdeos-light)] hover:scale-105 transition-all"
                        >
                            Finalizar compra
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="self-center mt-6 px-5 py-2 bg-[var(--color-mostaza-pastel)] text-[var(--color-burdeos-dark)] rounded-full shadow-md hover:bg-[var(--color-mostaza)] hover:scale-105 transition-all font-semibold"
                >
                    ← Seguir comprando
                </button>
            </div>
        </div>
    );
};
