import { useState, useEffect, useCallback } from "react";
import { createOrderApi, deleteOrderApi, getOrderByIdApi, getOrdersApi, getOrdersByStatusApi, updateOrderApi } from "./orders.api";


export const useOrders = (userId = null) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar pedidos
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getOrdersApi(userId);
            setOrders(data);
        } catch (err) {
            console.error("Error cargando pedidos:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // Crear un nuevo pedido
    const createOrder = async (orderData) => {
        setLoading(true);
        setError(null);
        try {
            const newOrder = await createOrderApi(orderData);
            setOrders((prev) => [...prev, newOrder]);
            return newOrder;
        } catch (err) {
            console.error("Error creando pedido:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Actualizar un pedido existente
    const updateOrder = async (orderId, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedOrder = await updateOrderApi(orderId, updateData);
            setOrders((prev) =>
                prev.map((order) => (order._id === orderId ? updatedOrder : order))
            );
            return updatedOrder;
        } catch (err) {
            console.error("Error actualizando pedido:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Eliminar un pedido
    const deleteOrder = async (orderId) => {
        setLoading(true);
        setError(null);
        try {
            await deleteOrderApi(orderId);
            setOrders((prev) => prev.filter((order) => order._id !== orderId));
        } catch (err) {
            console.error("Error eliminando pedido:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Obtener un pedido por ID
    const getOrderById = async (orderId) => {
        setLoading(true);
        setError(null);
        try {
            const order = await getOrderByIdApi(orderId);
            return order;
        } catch (err) {
            console.error("Error obteniendo pedido por ID:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Obtener pedidos por estado
    const getOrdersByStatus = async (status) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getOrdersByStatusApi(status);
            return data;
        } catch (err) {
            console.error("Error obteniendo pedidos por estado:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Cargar pedidos automáticamente al montar
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        loading,
        error,
        fetchOrders,
        createOrder,
        updateOrder,
        deleteOrder,
        getOrderById,
        getOrdersByStatus
    };
};
