// const STORAGE_KEY = "orders";

// export const getOrdersFromLocalStorage = (userId) => {
//     const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
//     return Array.isArray(stored[userId]) ? stored[userId] : [];
// };

// export const saveOrdersInLocalStorage = (userId, orders) => {
//     const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
//     stored[userId] = orders;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
// };

// export const addOrderToLocalStorage = (userId, order) => {
//     const orders = getOrdersFromLocalStorage(userId);
//     orders.push(order);
//     saveOrdersInLocalStorage(userId, orders);
// };

// export const updateOrderLocal = (userId, orderId, updates) => {
//     const orders = getOrdersFromLocalStorage(userId).map(o =>
//         o._id === orderId ? { ...o, ...updates } : o
//     );
//     saveOrdersInLocalStorage(userId, orders);
// };

// export const deleteOrderFromLocalStorage = (userId, orderId) => {
//     const orders = getOrdersFromLocalStorage(userId).filter(o => o._id !== orderId);
//     saveOrdersInLocalStorage(userId, orders);
// };
