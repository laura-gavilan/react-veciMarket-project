import { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../core/http/axios";
import { getTokenFromLocalStorage } from "../core/auth/auth.service";
import { AuthContext } from "../contexts/AuthContext";
import { useCommerce } from "../contexts/CommerceContext";

export const CreateProductPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { selectedCommerce, refreshProducts } = useOutletContext();
    const { updateCommerce } = useCommerce();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        releaseDate: "",
        category: "all",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Debes iniciar sesión para crear un producto");

        try {
            const token = getTokenFromLocalStorage();
            const payload = {
                ...form,
                price: parseFloat(form.price),
                releaseDate: new Date(form.releaseDate).toISOString(),
                category: [form.category],
                commerceId: selectedCommerce._id,
            };

            await api.post("/products", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const { data: updatedCommerce } = await api.get(`/commerces/${selectedCommerce._id}`);
            refreshProducts();
            updateCommerce(updatedCommerce);
            navigate(`/admin/commerce/${selectedCommerce._id}`);
        } catch (error) {
            console.error("Error creando producto:", error);
            alert("Error al crear el producto. Intenta nuevamente.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
            <h1 className="text-3xl font-extrabold text-center text-violet-900 mb-6">
                Crear Nuevo Producto
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del producto"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Descripción del producto"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition resize-none"
                    rows={4}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                    required
                />

                <input
                    type="date"
                    name="releaseDate"
                    placeholder="Fecha de lanzamiento"
                    value={form.releaseDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                    required
                />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                    required
                >
                    <option value="all">All</option>
                    <option value="food">Food</option>
                    <option value="books-paper">Books & Paper</option>
                    <option value="health-beauty">Health & Beauty</option>
                    <option value="sports">Sports</option>
                    <option value="pets">Pets</option>
                    <option value="home">Home</option>
                    <option value="other">Other</option>
                </select>

                <button
                    type="submit"
                    className="w-full py-3 bg-violet-700 text-white font-semibold rounded-full shadow-md hover:bg-violet-800 transition-colors mt-2"
                >
                    Crear Producto
                </button>
            </form>
        </div>
    );
};