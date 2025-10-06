import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../core/http/axios";
import { getTokenFromLocalStorage } from "../core/auth/auth.service";

export const EditProductPage = () => {
    const { productId } = useParams();
    const { selectedCommerce, refreshCommerce } = useOutletContext();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "", description: "", price: 0 });

    useEffect(() => {
        const product = selectedCommerce?.products.find((p) => p._id === productId);
        if (product) {
            setForm({
                name: product.name,
                description: product.description,
                price: product.price,
            });
        }
    }, [selectedCommerce, productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/products/${productId}`, form, {
                headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
            });

            await refreshCommerce();
            navigate(-1);
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100 flex items-center justify-center p-6">
            <div className="bg-white/90 backdrop-blur-md border border-violet-100 shadow-xl rounded-3xl p-10 w-full max-w-lg transition-all duration-300 hover:shadow-violet-200">
                <h1 className="text-3xl font-bold text-violet-800 mb-8 text-center">
                    Editar Producto
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-semibold text-violet-700 mb-2">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej. Camiseta deportiva"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-semibold text-violet-700 mb-2">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe el producto..."
                            rows="4"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 outline-none transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-sm font-semibold text-violet-700 mb-2">
                            Precio (€)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Ej. 19.99"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 outline-none transition-all"
                            min={0}
                            step={0.01}
                            required
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-violet-700 hover:bg-violet-800 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all duration-300"
                        >
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-xl shadow-md transition-all duration-300"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};