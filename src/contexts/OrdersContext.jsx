import { createContext, useContext, useEffect, useState } from "react";
import {
    getOrdersApi,
    addOrderApi,
    updateOrderStatusApi,
    deleteOrderApi,
} from "../core/orders/orders.api";
import {
    saveOrdersInLocalStorage,
    getOrdersFromLocalStorage,
    addOrderToLocalStorage,
    updateOrderInLocalStorage,
    patchOrderStatusInLocalStorage,
    deleteOrderFromLocalStorage,
} from "../core/orders/orders.service";

const OrdersContext = createContext();
export const useOrdersContext = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Cargar órdenes desde API o localStorage
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);

                // Primero intenta obtener desde API
                const apiOrders = await getOrdersApi();

                const cleaned = apiOrders.map((o) => ({
                    ...o,
                    items: Array.isArray(o.items)
                        ? o.items.map((item) => ({ ...item }))
                        : [],
                }));

                setOrders(cleaned);
                saveOrdersInLocalStorage(cleaned);
            } catch (err) {
                console.warn("Error al cargar desde API, usando localStorage:", err);
                // Si la API falla, usamos el localStorage
                const localOrders = getOrdersFromLocalStorage();
                setOrders(localOrders);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // 🔹 Crear nueva orden
    const addOrder = async (order) => {
        try {
            const newOrder = await addOrderApi(order);
            setOrders((prev) => [newOrder, ...prev]);
            addOrderToLocalStorage(newOrder);
        } catch (err) {
            console.error("Error al crear la orden:", err);
            setError(err);
        }
    };

    // 🔹 Actualizar estado
    const updateOrderStatus = async (id, newStatus) => {
        try {
            const updatedOrder = await updateOrderStatusApi(id, newStatus);
            setOrders((prev) =>
                prev.map((o) => (o._id === id ? updatedOrder : o))
            );
            patchOrderStatusInLocalStorage(id, newStatus);
        } catch (err) {
            console.error("Error actualizando estado:", err);
            setError(err);
        }
    };

    // 🔹 Eliminar orden
    const deleteOrder = async (id) => {
        try {
            await deleteOrderApi(id);
            setOrders((prev) => prev.filter((o) => o._id !== id));
            deleteOrderFromLocalStorage(id);
        } catch (err) {
            console.error("Error eliminando orden:", err);
            setError(err);
        }
    };

    const updateOrderNotes = (orderId, noteText) => {
        // 1️⃣ Actualizar localStorage
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const updatedOrders = storedOrders.map((o) =>
            o._id === orderId ? { ...o, notes: noteText } : o
        );
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        // 2️⃣ Opcional: actualizar el estado global de orders si lo tienes
        setOrders(updatedOrders);
    };


    return (
        <OrdersContext.Provider
            value={{
                orders,
                loading,
                error,
                addOrder,
                updateOrderStatus,
                deleteOrder, updateOrderNotes

            }}
        >
            {children}
        </OrdersContext.Provider>
    );
};
