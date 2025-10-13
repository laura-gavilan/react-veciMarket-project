import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";

export const CreateProductPage = () => {
    const { commerceId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "all",
        releaseDate: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            alert("No se pudo crear el producto");
        }
    };

    return (
        <div className="flex justify-center mt-12">
            <div className="card-form max-w-3xl w-full p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <button onClick={() => navigate(-1)} className="btn-secondary self-start">
                    ← Volver
                </button>

                
                    <h1 className="text-h3 font-semibold text-[var(--color-burdeos-dark)] mb-8 text-center">
                        Crear Nuevo Producto
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Nombre */}
                        <div className="flex flex-col">
                            <label>Nombre del producto</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Ej. Pan integral"
                                className="input-field border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Descripción */}
                        <div className="flex flex-col">
                            <label>Descripción</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe el producto..."
                                className="input-field border border-gray-300 rounded-md"
                                rows={4}
                                required
                            />
                        </div>

                        {/* Precio */}
                        <div className="flex flex-col">
                            <label>Precio (€)</label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Ej. 2.50"
                                className="input-field border border-gray-300 rounded-md"
                                step={0.01}
                                min={0}
                                required
                            />
                        </div>

                        {/* Fecha de lanzamiento */}
                        <div className="flex flex-col">
                            <label>Fecha de lanzamiento</label>
                            <input
                                type="date"
                                name="releaseDate"
                                value={form.releaseDate}
                                onChange={handleChange}
                                className="input-field border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Categoría */}
                        <div className="flex flex-col">
                            <label>Categoría</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="input-field border border-gray-300 rounded-md"
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

                        <button
                            type="submit"
                            className="btn-primary mt-4 bg-[var(--color-burdeos-dark)] text-white py-3 rounded-lg"
                        >
                            Crear Producto
                        </button>
                    </form>
                </div>
            </div>
    );
};

