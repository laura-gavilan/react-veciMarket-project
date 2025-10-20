import { useOrders } from "../core/orders/useOrders";

export const OrdersPage = () => {
    const { orders, loading, createOrder, deleteOrder } = useOrders();

    if (loading) return <p>Cargando pedidos...</p>;

    return (
        <div>
            {orders.map((order) => (
                <div key={order._id}>
                    <p>Pedido {order._id}</p>
                    <button onClick={() => deleteOrder(order._id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};
