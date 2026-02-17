import type { OrderStatus } from "../../components/FilteredOrders";
import type { Orders } from "../../types/types";

export const saveOrdersInLocalStorage = (orders: Orders[]): void => {
    localStorage.setItem("orders", JSON.stringify(orders));
};

export const getOrdersFromLocalStorage = (): Orders[] => {
    const data = localStorage.getItem("orders");
    return data ? (JSON.parse(data) as Orders[]) : [];
};

export const addOrderToLocalStorage = (order: Orders): void => {
    const orders = getOrdersFromLocalStorage();
    orders.push(order);
    saveOrdersInLocalStorage(orders);
};

export const updateOrderInLocalStorage = (updateOrder: Orders): void => {
    const orders = getOrdersFromLocalStorage();
    const newOrders = orders.map((order) => order._id === updateOrder._id ? updateOrder : order);
    saveOrdersInLocalStorage(newOrders);
};

export const patchOrderStatusInLocalStorage = (orderId: string, status: OrderStatus): void => {
    const orders = getOrdersFromLocalStorage();
    const newOrders = orders.map((order) => order._id === orderId ? { ...order, status } : order);
    saveOrdersInLocalStorage(newOrders);
};

export const deleteOrderFromLocalStorage = (orderId: string): void => {
    const orders = getOrdersFromLocalStorage();
    const newOrders = orders.filter((order) => order._id !== orderId);
    saveOrdersInLocalStorage(newOrders);
};