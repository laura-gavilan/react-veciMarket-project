import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../core/auth/useAuth.jsx";


export const CartPage = () => {
    const { user } = useAuth();
    const {
        cart,
        loading,
        updateItem,
        removeItem,
        addItem,
        checkout,
        clearCart
    } = useCart();

    // 🧠 Si no hay usuario logueado
    if (!user) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">🛒 Carrito</h2>
                <p>Debes iniciar sesión para ver tu carrito.</p>
            </div>
        );
    }

    // 🧠 Si el carrito está vacío
    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">🛒 Tu carrito está vacío</h2>
                <p>Agrega productos para comenzar tu compra.</p>
            </div>
        );
    }

    // 🧮 Calcular total
    const total = cart.items.reduce(
        (acc, item) => acc + item.priceSnapshot * item.qty,
        0
    );

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-3xl font-semibold mb-6 text-center">🛍️ Tu carrito</h2>

            {loading && <p className="text-center text-gray-500">Cargando...</p>}

            <div className="space-y-6">
                {cart.items.map((item) => (
                    <div
                        key={item._id}
                        className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.productId?.images?.[0]}
                                alt={item.productId?.name}
                                className="w-24 h-24 object-cover rounded-xl"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {item.productId?.name}
                                </h3>
                                <p className="text-gray-500">
                                    {item.productId?.description || "Sin descripción"}
                                </p>
                                <p className="font-bold mt-1">
                                    Precio: {item.priceSnapshot} €
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 mt-4 md:mt-0">
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-3 py-1 bg-gray-300 rounded-lg"
                                    onClick={() =>
                                        updateItem(item.productId._id, item.qty - 1)
                                    }
                                    disabled={item.qty <= 1}
                                >
                                    -
                                </button>
                                <span className="text-lg font-semibold">{item.qty}</span>
                                <button
                                    className="px-3 py-1 bg-gray-300 rounded-lg"
                                    onClick={() =>
                                        updateItem(item.productId._id, item.qty + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className="text-sm text-red-500 hover:underline"
                                onClick={() => removeItem(item.productId._id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6">
                <h3 className="text-2xl font-bold">
                    Total: <span className="text-blue-600">{total.toFixed(2)} €</span>
                </h3>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <button
                        onClick={clearCart}
                        className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl"
                    >
                        Vaciar carrito
                    </button>
                    <button
                        onClick={checkout}
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                    >
                        Finalizar compra
                    </button>
                </div>
            </div>
        </div>
    );
};

