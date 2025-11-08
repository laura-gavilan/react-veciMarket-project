import { useEffect, useState } from "react";
import { useOrdersContext } from "../contexts/OrdersContext";

export const OrdersPage = () => {
    const { orders, loading, error, updateOrderStatus, deleteOrder, updateOrderNotes } = useOrdersContext();
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [notesState, setNotesState] = useState({});
    const statusOptions = [
        { label: "Todos", value: "all", color: "bg-gray-200 text-gray-700" },
        { label: "Pendientes", value: "pending", color: "bg-yellow-200 text-yellow-800" },
        { label: "En preparación", value: "preparing", color: "bg-blue-300 text-blue-800" },
        { label: "Entregados", value: "delivered", color: "bg-green-300 text-green-800" },
        { label: "Cancelados", value: "cancelled", color: "bg-red-300 text-red-800" },
    ];

    const statusLabels = {
        pending: "pendiente",
        preparing: "En preparación",
        delivered: "Entregado",
        cancelled: "Cancelado",
    };

    const getStatusColor = (status) => {
        const option = statusOptions.find((statusOption) => statusOption.value === status);
        return option ? option.color.split(' ')[0] : 'bg-gray-400';
    };


    const filteredOrders = orders.filter((order) => {
        const matchesStatus = filter === "all" || order.status === filter;
        const matchesSearch =
            (order._id || "").includes(searchTerm) || (order.userId || "").includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    const getTotals = (order) => {
        const items = Array.isArray(order.items) ? order.items : [];
        const subtotal = items.reduce(
            (acc, item) => acc + (item.price ?? 0) * (item.qty ?? 0),
            0
        );
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const globalTotals = filteredOrders.reduce(
        (acc, order) => {
            const { subtotal, tax, total } = getTotals(order);
            acc.subtotal += subtotal;
            acc.tax += tax;
            acc.total += total;
            return acc;
        },
        { subtotal: 0, tax: 0, total: 0 }
    );

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("orderNotes") || "{}");

        setNotesState((prevNotes) => {
            const updated = { ...prevNotes };
            orders.forEach((order) => {
                if (updated[order._id] === undefined) {
                    updated[order._id] = storedNotes[order._id] ?? order.notes ?? "";
                }
            });
            return updated;
        });
    }, [orders]);

    if (loading)
        return (
            <p className="text-center mt-10 text-[var(--color-burdeos-dark)] font-sans text-lg">
                Cargando pedidos...
            </p>
        );

    if (error)
        return (
            <p className="text-center mt-10 text-red-600 font-sans text-lg">
                Error: {error.message}
            </p>
        );

    const handleNotesChange = (orderId, value) => {
        setNotesState({ ...notesState, [orderId]: value });
    };

    const saveNotes = (orderId) => {
        const noteText = notesState[orderId]?.trim();
        if (!noteText) return;

        if (updateOrderNotes) updateOrderNotes(orderId, noteText);

        const savedNotes = JSON.parse(localStorage.getItem('orderNotes')) || {};
        savedNotes[orderId] = noteText;
        localStorage.setItem('orderNotes', JSON.stringify(savedNotes));
    };



    return (
        <div className="max-w-7xl mx-auto mt-12 p-6 md:p-10 bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)]">
            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-[var(--color-burdeos-dark)] text-center">
                Gestión de pedidos
            </h1>

            <div className="sticky top-0 z-10 bg-white py-4 mb-6 flex flex-col gap-4 border-b border-[var(--color-burdeos-light)]">
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {statusOptions.map((status) => {
                        const count =
                            status.value === "all"
                                ? orders.length
                                : orders.filter((order) => order.status === status.value).length;
                        return (
                            <button
                                key={status.value}
                                onClick={() => setFilter(status.value)}
                                className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm transition ${filter === status.value
                                    ? "bg-[var(--color-burdeos-dark)] text-white"
                                    : `${status.color} hover:bg-[var(--color-mostaza)] hover:text-white`
                                    }`}
                            >
                                {status.label} ({count})
                            </button>
                        );
                    })}
                </div>


                <div className="flex w-full md:w-1/2 gap-2">
                    <input
                        type="text"
                        placeholder="Buscar por ID de orden o usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)]"
                    />

                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <p className="text-gray-500 italic text-center">
                    No hay órdenes en este estado.
                </p>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                        {filteredOrders.map((order) => {
                            const { subtotal, tax, total } = getTotals(order);
                            const noteValue = notesState[order._id] ?? order.notes ?? "";
                            const statusColor = getStatusColor(order.status).split(' ')[0];
                            const hasProducts = Array.isArray(order.items) && order.items.length > 0
                            return (
                                <div
                                    key={order._id}
                                    className="border rounded-md p-4 flex flex-col justify-between font-sans min-h-[220px] shadow-sm hover:shadow-md transition bg-white md:max-w-md"
                                >
                                    <div className={`w-4 h-4 rounded-full ${statusColor} self-end mb-2`}></div>

                                    <div className="flex justify-start text-xs text-gray-500 mb-2">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
                                    </div>


                                    <div className="text-[11px] mb-3 space-y-1">
                                        <p><strong>ID:</strong> {order._id}</p>
                                        <p><strong>Usuario:</strong> {order.userId}</p>
                                        <p><strong>Estado:</strong>
                                            <span
                                                className={`ml-1 px-2 py-1 rounded text-[10px] font-semibold ${getStatusColor(order.status)} ${statusOptions.find(s => s.value === order.status)?.color.split(' ')[1]}`}
                                            >
                                                {statusLabels[order.status] || order.status}
                                            </span>
                                        </p>
                                    </div>


                                    <div className="mb-2">
                                        <textarea
                                            value={noteValue}
                                            onChange={(event) => handleNotesChange(order._id, event.target.value)}
                                            className="w-full border border-gray-300 rounded px-2 py-1 resize-none text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-mostaza)]"
                                            placeholder="Notas..."
                                            rows={2}
                                        />
                                        <div className="flex justify-center mt-2">
                                            <button
                                                onClick={() => saveNotes(order._id)}
                                                className="mt-1 flex justify-center bg-[var(--color-burdeos-dark)] text-white rounded px-2 py-1 text-sm hover:bg-[var(--color-mostaza)]"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>


                                    <div className=" border border-gray-300 p-2 rounded mb-2 flex-1 overflow-auto text-sm space-y-1">
                                        {hasProducts && (
                                            order.items.map((item, index) => (
                                                <div key={index} className={`flex justify-between pb-1 mb-1 ${index !== order.items.length - 1 ? 'border-b border-gray-300' : ''}`}>
                                                    <span><strong>{item.name ?? `Producto ${item.productId}`}</strong>
                                                        ({item.qty ?? 0}×€{(item.price ?? 0).toFixed(2)})
                                                    </span>
                                                    <span>€{((item.price ?? 0) * (item.qty ?? 0)).toFixed(2)}</span>
                                                </div>
                                            ))
                                        )}
                                        {!hasProducts && (
                                            <p className="italic text-gray-500">Sin productos</p>
                                        )}
                                    </div>


                                    <div className="bg-yellow-100 p-2 rounded mb-2 text-sm font-sans space-y-1">
                                        <p><strong>Subtotal:</strong> €{subtotal.toFixed(2)}</p>
                                        <p><strong>Impuestos (10%):</strong> €{tax.toFixed(2)}</p>
                                        <p><strong>Total:</strong> €{total.toFixed(2)}</p>
                                    </div>


                                    <div className="space-y-1">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-mostaza)]"
                                        >
                                            {statusOptions.filter(statusOption => statusOption.value !== "all").map(status => (
                                                <option key={status.value} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                        <div className="flex justify-center mt-2">
                                            <button
                                                onClick={() => deleteOrder(order._id)}
                                                className="w-8 bg-burdeos-dark text-white rounded px-2 py-1 text-sm hover:bg-red-800"
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}


            <div className="mt-8 p-4 flex flex-col justify-end text-right rounded-xl shadow-inner text-[var(--color-burdeos-dark)]">
                <h2 className="text-lg font-semibold mb-2">
                    Total global:
                </h2>
                <p>
                    <strong>Subtotal:</strong> €{globalTotals.subtotal.toFixed(2)}
                </p>
                <p>
                    <strong>Impuestos (10%):</strong> €{globalTotals.tax.toFixed(2)}
                </p>
                <p>
                    <strong>Total:</strong> €{globalTotals.total.toFixed(2)}
                </p>
            </div>
        </div >
    );
};
