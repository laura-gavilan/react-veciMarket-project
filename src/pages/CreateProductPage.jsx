import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../core/http/axios";
import { getTokenFromLocalStorage } from "../core/auth/auth.service";
import { AuthContext } from "../contexts/AuthContext";

export const CreateProductPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { commerceId } = useParams();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        releaseDate: "",
        category: "all",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) return alert("Debes iniciar sesión para crear un producto");

        try {
            const token = getTokenFromLocalStorage();
            const payload = {
                ...form,
                price: parseFloat(form.price),
                releaseDate: new Date(form.releaseDate).toISOString(),
                category: [form.category],
                commerceId,
            };

            await api.post("/products", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error creando producto:", error);
            alert("Error al crear el producto. Intenta nuevamente.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-violet-900">
                Crear Nuevo Producto
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition resize-none"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={form.price}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                    required
                />
                <input
                    type="date"
                    name="releaseDate"
                    placeholder="Fecha de lanzamiento"
                    value={form.releaseDate}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                    required
                />
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
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
                    className="bg-violet-900 text-white px-6 py-3 rounded-lg hover:bg-violet-800 transition-colors font-semibold mt-2"
                >
                    Crear Producto
                </button>
            </form>
        </div>
    );
};