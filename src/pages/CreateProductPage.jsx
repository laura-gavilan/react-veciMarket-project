import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";

export const CreateProductPage = () => {
    const { commerceId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: ["all"],
        releaseDate: "",
        images: [],
    });

    const [errors, setErrors] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "category") {
            setForm((prev) => ({ ...prev, category: [value] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(null);

        try {
            const payload = {
                ...form,
                price: parseFloat(form.price),
                releaseDate: new Date(form.releaseDate).toISOString(),
                commerceId,
            };

            await api.post("/products", payload);
            alert("Producto creado correctamente");
            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error creando producto:", error);

            if (error.response?.data?.invalidFields) {
                setErrors(error.response.data.invalidFields);
            } else {
                setErrors([{ message: "No se pudo crear el producto" }]);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-warm p-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-primary-light p-10 flex flex-col gap-5">
                <button
                    onClick={() => navigate(-1)}
                    className="self-start px-6 py-2 bg-primary-dark text-accent rounded-full shadow-md hover:bg-primary-light hover:scale-105 transition-all font-semibold"
                >
                    ← Volver
                </button>

                <h1 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-5">
                    Crear Nuevo Producto
                </h1>

                {errors && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                        {errors.map((error, index) => (
                            <p key={index}>{error.message}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label className="font-semibold text-primary-dark mb-2">Nombre del producto</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej. Pan integral"
                            className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-dark transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-primary-dark mb-2">Descripción</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe el producto..."
                            rows={4}
                            className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-dark transition resize-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-primary-dark mb-2">Precio (€)</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Ej. 2.50"
                            step={0.01}
                            min={0}
                            className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-primary-darkmb-2">Fecha de lanzamiento</label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={form.releaseDate}
                            onChange={handleChange}
                            className="px-4 py-2 border border-primary-lightrounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-primary-dark mb-2">Categoría</label>
                        <select
                            name="category"
                            value={form.category[0]}
                            onChange={handleChange}
                            className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                            required
                        >
                            <option value="all">Todas</option>
                            <option value="food">Alimentación</option>
                            <option value="books-paper">Libros & Papelería</option>
                            <option value="health-beauty">Salud & Belleza</option>
                            <option value="sports">Deportes</option>
                            <option value="pets">Animales</option>
                            <option value="home">Hogar</option>
                            <option value="clothing">Ropa</option>
                            <option value="footwear">Calzado</option>
                            <option value="other">Otras</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-primary-dark text-accent py-3 rounded-2xl font-semibold shadow-md hover:bg-primary-light hover:scale-105 transition-all"
                    >
                        Crear Producto
                    </button>
                </form>
            </div>
        </div >
    );
};
