

export const FilteredOrders = ({ filteredOrders, statusOptions, statusLabels, notesState, handleNotesChange, saveNotes, getStatusColor, getTotals, updateOrderStatus, deleteOrder }) => {

    return (
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
    )
}