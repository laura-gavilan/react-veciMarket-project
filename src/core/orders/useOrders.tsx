import { useCallback, useEffect, useState } from "react"
import { addOrderApi, deleteOrderApi, getOrdersApi, updateOrderStatusApi } from "./orders.api";
import { deleteOrderFromLocalStorage, getOrdersFromLocalStorage, patchOrderStatusInLocalStorage, saveOrdersInLocalStorage, updateOrderInLocalStorage } from "./orders.service";
import type { Orders } from "../../types/types";
import type { OrderStatus } from "../../components/FilteredOrders";


export type OrderItem = {
    productId: string;
    qty: number;
    priceSnapshot: number;
    price?: number,
    name?: string,
};

export type OrderDataType = {
    // _id: string,
    userId: string,
    items: OrderItem[],
    notes?: string;
    status?: OrderStatus,
};


export type UseOrdersType = {
    orders: Orders[];
    loading: boolean;
    error: unknown;
    addOrder: (order: OrderDataType) => Promise<void>;
    updateOrderStatus: (id: string, newStatus: OrderStatus) => Promise<void>;
    deleteOrder: (id: string) => Promise<void>;
    updateOrder: (order: Orders) => void;
};




export const useOrders = () => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

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

    const addOrder = useCallback(async (orderData: OrderDataType) => {
        try {
            const newOrder = await addOrderApi(orderData);
            const updatedOrders = [...orders, newOrder];
            setOrders(updatedOrders);
            saveOrdersInLocalStorage(updatedOrders);
        } catch (error) {
            console.error("Error al crear la orden:", error);
            setError(error);
        }
    }, [orders]);

    const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
        try {
            const updatedOrder = await updateOrderStatusApi(orderId, status);
            const updatedOrders = orders.map((order) =>
                order._id === orderId ? updatedOrder : order
            );
            setOrders(updatedOrders);
            saveOrdersInLocalStorage(updatedOrders);
        } catch (error) {
            console.error("Error al actualizar estado:", error);
            patchOrderStatusInLocalStorage(orderId, status);
            setOrders(getOrdersFromLocalStorage());
            setError(error);
        }
    }, [orders]);


    const deleteOrder = useCallback(async (orderId: string) => {
        try {
            await deleteOrderApi(orderId);
            const updatedOrders = orders.filter((order) => order._id !== orderId);
            setOrders(updatedOrders);
            saveOrdersInLocalStorage(updatedOrders);
        } catch (error) {
            console.error("Error al eliminar orden:", error);
            deleteOrderFromLocalStorage(orderId);
            setOrders(getOrdersFromLocalStorage());
            setError(error);
        }
    }, [orders]);

    const updateOrder = useCallback((updatedOrder: Orders) => {
        updateOrderInLocalStorage(updatedOrder);
        setOrders(getOrdersFromLocalStorage());
    }, []);

    return { orders, loading, error, addOrder, updateOrderStatus, deleteOrder, updateOrder };
};

