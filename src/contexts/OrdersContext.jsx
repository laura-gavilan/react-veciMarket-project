import { createContext, useContext } from "react";
import { useOrders } from "../core/orders/useOrders";


const OrdersContext = createContext();

export const useOrdersContext = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error("useOrdersContext debe usarse dentro de un <OrdersProvider>");
    }
    return context;
};

export const OrdersProvider = ({ children }) => {
    const { orders, loading, error, addOrder, updateOrderStatus, deleteOrder, updateOrder } = useOrders();


    return (
        <OrdersContext.Provider value={{ orders, loading, error, addOrder, updateOrderStatus, deleteOrder, updateOrder }} >
            {children}
        </OrdersContext.Provider>
    );
};