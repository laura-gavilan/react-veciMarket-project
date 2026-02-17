import type { OrderStatus } from "../../components/FilteredOrders";
import type { Orders } from "../../types/types";
import { api } from "../http/axios"
import type { OrderDataType } from "./useOrders";


export const getOrdersApi = async (): Promise<Orders[]> => {
    try {
        const response = await api.get<Orders[]>("/orders");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las órdenes", error);
        throw error;
    }
};

export const addOrderApi = async (order: OrderDataType): Promise<Orders> => {
    try {
        const response = await api.post("/orders", order);
        return response.data;
    } catch (error) {
        console.error("Error al crear la orden", error);
        throw error;
    }
};

export const getOrderByIdApi = async (orderId: string): Promise<Orders> => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error ("Error al obtener la orden", error);
        throw error;
    }  
};

export const updateOrderStatusApi = async (orderId:string, status: OrderStatus): Promise<Orders> => {
    try {
        const response = await api.patch(`/orders/${orderId}/status`, {status});
        return response.data;
    } catch ( error) {
        console.error ("Error al actualizar el estado de la orden", error);
        throw error;
    }
};

export const deleteOrderApi = async (orderId: string): Promise<void> => {
    try {
        const response = await api.delete(`/orders/${orderId}`);
        return response.data;
    } catch ( error) {
        console.error ("Error al eliminar la orden", error);
        throw error;
    }
};


