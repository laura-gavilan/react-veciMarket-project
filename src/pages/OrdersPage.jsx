import { useState } from "react";
import { useOrdersContext } from "../contexts/OrdersContext";

export const OrdersPage = () => {
    const { orders, loading, error, addOrder, updateOrderStatus, deleteOrder } = useOrdersContext();

    const [newOrder, setNewOrder] = useState({
        userId: "",
        items: [{ productId: "", qty: 1 }],
        status: "pending",
        notes: "",
    });

    const statusOptions = [
        { label: "Pendiente", value: "pending" },
        { label: "Enviado", value: "preparing" },
        { label: "Entregado", value: "delivered" },
        { label: "Cancelado", value: "cancelled" },
    ];

    // Manejo de inputs dinámicos
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...newOrder.items];
        updatedItems[index][field] = value;
        setNewOrder({ ...newOrder, items: updatedItems });
    };

    const handleAddItem = () => {
        setNewOrder({ ...newOrder, items: [...newOrder.items, { productId: "", qty: 1 }] });
    };

    const handleRemoveItem = (index) => {
        const updatedItems = newOrder.items.filter((_, i) => i !== index);
        setNewOrder({ ...newOrder, items: updatedItems });
    };

    const handleCreateOrder = (e) => {
        e.preventDefault();
        if (!newOrder.userId || newOrder.items.some((i) => !i.productId)) {
            alert("Por favor completa todos los campos de la orden.");
            return;
        }

        const orderData = {
            _id: Date.now().toString(),
            userId: newOrder.userId,
            items: newOrder.items.map((i) => ({ productId: i.productId.trim(), qty: Number(i.qty) || 1 })),
            status: newOrder.status,
            notes: newOrder.notes || "",
            createdAt: new Date().toISOString(),
        };

        addOrder(orderData);
        setNewOrder({ userId: "", items: [{ productId: "", qty: 1 }], status: "pending", notes: "" });
    };

    if (loading)
        return <p className="text-center mt-10 text-[var(--color-burdeos-dark)] font-sans text-lg">Cargando órdenes...</p>;

    if (error)
        return <p className="text-center mt-10 text-red-600 font-sans text-lg">Error: {error.message}</p>;


    return (
        <div className="max-w-5xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)]">
            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-[var(--color-burdeos-dark)] text-center">
                Gestión de Órdenes
            </h1>

            {/* Formulario de nueva orden */}
            <form
                onSubmit={handleCreateOrder}
                className="bg-[var(--color-gray-warm)] rounded-2xl p-6 mb-10 shadow-sm border border-[var(--color-burdeos-light)]"
            >
                <h3 className="text-2xl font-title mb-6 text-[var(--color-burdeos-dark)]">Crear nueva orden</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-[var(--color-burdeos-darker)]">
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-[var(--color-burdeos-dark)]">ID Usuario:</label>
                        <input
                            type="text"
                            value={newOrder.userId}
                            onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
                            placeholder="Ej: 12345"
                            className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-[var(--color-burdeos-dark)]">Estado:</label>
                        <select
                            value={newOrder.status}
                            onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                            className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                        >
                            {statusOptions.map((s) => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Items dinámicos */}
                <div className="mt-8">
                    <h4 className="text-xl font-title mb-4 text-[var(--color-burdeos-dark)]">Items de la orden</h4>

                    {newOrder.items.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 mb-4 bg-white border border-[var(--color-burdeos-light)] p-4 rounded-2xl">
                            <div className="flex-1">
                                <label className="block mb-1 font-semibold text-[var(--color-burdeos-dark)]">ID Producto:</label>
                                <input
                                    type="text"
                                    value={item.productId}
                                    onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                                    placeholder="Ej: prod123"
                                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                                />
                            </div>

                            <div className="flex flex-col md:w-40">
                                <label className="block mb-1 font-semibold text-[var(--color-burdeos-dark)]">Cantidad:</label>
                                <input
                                    type="number"
                                    value={item.qty}
                                    min="1"
                                    onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                                    className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                                />
                            </div>

                            <div className="flex flex-col mt-4 md:mt-0">
                                <label className="mb-2 font-semibold text-[var(--color-burdeos-dark)]">Notas:</label>
                                <textarea
                                    value={newOrder.notes || ""}
                                    onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                                    placeholder="Ej: Entregar por la mañana"
                                    className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="btn-secondary bg-red-700 hover:bg-red-600 text-white md:self-end mt-2 md:mt-0"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button type="button" onClick={handleAddItem} className="btn-primary mt-4 elevation">
                            + Agregar otro producto
                        </button>
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button type="submit" className="btn-primary elevation w-full md:w-auto">
                        Crear Orden
                    </button>
                </div>
            </form>

            {/* Lista de órdenes */}
            <section>
                <h3 className="text-2xl font-title mb-6 text-[var(--color-burdeos-dark)]">
                    Órdenes registradas ({orders.length})
                </h3>

                {orders.length === 0 ? (
                    <p className="text-center text-[var(--color-burdeos-dark)] font-sans text-lg">
                        No hay órdenes registradas.
                    </p>) : (
                    <> {/* Mostrar todas las órdenes */}
                        <div className="mb-10"> <h4 className="text-xl font-title mb-4 text-[var(--color-burdeos-dark)]">
                            Todas las órdenes
                        </h4> <ul className="space-y-6"> {orders.map((o) => (
                            <li key={o._id} className="p-6 bg-[var(--color-gray-warm)] rounded-2xl border border-[var(--color-burdeos-light)] shadow-sm elevation">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4"> <div>
                                    <p className="font-semibold"><strong>ID:</strong> {o._id}
                                    </p> <p><strong>Usuario:</strong> {o.userId}</p>
                                    <p><strong>Estado:</strong> <span className="capitalize">{o.status}
                                    </span></p> </div> <p className="text-sm text-gray-500 mt-2 md:mt-0"> Creado: {new Date(o.createdAt).toLocaleString()} </p> </div>
                                <div className="mb-4">
                                    <h4 className="font-semibold text-[var(--color-burdeos-dark)] mb-2">Items:</h4>
                                    <ul className="list-disc ml-6"> {o.items?.map((item, idx) => (
                                        <li key={idx}> <span className="font-semibold">{item.productId}</span> — Cantidad: {item.qty} </li>))}
                                    </ul> </div> <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-4">
                                    <select value={o.status} onChange={(e) => updateOrderStatus(o._id, e.target.value)} className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition" >
                                        {statusOptions.map((s) => (
                                            <option key={s.value} value={s.value}> Marcar como {s.label} </option>))}
                                    </select>
                                    <button onClick={() => deleteOrder(o._id)} className="btn-secondary bg-red-700 hover:bg-red-600 text-white mt-2 sm:mt-0" >
                                        Eliminar
                                    </button>
                                </div>
                            </li>))}

                            </ul> </div>
                        {/* Mostrar por estado */}
                        {statusOptions.map((status) => {
                            const filteredOrders = orders.filter((o) => o.status === status.value);
                            return (<div key={status.value} className="mb-10">
                                <h4 className="text-xl font-title mb-4 text-[var(--color-burdeos-dark)]">{status.label}</h4>
                                {filteredOrders.length === 0 ? (<p className="text-gray-500 italic">No hay órdenes en este estado.</p>) : (
                                    <ul className="space-y-6"> {filteredOrders.map((o) => (
                                        <li key={o._id} className="p-6 bg-[var(--color-gray-warm)] rounded-2xl border border-[var(--color-burdeos-light)] shadow-sm elevation">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4"> <div>
                                                <p className="font-semibold"><strong>ID:</strong> {o._id}</p>
                                                <p><strong>Usuario:</strong> {o.userId}</p>
                                                <p><strong>Estado:</strong> <span className="capitalize">{o.status}
                                                </span></p> </div> <p className="text-sm text-gray-500 mt-2 md:mt-0"> Creado: {new Date(o.createdAt).toLocaleString()} </p>
                                            </div> <div className="mb-4"> <h4 className="font-semibold text-[var(--color-burdeos-dark)] mb-2">
                                                Items:
                                            </h4> <ul className="list-disc ml-6"> {o.items?.map((item, idx) => (
                                                <li key={idx}> <span className="font-semibold">{item.productId}
                                                </span> — Cantidad: {item.qty}
                                                </li>))}
                                                </ul>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-4">
                                                <select value={o.status} onChange={(e) => updateOrderStatus(o._id, e.target.value)} className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition" >
                                                    {statusOptions.map((s) => (
                                                        <option key={s.value} value={s.value}> Marcar como {s.label} </option>))}
                                                </select>
                                                <button onClick={() => deleteOrder(o._id)} className="btn-secondary bg-red-700 hover:bg-red-600 text-white mt-2 sm:mt-0" >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </li>))}
                                    </ul>)}
                            </div>);
                        })} </>)}
            </section>
        </div>
    )
};
