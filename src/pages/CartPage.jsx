import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { OrderContext } from "../contexts/OrdersContext";

export const CartPage = () => {
    const { cart, deleteFromCart, updateCartItem, setCart } = useContext(CartContext);
    const { addOrder } = useContext(OrderContext);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-[var(--color-burdeos-dark)]">
                <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío 🛒</h1>
                <p className="text-gray-500">Agrega productos para poder realizar una orden.</p>
            </div>
        );
    }

    const handleChangeQuantity = (id, quantity) => {
        if (quantity < 1) return;
        updateCartItem(id, quantity);
    };

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const orderData = {
                items: cart.items,
                total,
                status: "pending",
            };
            await addOrder(orderData);
            setCart({ id: cart.id, items: [] }); // limpiar carrito
            localStorage.setItem("cart", JSON.stringify({ id: cart.id, items: [] }));
            setSuccess(true);
        } catch (error) {
            console.error("Error realizando la compra:", error);
            alert("Ocurrió un error al realizar la compra.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-6 max-w-5xl mx-auto flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-[var(--color-burdeos-dark)] mb-6">Mi Carrito</h1>

            {success && (
                <div className="p-4 mb-4 bg-green-200 text-green-800 rounded-xl font-semibold">
                    Compra realizada con éxito ✅
                </div>
            )}

            <div className="flex flex-col gap-6">
                {cart.items.map((item) => (
                    <div
                        key={item._id}
                        className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-md border border-[var(--color-burdeos-light)]"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            {item.images?.[0] && (
                                <img
                                    src={item.images[0].startsWith("/") ? item.images[0] : `/products/${item.images[0]}`}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-xl"
                                />
                            )}
                            <div className="flex flex-col">
                                <h2 className="text-lg font-semibold text-[var(--color-burdeos-dark)]">{item.name}</h2>
                                <p className="text-[var(--color-burdeos-light)] font-bold mt-1">{item.price.toFixed(2)} €</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4 sm:mt-0">
                            <button
                                onClick={() => handleChangeQuantity(item._id, item.quantity - 1)}
                                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                                onClick={() => handleChangeQuantity(item._id, item.quantity + 1)}
                                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                +
                            </button>
                            <button
                                onClick={() => deleteFromCart(item._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 bg-white p-6 rounded-2xl shadow-md border border-[var(--color-burdeos-light)]">
                <div className="text-lg font-semibold text-[var(--color-burdeos-dark)]">
                    Total: {total.toFixed(2)} €
                </div>
                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`mt-4 sm:mt-0 px-6 py-2 rounded-xl text-white font-semibold transition ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-[var(--color-mostaza-pastel)] hover:bg-[var(--color-mostaza)]"
                    }`}
                >
                    {loading ? "Procesando..." : "Confirmar Compra"}
                </button>
            </div>
        </div>
    );
};