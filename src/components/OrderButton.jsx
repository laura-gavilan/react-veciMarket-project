// import React, { useState } from "react";
// import { useCart } from "../core/cart/useCart";
// import { useOrders } from "../core/orders/useOrders";

// export const OrderButton = () => {
//     const { cart, deleteFromCart } = useCart();
//     const { addOrder } = useOrders();
//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState(false);

//     const handleCreateOrder = async () => {
//         if (cart.length === 0) {
//             alert("El carrito está vacío.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const orderData = {
//                 items: cart.map((item) => ({
//                     productId: item._id,
//                     quantity: item.quantity,
//                     price: item.price,
//                     name: item.name,
//                 })),
//                 total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
//                 createdAt: new Date().toISOString(),
//             };

//             await addOrder(orderData);

//             // Limpiar carrito
//             cart.forEach((item) => deleteFromCart(item._id));

//             setSuccess(true);
//             setTimeout(() => setSuccess(false), 3000); // Ocultar mensaje en 3s
//         } catch (error) {
//             console.error("Error creando orden:", error);
//             alert("No se pudo crear la orden. Intenta de nuevo.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <button
//             onClick={handleCreateOrder}
//             disabled={loading || cart.length === 0}
//             className={`px-6 py-3 rounded-xl font-bold shadow-md transition-all 
//         ${loading || cart.length === 0
//                     ? "bg-gray-300 cursor-not-allowed text-gray-600"
//                     : "bg-[var(--color-mostaza-pastel)] text-[var(--color-burdeos-dark)] hover:bg-[var(--color-mostaza)] hover:scale-105"
//                 }`}
//         >
//             {loading ? "Procesando..." : success ? "✅ Orden creada" : "🛒 Crear orden"}
//         </button>
//     );
// };