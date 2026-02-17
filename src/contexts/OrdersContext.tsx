import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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
import { useAuth } from "../core/auth/useAuth";
import type { ChildrenProps, Orders, User } from "../types/types";
import type { OrderStatus } from "../components/FilteredOrders";
import type { OrderDataType } from "../core/orders/useOrders";


export type OrdersContextType = {
    orders: Orders[];
    loading: boolean;
    error: unknown;
    user: User | null;
    fetchOrders: () => Promise<void>;
    addOrder: (orderData: OrderDataType) => Promise<Orders | null>;
    updateOrderStatus: (id: string, newStatus: OrderStatus) => Promise<void>;
    deleteOrder: (id: string) => Promise<void>;
    updateOrderNotes: (orderId: string, noteText: string) => void;
};

const OrdersContext = createContext<OrdersContextType | null>(null);

export const useOrdersContext = (): OrdersContextType => {
    const context = useContext(OrdersContext);
    if (!context) throw new Error("Error en OrdersContext");
    return context;
}

export const OrdersProvider = ({ children }: ChildrenProps) => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);
    const { user } = useAuth();

    // useEffect(() => {
    //     if (!user?._id) {
    //         // Si no hay usuario logueado, no hacemos ninguna petición
    //         setOrders([]);
    //         setLoading(false);
    //         return;
    //     }

    const fetchOrders = useCallback(async (): Promise<void> => {
        if (!user?._id) {
            setOrders([]);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const allOrders = await getOrdersApi();
            const apiOrders = user.role === "admin"
                ? allOrders
                : allOrders.filter((order: Orders) => order.userId === user._id);

            const cleaned: Orders[] = apiOrders.map((order: Orders) => ({
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
    }, [user]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);


    // Nueva orden
    const addOrder = useCallback(async (orderData: OrderDataType): Promise<Orders | null> => {
        try {
            const newOrder = await addOrderApi(orderData);
            setOrders((prev) => [newOrder, ...prev]);
            addOrderToLocalStorage(newOrder);
            return newOrder;
        } catch (error) {
            console.error("Error al crear la orden:", error);
            setError(error);
            return null;
        }
    }, []);

    // Actualizar estado
    const updateOrderStatus = useCallback(async (id: string, newStatus: OrderStatus): Promise<void> => {
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
    }, []);

    // Eliminar orden
    const deleteOrder = useCallback(async (id: string): Promise<void> => {
        try {
            await deleteOrderApi(id);
            setOrders((prev) => prev.filter((order) => order._id !== id));
            deleteOrderFromLocalStorage(id);
        } catch (error) {
            console.error("Error eliminando orden:", error);
            setError(error);
        }
    }, []);

    const updateOrderNotes = useCallback((orderId: string, noteText: string): void => {
        // Actualizar localStorage
        const storedOrders: Orders[] = JSON.parse(localStorage.getItem("orders") || "[]");
        const updatedOrders = storedOrders.map((order) =>
            order._id === orderId ? { ...order, notes: noteText } : order
        );
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        setOrders(updatedOrders);
    }, []);

    const contextValue = useMemo<OrdersContextType>(() => (
        { orders, loading, error, user, fetchOrders, addOrder, updateOrderStatus, deleteOrder, updateOrderNotes }),
        [orders, loading, error, user, fetchOrders, addOrder, updateOrderStatus, deleteOrder, updateOrderNotes]);


    return (
        <OrdersContext.Provider value={contextValue} >
            {children}
        </OrdersContext.Provider>
    );
};
