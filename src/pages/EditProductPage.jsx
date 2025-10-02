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
        const product = selectedCommerce?.products.find(p => p._id === productId);
        if (product) {
            setForm({
                name: product.name,
                description: product.description,
                price: product.price,
            });
        }
    }, [selectedCommerce, productId]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await api.patch(`/products/${productId}`, form, {
                headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
            });

            await refreshCommerce(); // 🔹 recarga productos actualizados
            navigate(-1);            // vuelve atrás
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-violet-900">Editar Producto</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Descripción"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    min={0}
                    step={0.01}
                    required
                />
                <div className="flex gap-2 mt-2">
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-800 transition-colors"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};
