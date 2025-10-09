import { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../core/http/axios";
import { AuthContext } from "../contexts/AuthContext";
import { useCommerce } from "../core/commerce/CommerceContext";

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) return alert("Debes iniciar sesión para crear un producto");

        try {
            const payload = {
                ...form,
                price: parseFloat(form.price),
                releaseDate: new Date(form.releaseDate).toISOString(),
                category: [form.category],
                commerceId: selectedCommerce._id,
            };

            await api.post("/products", payload);

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
        <div className="min-h-screen bg-general flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-10 max-w-lg w-full shadow-lg elevation">
                <h1 className="text-h3 font-title font-semibold text-[var(--color-burdeos-dark)] mb-8 text-center">
                    Crear Nuevo Producto
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ej. Pan integral"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-5 py-3 rounded-3xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            placeholder="Describe el producto..."
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-5 py-3 rounded-3xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] outline-none transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Precio */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Precio (€)
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Ej. 2.50"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full px-5 py-3 rounded-3xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] outline-none transition-all"
                            min={0}
                            step={0.01}
                            required
                        />
                    </div>

                    {/* Fecha de lanzamiento */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Fecha de lanzamiento
                        </label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={form.releaseDate}
                            onChange={handleChange}
                            className="w-full px-5 py-3 rounded-3xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Categoría */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Categoría
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full px-5 py-3 rounded-3xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] outline-none transition-all"
                            required
                        >
                            <option value="all">Todas</option>
                            <option value="food">Alimentación</option>
                            <option value="books-paper">Libros & Papelería</option>
                            <option value="health-beauty">Salud & Belleza</option>
                            <option value="sports">Deportes</option>
                            <option value="pets">Animales</option>
                            <option value="home">Hogar</option>
                            <option value="other">Otras</option>
                        </select>
                    </div>

                    {/* Botón Crear */}
                    <button type="submit" className="btn-primary mt-4">
                        Crear Producto
                    </button>
                </form>
            </div>
        </div>
    );
};
