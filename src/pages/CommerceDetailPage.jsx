import { useContext, useEffect, useState } from "react";
import { useParams, Outlet, useNavigate, Link } from "react-router-dom";
import { CommerceContext } from "../core/commerce/CommerceContext";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../core/http/axios";

export const CommerceDetailPage = () => {
    const { commerces, updateCommerce } = useContext(CommerceContext);
    const { user } = useContext(AuthContext);
    const { commerceId } = useParams();
    const [selectedCommerce, setSelectedCommerce] = useState(null);
    const navigate = useNavigate();

    const refreshCommerce = async () => {
        try {
            const { data } = await api.get(`/commerces/${commerceId}`);
            setSelectedCommerce(data);
            updateCommerce(data);
        } catch (error) {
            console.error("Error cargando el comercio:", error);
        }
    };

    useEffect(() => {
        const commerce = commerces?.find((commerce) => commerce._id === commerceId);
        if (commerce) setSelectedCommerce(commerce);
        else refreshCommerce();
    }, [commerces, commerceId]);

    if (!selectedCommerce) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-500">
                <h1 className="text-2xl font-semibold animate-pulse">
                    Cargando comercio...
                </h1>
            </div>
        );
    }

    const isOwner = user && selectedCommerce.owner?._id === user._id;

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-12 px-6 flex flex-col gap-12">
            <button
                onClick={() => navigate(-1)}
                className="self-start px-6 py-2 bg-gradient-to-r from-violet-700 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all font-semibold"
            >
                ← Volver
            </button>

            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-10 border border-violet-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex-1 flex flex-col gap-6">
                    {/* <img
                        src={selectedCommerce.image}
                        alt={selectedCommerce.name}
                        className="w-full h-64 md:h-80 object-cover rounded-2xl border border-violet-200 shadow-md hover:scale-105 transition-transform duration-300"
                    /> */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-violet-900">
                        {selectedCommerce.name}
                    </h1>
                    <p className="text-gray-700 text-lg">{selectedCommerce.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3 text-gray-600 mt-6 text-sm md:text-base">
                        <p><span className="font-semibold text-violet-800">Calle:</span> {selectedCommerce.address.street}</p>
                        <p><span className="font-semibold text-violet-800">Ciudad:</span> {selectedCommerce.address.city}</p>
                        <p><span className="font-semibold text-violet-800">Teléfono:</span> {selectedCommerce.address.phone}</p>
                        <p><span className="font-semibold text-violet-800">Email:</span> {selectedCommerce.address.email}</p>
                        <p className="sm:col-span-2"><span className="font-semibold text-violet-800">Horario:</span> {selectedCommerce.address.schedule}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-violet-100">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-violet-900">Productos</h2>
                    {isOwner && (
                        <Link
                            to="create"
                            className="px-6 py-2 bg-gradient-to-r from-violet-700 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all font-semibold"
                        >
                            + Nuevo producto
                        </Link>
                    )}
                </div>

                {selectedCommerce.products?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {selectedCommerce.products.map((product) => (
                            <div
                                key={product._id}
                                className="bg-gradient-to-tr from-white to-violet-50 rounded-2xl shadow-md border border-violet-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all flex flex-col cursor-pointer"
                            >
                                {product.images?.[0] && (
                                    <img
                                        src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                                        alt={product.name}
                                        className="w-30 h-30 object-cover rounded-lg border"
                                    />
                                )}
                                <div className="p-5 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                                        <p className="text-violet-700 font-bold mt-2">{product.price.toFixed(2)} €</p>
                                    </div>

                                    {isOwner && (
                                        <div className="flex gap-3 mt-4">
                                            <Link
                                                to={`edit/${product._id}`}
                                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-center font-medium transition-all shadow-sm hover:shadow-md"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={async () => {
                                                    if (!confirm("¿Eliminar producto?")) return;
                                                    await api.delete(`/products/${product._id}`);
                                                    refreshCommerce();
                                                }}
                                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-6">No hay productos disponibles por el momento.</p>
                )}
            </div>

            <Outlet context={{ selectedCommerce, refreshCommerce, commerceId }} />
        </div>
    );
};