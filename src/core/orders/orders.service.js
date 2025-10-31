export const saveOrdersInLocalStorage = (orders) => {
    localStorage.setItem("orders", JSON.stringify(orders));
};

export const getOrdersFromLocalStorage = () => {
    const data = localStorage.getItem("orders");
    return data ? JSON.parse(data) : [];
};

export const addOrderToLocalStorage = (order) => {
    const orders = getOrdersFromLocalStorage();
    orders.push(order);
    saveOrdersInLocalStorage(orders);
};

export const updateOrderInLocalStorage = (updateOrder) => {
    const orders = getOrdersFromLocalStorage();
    const newOrders = orders.map((order) => order._id === updateOrder._id ? updateOrder : order);
    saveOrdersInLocalStorage(newOrders);
};

export const patchOrderStatusInLocalStorage = (orderId, status) => {
    const orders = getOrdersFromLocalStorage();
    const newOrders = orders.map((order) => order._id === orderId ? { ...order, status } : order);
    saveOrdersInLocalStorage(newOrders);
};

export const deleteOrderFromLocalStorage = (orderId) => {
    const orders = getOrdersFromLocalStorage();
    const newOrders = orders.filter((order) => order._id !== orderId);
    saveOrdersInLocalStorage(newOrders);
};