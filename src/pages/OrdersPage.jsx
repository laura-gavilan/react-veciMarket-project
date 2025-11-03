import { useEffect, useState } from "react";
import { useOrdersContext } from "../contexts/OrdersContext";

export const OrdersPage = () => {
    const { orders, loading, error, updateOrderStatus, deleteOrder, updateOrderNotes } = useOrdersContext();
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [notesState, setNotesState] = useState({}); // { orderId: "nota actual" }

    const statusOptions = [
        { label: "Todas", value: "all", color: "bg-gray-200 text-gray-700" },
        { label: "Pendientes", value: "pending", color: "bg-yellow-100 text-yellow-800" },
        { label: "En preparación", value: "preparing", color: "bg-blue-100 text-blue-800" },
        { label: "Entregadas", value: "delivered", color: "bg-green-100 text-green-800" },
        { label: "Canceladas", value: "cancelled", color: "bg-red-100 text-red-800" },
    ];

    

    if (loading)
        return (
            <p className="text-center mt-10 text-[var(--color-burdeos-dark)] font-sans text-lg">
                Cargando órdenes...
            </p>
        );

    if (error)
        return (
            <p className="text-center mt-10 text-red-600 font-sans text-lg">
                Error: {error.message}
            </p>
        );

    const filteredOrders = orders.filter((o) => {
        const matchesStatus = filter === "all" || o.status === filter;
        const matchesSearch =
            (o._id || "").includes(searchTerm) || (o.userId || "").includes(searchTerm);
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
            orders.forEach((o) => {
                if (updated[o._id] === undefined) {
                    // Primero busca en localStorage, luego en order.notes
                    updated[o._id] = storedNotes[o._id] ?? o.notes ?? "";
                }
            });
            return updated;
        });
    }, [orders]);

    const handleNotesChange = (orderId, value) => {
        setNotesState({ ...notesState, [orderId]: value });
    };

    const saveNotes = (orderId) => {
        const noteText = notesState[orderId]?.trim();
        if (!noteText) return;

        // Actualizar estado local (para que se vea de inmediato)
        if (updateOrderNotes) updateOrderNotes(orderId, noteText);

        // Guardar en localStorage
        const savedNotes = JSON.parse(localStorage.getItem('orderNotes')) || {};
        savedNotes[orderId] = noteText;
        localStorage.setItem('orderNotes', JSON.stringify(savedNotes));
    };



    return (
        <div className="max-w-7xl mx-auto mt-12 p-6 md:p-10 bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)]">
            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-[var(--color-burdeos-dark)] text-center">
                Gestión de Órdenes
            </h1>

            {/* Búsqueda y filtros */}
            <div className="sticky top-0 z-10 bg-white py-4 mb-6 flex flex-col gap-4 border-b border-[var(--color-burdeos-light)]">
                {/* FILTROS ARRIBA */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {statusOptions.map((s) => {
                        const count =
                            s.value === "all"
                                ? orders.length
                                : orders.filter((o) => o.status === s.value).length;
                        return (
                            <button
                                key={s.value}
                                onClick={() => setFilter(s.value)}
                                className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm transition ${filter === s.value
                                    ? "bg-[var(--color-burdeos-dark)] text-white"
                                    : `${s.color} hover:bg-[var(--color-mostaza)] hover:text-white`
                                    }`}
                            >
                                {s.label} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* BARRA DE BÚSQUEDA ABAJO */}
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

            {/* Listado de órdenes */}
            {filteredOrders.length === 0 ? (
                <p className="text-gray-500 italic text-center">
                    No hay órdenes en este estado.
                </p>
            ) : (
                <div className="flex flex-col gap-4">
                    {/* Cards para sm */}
                    {filteredOrders.map((o) => {
                        const { subtotal, tax, total } = getTotals(o);
                        const noteValue =
                            notesState[o._id] !== undefined ? notesState[o._id] : o.notes ?? "";
                        return (
                            <div
                                key={o._id}
                                className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md md:hidden"
                            >
                                <p>
                                    <strong>ID:</strong> {o._id}
                                </p>
                                <p>
                                    <strong>Usuario:</strong> {o.userId}
                                </p>
                                <p>
                                    <strong>Estado:</strong> {o.status}
                                </p>
                                <p>
                                    <strong>Creada:</strong>{" "}
                                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}
                                </p>
                                <textarea
                                    placeholder="Agregar nota..."
                                    value={noteValue}
                                    onChange={(e) => handleNotesChange(o._id, e.target.value)}
                                    className="w-full border border-gray-300 rounded px-2 py-1 mt-2 resize-none"
                                />
                                <button
                                    onClick={() => saveNotes(o._id)}
                                    className="mt-2 w-full bg-[var(--color-burdeos-dark)] text-white rounded px-2 py-1 hover:bg-[var(--color-mostaza)]"
                                >
                                    Guardar nota
                                </button>
                                {o.notes && (
                                    <p className="text-xs text-gray-500 italic mt-1">
                                        Nota actual: {o.notes}
                                    </p>
                                )}
                                {Array.isArray(o.items) && o.items.length > 0 ? (
                                    <>
                                        <ul className="list-disc ml-4 space-y-1">
                                            {o.items.map((item, idx) => (
                                                <li key={idx}>
                                                    <span className="font-semibold">
                                                        {item.name || item.productId}
                                                    </span>{" "}
                                                    — €{((item.price ?? 0) * (item.qty ?? 0)).toFixed(2)} (
                                                    {item.qty ?? 0}×€{(item.price ?? 0).toFixed(2)})
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="text-sm mt-2 space-y-1">
                                            <p>
                                                <strong>Subtotal:</strong> €{subtotal.toFixed(2)}
                                            </p>
                                            <p>
                                                <strong>Impuestos (10%):</strong> €{tax.toFixed(2)}
                                            </p>
                                            <p>
                                                <strong>Total:</strong> €{total.toFixed(2)}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-500 italic">Sin productos</p>
                                )}
                                <div className="mt-2 space-y-2">
                                    <select
                                        value={o.status}
                                        onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                                        className="w-full border rounded px-2 py-1"
                                    >
                                        {statusOptions
                                            .filter((s) => s.value !== "all")
                                            .map((s) => (
                                                <option key={s.value} value={s.value}>
                                                    {s.label}
                                                </option>
                                            ))}
                                    </select>
                                    <button
                                        onClick={() => deleteOrder(o._id)}
                                        className="w-full bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {/* Tabla para md+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                        {filteredOrders.map((o) => {
                            const { subtotal, tax, total } = getTotals(o);
                            const noteValue = notesState[o._id] ?? o.notes ?? "";

                            return (
                                <div
                                    key={o._id}
                                    className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between font-sans min-h-[400px] shadow-sm hover:shadow-md"
                                >
                                    {/* Fecha arriba a la derecha */}
                                    <div className="flex justify-end text-xs text-gray-500 mb-2">
                                        {o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}
                                    </div>

                                    {/* Info básica */}
                                    <div className="text-sm mb-2 space-y-1">
                                        <p><strong>ID:</strong> {o._id}</p>
                                        <p><strong>Usuario:</strong> {o.userId}</p>
                                        <p><strong>Estado:</strong> <span className="capitalize">{o.status}</span></p>
                                    </div>

                                    {/* Notas */}
                                    <div className="mb-2">
                                        <textarea
                                            value={noteValue}
                                            onChange={(e) => handleNotesChange(o._id, e.target.value)}
                                            className="w-full border border-gray-300 rounded px-2 py-1 resize-none text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-mostaza)]"
                                            placeholder="Notas..."
                                            rows={2}
                                        />
                                        <button
                                            onClick={() => saveNotes(o._id)}
                                            className="mt-1 w-full bg-[var(--color-burdeos-dark)] text-white rounded px-2 py-1 text-sm hover:bg-[var(--color-mostaza)]"
                                        >
                                            Guardar
                                        </button>
                                    </div>

                                    {/* Productos con fondo */}
                                    <div className="bg-[var(--color-gray-warm)] p-2 rounded mb-2 flex-1 overflow-auto text-sm space-y-1">
                                        {Array.isArray(o.items) && o.items.length > 0 ? (
                                            o.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between">
                                                    <span>{item.name ?? `Producto ${item.productId}`} ({item.qty ?? 0}×€{(item.price ?? 0).toFixed(2)})</span>
                                                    <span>€{((item.price ?? 0) * (item.qty ?? 0)).toFixed(2)}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="italic text-gray-500">Sin productos</p>
                                        )}
                                    </div>

                                    {/* Totales con otro fondo */}
                                    <div className="bg-[var(--color-mostaza-pastel)] p-2 rounded mb-2 text-sm space-y-1">
                                        <p><strong>Subtotal:</strong> €{subtotal.toFixed(2)}</p>
                                        <p><strong>Impuestos (10%):</strong> €{tax.toFixed(2)}</p>
                                        <p><strong>Total:</strong> €{total.toFixed(2)}</p>
                                    </div>

                                    {/* Acciones */}
                                    <div className="space-y-1">
                                        <select
                                            value={o.status}
                                            onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-mostaza)]"
                                        >
                                            {statusOptions.filter(s => s.value !== "all").map(s => (
                                                <option key={s.value} value={s.value}>{s.label}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => deleteOrder(o._id)}
                                            className="w-full bg-red-600 text-white rounded px-2 py-1 text-sm hover:bg-red-800"
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Totales globales */}
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
