import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useOrdersContext } from "../contexts/OrdersContext";
import { FilteredOrders, type OrderStatus } from "../components/FilteredOrders";
import { useAuth } from "../core/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { PageError } from "../components/PageError";
import { useTranslate } from "../translations/locales/useTranslate";
import type { Orders } from "../types/types";


export type NotesType = Record<string, string>;

const OrdersPage = () => {
    const { orders, loading, error, updateOrderStatus, deleteOrder, updateOrderNotes } = useOrdersContext();
    const [filter, setFilter] = useState<OrderStatus | "all">("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [notesState, setNotesState] = useState<NotesType>({});
    const { user } = useAuth();
    const navigate = useNavigate();
    const isAdmin = user?.role === "admin";
    const { t } = useTranslate();

    const statusOptions: {label: string, value: OrderStatus | "all", color: string}[] = useMemo(() => ([
        { label: t("orders.status.all"), value: "all", color: "bg-gray-300 text-gray-700" },
        { label: t("orders.status.pending"), value: "pending", color: "bg-yellow-200 text-yellow-800" },
        { label: t("orders.status.preparing"), value: "preparing", color: "bg-blue-300 text-blue-800" },
        { label: t("orders.status.delivered"), value: "delivered", color: "bg-green-300 text-green-800" },
        { label: t("orders.status.cancelled"), value: "cancelled", color: "bg-red-300 text-red-800" },
    ]), [t]);

    const statusLabels: Record<OrderStatus, string> = useMemo(() => ({
        pending: (t("orders.status.pending")),
        preparing: (t("orders.status.preparing")),
        delivered: (t("orders.status.delivered")),
        cancelled: (t("orders.status.cancelled")),
    }), [t]);

    const getStatusColor = useCallback((status: OrderStatus | "all"): string => {
        const option = statusOptions.find(s => s.value === status);
        return option ? option.color.split(' ')[0] : 'bg-gray-400';
    },[statusOptions]);

    // Filtrar órdenes según usuario o admin
    const visibleOrders = useMemo(() => {
        if (!user?._id) return [];
        return orders.filter(order => isAdmin || order.userId === user._id);
    }, [orders, user, isAdmin]);


    const filteredOrders = useMemo(() => {
        return visibleOrders.filter(order => {
            const matchesStatus = filter === "all" || order.status === filter;
            const matchesSearch =
                (order._id || "").includes(searchTerm) || (order.userId || "").includes(searchTerm);
            return matchesStatus && matchesSearch;
        });
    }, [visibleOrders, filter, searchTerm]);


    const getTotals = useCallback((order: Orders) => {
        const items = Array.isArray(order.items) ? order.items : [];
        const subtotal = items.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 0), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        return { subtotal, tax, total };
    },[]);

    const globalTotals = useMemo(() => {
        return filteredOrders.reduce((acc, order) => {
            const { subtotal, tax, total } = getTotals(order);
            acc.subtotal += subtotal;
            acc.tax += tax;
            acc.total += total;
            return acc;
        }, { subtotal: 0, tax: 0, total: 0 });
    }, [filteredOrders]);

    useEffect(() => {
        const storedNotes: NotesType = JSON.parse(localStorage.getItem("orderNotes") || "{}");
        const updatedNotes: NotesType = {};
        visibleOrders.forEach(order => {
            updatedNotes[order._id] = storedNotes[order._id] ?? order.notes ?? "";
        });
        setNotesState(updatedNotes);
    }, [orders, user]);

    const handleNotesChange = useCallback((orderId: string, value: string) => {
        setNotesState(prev => ({ ...prev, [orderId]: value }));
    }, []);

    const saveNotes = useCallback((orderId: string) => {
        const noteText = notesState[orderId]?.trim();
        if (!noteText) return;
        if (updateOrderNotes) updateOrderNotes(orderId, noteText);

        const savedNotes: NotesType = JSON.parse(localStorage.getItem('orderNotes') || '{}');
        savedNotes[orderId] = noteText;
        localStorage.setItem('orderNotes', JSON.stringify(savedNotes));
    },[]);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const statusButtons = useMemo(() => {
        return statusOptions.map(status => {
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
        });
    }, [statusOptions, visibleOrders, filter]);

    if (!user?._id) {
        return (
            <PageError
                title="Debes iniciar sesión"
                message="Para ver tus pedidos, regístrate o inicia sesión."
                onRetry={() => navigate("/login")}
            />
        );
    }

    if (loading) return <p className="text-center mt-10">{t("components.loading")}</p>;
    
    if (error) {
        const message = error instanceof Error ? error.message: String(error);
        return (
            <PageError
                title="Error al cargar pedidos"
                message={message || "Ha ocurrido un error al cargar los pedidos."}
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <div className="max-w-7xl mx-auto mt-12 p-6 md:p-10 bg-white rounded-3xl shadow-xl border">
            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-center">
                {t("orders.title")}
            </h1>

            <div className="sticky top-0 z-10 bg-white py-4 mb-6 flex flex-col gap-4 border-b">
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {statusButtons}
                </div>

                <div className="flex w-full md:w-1/2 gap-2">
                    <input
                        type="text"
                        placeholder="Buscar por ID de orden o usuario..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)]"
                    />
                </div>
            </div>

            {filteredOrders.length === 0 && (
                <p className="text-gray-500 italic text-center">{t("orders.no_orders")}.</p>
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
                    updateOrderStatus={isAdmin ? updateOrderStatus : () => {}}
                    deleteOrder={isAdmin ? deleteOrder : () => {}}
                    canEdit={isAdmin}
                    user={user}
                />
            )}

            <div className="mt-8 p-4 flex flex-col justify-end text-right rounded-xl shadow-inner">
                <h2 className="text-lg font-semibold mb-2">{t("cart.total")}:</h2>
                <p><strong>{t("cart.subtotal")}:</strong> €{globalTotals.subtotal.toFixed(2)}</p>
                <p><strong>{t("orders.taxes")} (10%):</strong> €{globalTotals.tax.toFixed(2)}</p>
                <p><strong>{t("cart.total")}</strong> €{globalTotals.total.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrdersPage;

