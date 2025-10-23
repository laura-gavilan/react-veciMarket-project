// import { createContext, useState, useEffect } from "react";
// import { useAuth } from "../core/auth/useAuth";
// import {
//     getOrdersApi,
//     createOrderApi,
//     updateOrderApi,
//     deleteOrderApi
// } from "../core/orders/orders.api";
// import {
//     getOrdersFromLocalStorage,
//     saveOrdersInLocalStorage,
//     addOrderToLocalStorage,
//     deleteOrderFromLocalStorage,
//     updateOrderLocal
// } from "../core/orders/orders.service";

// export const OrderContext = createContext(null);

// export const OrderProvider = ({ children }) => {
//     const { user } = useAuth();
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const loadOrders = async () => {
//             if (!user?._id) {
//                 setOrders([]);
//                 return;
//             }
//             try {
//                 const data = await getOrdersApi(user._id);
//                 const list = Array.isArray(data.orders) ? data.orders : [];
//                 setOrders(list);
//                 saveOrdersInLocalStorage(user._id, list);
//             } catch {
//                 const local = getOrdersFromLocalStorage(user._id);
//                 setOrders(local);
//             }
//         };
//         loadOrders();
//     }, [user]);

//     const addOrder = async (orderData) => {
//         if (!user?._id) return;
//         try {
//             const newOrder = await createOrderApi(user._id, orderData);
//             setOrders(prev => [...prev, newOrder]);
//             addOrderToLocalStorage(user._id, newOrder);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const updateOrder = async (orderId, updates) => {
//         if (!user?._id) return;
//         try {
//             const updated = await updateOrderApi(orderId, updates);
//             setOrders(prev => prev.map(o => o._id === orderId ? updated : o));
//             updateOrderLocal(user._id, orderId, updates);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const deleteOrder = async (orderId) => {
//         if (!user?._id) return;
//         try {
//             await deleteOrderApi(orderId);
//             setOrders(prev => prev.filter(o => o._id !== orderId));
//             deleteOrderFromLocalStorage(user._id, orderId);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <OrderContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder }}>
//             {children}
//         </OrderContext.Provider>
//     );
// };
