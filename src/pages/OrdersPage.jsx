import { useState } from "react";
import { useOrdersContext } from "../contexts/OrdersContext";

export const OrdersPage = () => {
    const { orders, loading, error, addOrder, updateOrderStatus, deleteOrder } = useOrdersContext();

    const [newOrder, setNewOrder] = useState({
        userId: "",
        items: "",
        status: "pendiente",
    });

    const handleCreateOrder = (event) => {
        event.preventDefault();
        if (!newOrder.userId || !newOrder.items) {
            alert("Por favor completa todos los campos");
            return;
        }

        const orderData = {
            _id: Date.now().toString(),
            userId: newOrder.userId,
            items: newOrder.items.split(",").map((i) => i.trim()),
            status: newOrder.status,
            createdAt: new Date().toISOString(),
        };

        addOrder(orderData);
        setNewOrder({ userId: "", items: "", status: "pendiente" });
    };

    // --- Render principal ---
    if (loading) return <p>Cargando órdenes...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

    return (
        <section className="orders-page">
            <h1>Gestión de Órdenes</h1>

            {/* Formulario para crear orden */}
            <form onSubmit={handleCreateOrder} className="order-form">
                <h3>Crear nueva orden</h3>
                <div>
                    <label>ID Usuario:</label>
                    <input
                        type="text"
                        value={newOrder.userId}
                        onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
                        placeholder="Ej: 12345"
                    />
                </div>
                <div>
                    <label>Items (separados por coma):</label>
                    <input
                        type="text"
                        value={newOrder.items}
                        onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
                        placeholder="Ej: producto1, producto2"
                    />
                </div>
                <button type="submit">Agregar Orden</button>
            </form>

            <hr />

            {/* Lista de órdenes */}
            <div className="orders-list">
                <h3>Órdenes registradas ({orders.length})</h3>
                {orders.length === 0 ? (
                    <p>No hay órdenes registradas.</p>
                ) : (
                    <ul>
                        {orders.map((o) => (
                            <li key={o._id} className="order-item">
                                <p><strong>ID:</strong> {o._id}</p>
                                <p><strong>Usuario:</strong> {o.userId}</p>
                                <p><strong>Estado:</strong> {o.status}</p>
                                <p><strong>Items:</strong> {o.items?.join(", ")}</p>

                                <div className="order-actions">
                                    <button onClick={() => updateOrderStatus(o._id, "enviado")}>
                                        Marcar como Enviado
                                    </button>
                                    <button onClick={() => updateOrderStatus(o._id, "cancelado")}>
                                        Cancelar
                                    </button>
                                    <button onClick={() => deleteOrder(o._id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};



