export const FilteredOrders = ({
    filteredOrders,
    statusOptions,
    statusLabels,
    notesState,
    handleNotesChange,
    saveNotes,
    getStatusColor,
    getTotals,
    updateOrderStatus,
    deleteOrder,
    canEdit = false,
    user 
}) => {

    const isAdmin = user?.role === "admin";

    const visibleOrders = filteredOrders.filter(order => {
        if (isAdmin) return true; 
        if (user?._id) return order.userId === user._id; 
        return false; 
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                {visibleOrders.map(order => {
                    const { subtotal, tax, total } = getTotals(order);
                    const noteValue = notesState[order._id] ?? order.notes ?? "";
                    const statusColor = getStatusColor(order.status).split(' ')[0];
                    const hasProducts = Array.isArray(order.items) && order.items.length > 0;

                    return (
                        <div
                            key={order._id}
                            className="border rounded-md p-4 flex flex-col justify-between font-sans min-h-[220px] shadow-sm hover:shadow-md transition bg-general md:max-w-md"
                        >
                            <div className={`w-4 h-4 rounded-full ${statusColor} self-end mb-2`}></div>

                            <div className="flex justify-start text-xs text-primary-light mb-2">
                                {order.createdAt && new Date(order.createdAt).toLocaleString()}
                            </div>

                            <div className="text-[11px] mb-3 space-y-1 text-primary-dark">
                                <p><strong>ID:</strong> {order._id}</p>
                                <p><strong>Usuario:</strong> {order.userId}</p>
                                <p><strong>Estado:</strong>
                                    <span className={`ml-1 px-2 py-1 rounded text-[10px] font-semibold ${getStatusColor(order.status)} ${statusOptions.find(s => s.value === order.status)?.color.split(' ')[1]}`}>
                                        {statusLabels[order.status] || order.status}
                                    </span>
                                </p>
                            </div>

                            <div className="mb-2">
                                {canEdit && isAdmin && (
                                    <>
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
                                                className="mt-1 btn-primary"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </>
                                )}
                                {!canEdit || !isAdmin && (
                                    <textarea
                                        value={noteValue}
                                        readOnly
                                        className="w-full border border-gray-300 rounded px-2 py-1 resize-none text-sm bg-gray-100"
                                        rows={2}
                                    />
                                )}
                            </div>

                            <div className="border border-gray-300 p-2 rounded mb-2 flex-1 overflow-auto text-sm space-y-1">
                                {hasProducts && order.items.map((item, index) => {
                                    const isLast = index === order.items.length - 1;
                                    return (
                                        <div key={index}
                                            className={`flex justify-between pb-1 mb-1 ${!isLast ? "border-b border-gray-300" : ""}`}
                                        >
                                            <span><strong>{item.name ?? `Producto ${item.productId}`}</strong>
                                                ({item.qty ?? 0}×€{(item.price ?? 0).toFixed(2)})
                                            </span>
                                            <span>€{((item.price ?? 0) * (item.qty ?? 0)).toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                                {!hasProducts && <p className="italic text-primary-light">Sin productos</p>}
                            </div>

                            <div className="bg-yellow-100 p-2 rounded mb-2 text-sm font-sans space-y-1">
                                <p><strong>Subtotal:</strong> €{subtotal.toFixed(2)}</p>
                                <p><strong>Impuestos (10%):</strong> €{tax.toFixed(2)}</p>
                                <p><strong>Total:</strong> €{total.toFixed(2)}</p>
                            </div>

                            {canEdit && isAdmin && (
                                <div className="space-y-1">
                                    <select
                                        value={order.status}
                                        onChange={(event) => updateOrderStatus(order._id, event.target.value)}
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-mostaza)]"
                                    >
                                        {statusOptions.filter(statusOption => statusOption.value !== "all").map(status => {
                                            return <option key={status.value} value={status.value}>{status.label}</option>
                                        })}
                                    </select>
                                    <div className="flex justify-center mt-2">
                                        <button
                                            onClick={() => deleteOrder(order._id)}
                                            className="btn-secondary w-8 px-2 py-1 text-sm"
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    )
                })}
            </div>
        </div>
    )
}