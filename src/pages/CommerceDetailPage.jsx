import { useContext, useEffect, useState } from "react";
import { useParams, Outlet, useNavigate, Link } from "react-router-dom";
import { CommerceContext } from "../contexts/CommerceContext";
import { api } from "../core/http/axios";

export const CommerceDetailPage = () => {
    const { commerces } = useContext(CommerceContext);
    const { commerceId } = useParams();
    const [selectedCommerce, setSelectedCommerce] = useState(null);
    const navigate = useNavigate();

    // 🔹 Refresca comercio completo con productos
    const refreshCommerce = async () => {
        try {
            const { data } = await api.get(`/commerces/${commerceId}`);
            setSelectedCommerce(data);
        } catch (error) {
            console.error("Error cargando el comercio:", error);
        }
    };

    useEffect(() => {
        const commerce = commerces?.find(c => c._id === commerceId);
        if (commerce) setSelectedCommerce(commerce);
        else refreshCommerce();
    }, [commerces, commerceId]);

    if (!selectedCommerce) {
        return (
            <div className="p-4 text-center text-gray-500">
                <h1 className="text-xl font-semibold">Cargando comercio...</h1>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
            <button
                onClick={() => navigate(-1)}
                className="self-start mb-4 px-4 py-2 bg-violet-700 text-white rounded-full hover:bg-violet-800 transition-colors"
            >
                ← Volver
            </button>

            {/* Información principal */}
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-violet-900">{selectedCommerce.name}</h1>
                    <p className="text-gray-700">{selectedCommerce.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                        <p><span className="font-semibold">Slug:</span> {selectedCommerce.slug}</p>
                        <p><span className="font-semibold">Calle:</span> {selectedCommerce.address.street}</p>
                        <p><span className="font-semibold">Ciudad:</span> {selectedCommerce.address.city}</p>
                        <p><span className="font-semibold">Teléfono:</span> {selectedCommerce.address.phone}</p>
                        <p><span className="font-semibold">Email:</span> {selectedCommerce.address.email}</p>
                        <p><span className="font-semibold">Horario:</span> {selectedCommerce.address.schedule}</p>
                    </div>
                </div>
            </div>

            {/* Productos */}
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-violet-900">Productos</h2>
                {selectedCommerce.products?.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {selectedCommerce.products.map(product => (
                            <div
                                key={product._id}
                                className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-shadow flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-bold text-lg">{product.name}</h3>
                                    <p className="text-gray-700">{product.price}€</p>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        to={`edit/${product._id}`}
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            if (!confirm("¿Eliminar producto?")) return;
                                            await api.delete(`/products/${product._id}`, {
                                                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                                            });
                                            refreshCommerce(); // 🔹 refresca lista después de eliminar
                                        }}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hay productos disponibles</p>
                )}
            </div>

            {/* Outlet para CreateProductPage o EditProductPage */}
            <Outlet context={{ selectedCommerce, refreshCommerce, commerceId }} />
        </div>
    );
};
