import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext();
export const useOrdersContext = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar órdenes desde localStorage al iniciar
    useEffect(() => {
        try {
            const storedOrders = localStorage.getItem("orders");
            if (storedOrders) {
                setOrders(JSON.parse(storedOrders));
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Función para guardar automáticamente en localStorage
    const saveOrders = (newOrders) => {
        setOrders(newOrders);
        try {
            localStorage.setItem("orders", JSON.stringify(newOrders));
        } catch (err) {
            console.error("Error guardando en localStorage:", err);
        }
    };

    const addOrder = (order) => {
        saveOrders([order, ...orders]);
    };

    const updateOrderStatus = (id, newStatus) => {
        const updated = orders.map((o) => (o._id === id ? { ...o, status: newStatus } : o));
        saveOrders(updated);
    };

    const deleteOrder = (id) => {
        const updated = orders.filter((o) => o._id !== id);
        saveOrders(updated);
    };

    return (
        <OrdersContext.Provider
            value={{
                orders,
                loading,
                error,
                addOrder,
                updateOrderStatus,
                deleteOrder,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );

};
