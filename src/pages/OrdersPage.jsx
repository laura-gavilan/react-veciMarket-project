import { useEffect, useState } from "react";
import { useOrdersContext } from "../contexts/OrdersContext";
import { FilteredOrders } from "../components/FilteredOrdersList";
import { useAuth } from "../core/auth/useAuth";
import { useNavigate } from "react-router-dom";

export const OrdersPage = () => {
    const { orders, loading, error, updateOrderStatus, deleteOrder, updateOrderNotes } = useOrdersContext();
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [notesState, setNotesState] = useState({});
    const { user } = useAuth();
    const navigate = useNavigate();
    const isAdmin = user?.role === "admin";

    const statusOptions = [
        { label: "Todos", value: "all", color: "bg-gray-300 text-gray-700" },
        { label: "Pendientes", value: "pending", color: "bg-yellow-200 text-yellow-800" },
        { label: "En preparación", value: "preparing", color: "bg-blue-300 text-blue-800" },
        { label: "Entregados", value: "delivered", color: "bg-green-300 text-green-800" },
        { label: "Cancelados", value: "cancelled", color: "bg-red-300 text-red-800" },
    ];

    const statusLabels = {
        pending: "Pendiente",
        preparing: "En preparación",
        delivered: "Entregado",
        cancelled: "Cancelado",
    };

    const getStatusColor = (status) => {
        const option = statusOptions.find(s => s.value === status);
        return option ? option.color.split(' ')[0] : 'bg-gray-400';
    };

    // Filtrar órdenes según usuario o admin
    const visibleOrders = orders.filter(order => {
        if (!user?._id) return false;
        if (isAdmin) return true;
        return order.userId === user._id;
    });

    const filteredOrders = visibleOrders.filter(order => {
        const matchesStatus = filter === "all" || order.status === filter;
        const matchesSearch =
            (order._id || "").includes(searchTerm) || (order.userId || "").includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    const getTotals = (order) => {
        const items = Array.isArray(order.items) ? order.items : [];
        const subtotal = items.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 0), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const globalTotals = filteredOrders.reduce((acc, order) => {
        const { subtotal, tax, total } = getTotals(order);
        acc.subtotal += subtotal;
        acc.tax += tax;
        acc.total += total;
        return acc;
    }, { subtotal: 0, tax: 0, total: 0 });

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("orderNotes") || "{}");
        const updatedNotes = {};
        visibleOrders.forEach(order => {
            updatedNotes[order._id] = storedNotes[order._id] ?? order.notes ?? "";
        });
        setNotesState(updatedNotes);
    }, [orders, user]);

    const handleNotesChange = (orderId, value) => {
        setNotesState(prev => ({ ...prev, [orderId]: value }));
    };

    const saveNotes = (orderId) => {
        const noteText = notesState[orderId]?.trim();
        if (!noteText) return;
        if (updateOrderNotes) updateOrderNotes(orderId, noteText);
        const savedNotes = JSON.parse(localStorage.getItem('orderNotes') || '{}');
        savedNotes[orderId] = noteText;
        localStorage.setItem('orderNotes', JSON.stringify(savedNotes));
    };

    if (!user?._id) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">🔒 Debes iniciar sesión</h2>
                <p>Para ver tus pedidos, regístrate o inicia sesión.</p>
                <button onClick={() => navigate("/login")} className="btn-primary mt-4">
                    Iniciar sesión
                </button>
            </div>
        );
    }

    if (loading) return <p className="text-center mt-10">Cargando pedidos...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">Error: {error.message}</p>;

    return (
        <div className="max-w-7xl mx-auto mt-12 p-6 md:p-10 bg-white rounded-3xl shadow-xl border">
            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-center">
                Gestión de pedidos
            </h1>

            <div className="sticky top-0 z-10 bg-white py-4 mb-6 flex flex-col gap-4 border-b">
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {statusOptions.map(status => {
                        const count = status.value === "all"
                            ? visibleOrders.length
                            : visibleOrders.filter(order => order.status === status.value).length;
                        return (
                            <button
                                key={status.value}
                                onClick={() => setFilter(status.value)}
                                className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm transition ${filter === status.value
                                    ? "bg-primary text-white"
                                    : `${status.color} hover:bg-accent-primary hover:text-primary-dark`
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
                        onChange={event => setSearchTerm(event.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)]"
                    />
                </div>
            </div>

            {filteredOrders.length === 0 && (
                <p className="text-gray-500 italic text-center">No hay órdenes en este estado.</p>
            )}

            {filteredOrders.length > 0 && (
                <FilteredOrders
                    filteredOrders={filteredOrders}
                    statusOptions={statusOptions}
                    statusLabels={statusLabels}
                    notesState={notesState}
                    handleNotesChange={handleNotesChange}
                    saveNotes={saveNotes}
                    getStatusColor={getStatusColor}
                    getTotals={getTotals}
                    updateOrderStatus={isAdmin ? updateOrderStatus : undefined}
                    deleteOrder={isAdmin ? deleteOrder : undefined}
                    canEdit={isAdmin}
                    user={user} 
                />
            )}

            <div className="mt-8 p-4 flex flex-col justify-end text-right rounded-xl shadow-inner">
                <h2 className="text-lg font-semibold mb-2">Total global:</h2>
                <p><strong>Subtotal:</strong> €{globalTotals.subtotal.toFixed(2)}</p>
                <p><strong>Impuestos (10%):</strong> €{globalTotals.tax.toFixed(2)}</p>
                <p><strong>Total:</strong> €{globalTotals.total.toFixed(2)}</p>
            </div>
        </div>
    );
};


