import { useEffect, useState } from "react"
import { addOrderApi, deleteOrderApi, getOrdersApi, updateOrderStatusApi } from "./orders.api";
import { addOrderToLocalStorage, deleteOrderFromLocalStorage, getOrdersFromLocalStorage, patchOrderStatusInLocalStorage, saveOrdersInLocalStorage, updateOrderInLocalStorage } from "./orders.service";


export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const data = await getOrdersApi();
                setOrders(data);
                saveOrdersInLocalStorage(data);
            } catch (error) {
                console.error("No se pudo obtener desde API", error);
                const localOrders = getOrdersFromLocalStorage();
                setOrders(localOrders);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const addOrder = async (orderData) => {
        try {
            const newOrder = await addOrderApi(orderData);
            const updateOrders = [...orders, newOrder];
            setOrders(updateOrders);
            saveOrdersInLocalStorage(updateOrders);
        } catch (error) {
            console.error("Error al crear orden", error);
            addOrderToLocalStorage(orderData);
            setOrders(getOrdersFromLocalStorage());
            setError(error);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const updatedOrder = await updateOrderStatusApi(orderId, status);
            const updatedOrders = orders.map((o) =>
                o._id === orderId ? updatedOrder : o
            );
            setOrders(updatedOrders);
            saveOrdersInLocalStorage(updatedOrders);
        } catch (err) {
            console.error("Error al actualizar estado:", err);
            patchOrderStatusInLocalStorage(orderId, status);
            setOrders(getOrdersFromLocalStorage());
            setError(err);
        }
    };

    // --- Eliminar orden ---
    const deleteOrder = async (orderId) => {
        try {
            await deleteOrderApi(orderId);
            const updatedOrders = orders.filter((o) => o._id !== orderId);
            setOrders(updatedOrders);
            saveOrdersInLocalStorage(updatedOrders);
        } catch (err) {
            console.error("Error al eliminar orden:", err);
            deleteOrderFromLocalStorage(orderId);
            setOrders(getOrdersFromLocalStorage());
            setError(err);
        }
    };

    // --- Actualizar orden completa (no solo estado) ---
    const updateOrder = (updatedOrder) => {
        updateOrderInLocalStorage(updatedOrder);
        setOrders(getOrdersFromLocalStorage());
    };

    return {
        orders,
        loading,
        error,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        updateOrder,
    };
};

