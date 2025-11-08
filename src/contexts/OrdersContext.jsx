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
    patchOrderStatusInLocalStorage,
    deleteOrderFromLocalStorage,
} from "../core/orders/orders.service";

const OrdersContext = createContext();
export const useOrdersContext = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Cargar órdenes desde API o localStorage
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const apiOrders = await getOrdersApi();

                const cleaned = apiOrders.map((order) => ({
                    ...order,
                    items: Array.isArray(order.items)
                        ? order.items.map((item) => ({ ...item }))
                        : [],
                }));

                setOrders(cleaned);
                saveOrdersInLocalStorage(cleaned);
            } catch (error) {
                console.warn("Error al cargar desde API, usando localStorage:", error);
                const localOrders = getOrdersFromLocalStorage();
                setOrders(localOrders);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Nueva orden
    const addOrder = async (order) => {
        try {
            const newOrder = await addOrderApi(order);
            setOrders((prev) => [newOrder, ...prev]);
            addOrderToLocalStorage(newOrder);
        } catch (error) {
            console.error("Error al crear la orden:", error);
            setError(error);
        }
    };

    // Actualizar estado
    const updateOrderStatus = async (id, newStatus) => {
        try {
            const updatedOrder = await updateOrderStatusApi(id, newStatus);
            setOrders((prev) =>
                prev.map((order) => (order._id === id ? updatedOrder : order))
            );
            patchOrderStatusInLocalStorage(id, newStatus);
        } catch (error) {
            console.error("Error actualizando estado:", error);
            setError(error);
        }
    };

    // Eliminar orden
    const deleteOrder = async (id) => {
        try {
            await deleteOrderApi(id);
            setOrders((prev) => prev.filter((order) => order._id !== id));
            deleteOrderFromLocalStorage(id);
        } catch (error) {
            console.error("Error eliminando orden:", error);
            setError(error);
        }
    };

    const updateOrderNotes = (orderId, noteText) => {
        // Actualizar localStorage
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const updatedOrders = storedOrders.map((order) =>
            order._id === orderId ? { ...order, notes: noteText } : order
        );
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
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
