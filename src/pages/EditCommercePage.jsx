import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";

export const EditCommercePage = () => {
    const { commerceId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        category: "all",
        description: "",
        address: { street: "", city: "", phone: "", email: "", schedule: "" },
    });

    useEffect(() => {
        const fetchCommerce = async () => {
            try {
                const { data } = await api.get(`/commerces/${commerceId}`);
                setForm({
                    name: data.name || "",
                    category: data.category || "all",
                    description: data.description || "",
                    address: data.address || { street: "", city: "", phone: "", email: "", schedule: "" },
                });
            } catch (error) {
                console.error("Error al cargar el comercio:", error);
            }
        };
        fetchCommerce();
    }, [commerceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in form.address) {
            setForm((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/commerces/${commerceId}`, form);
            alert("Comercio actualizado correctamente");
            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error actualizando comercio:", error);
            alert("No se pudo actualizar el comercio");
        }
    };

    return (
        <div className="min-h-screen flex justify-center px-6 py-12 bg-[var(--color-gray-warm)]">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)] p-8 flex flex-col gap-8">
                <button
                    onClick={() => navigate(-1)}
                    className="self-start px-6 py-2 bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] rounded-full shadow-md hover:bg-[var(--color-burdeos-light)] hover:scale-105 transition-all font-semibold"
                >
                    ← Volver
                </button>

                <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-burdeos-dark)] text-center">
                    Editar Comercio
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Categoría */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-1">Categoría</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
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

                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-1">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nombre del comercio"
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-1">Descripción</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Descripción breve del comercio"
                            rows={4}
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col">
                            <label className="font-semibold text-[var(--color-burdeos-dark)] mb-1">Calle</label>
                            <input
                                type="text"
                                name="street"
                                value={form.address.street}
                                onChange={handleChange}
                                placeholder="Calle"
                                className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold text-[var(--color-burdeos-dark)] mb-1">Ciudad</label>
                            <input
                                type="text"
                                name="city"
                                value={form.address.city}
                                onChange={handleChange}
                                placeholder="Ciudad"
                                className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-1">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.address.phone}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.address.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-1">Horario</label>
                        <input
                            type="text"
                            name="schedule"
                            value={form.address.schedule}
                            onChange={handleChange}
                            placeholder="Horario de apertura"
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] py-3 rounded-2xl font-semibold shadow-md hover:bg-[var(--color-burdeos-light)] hover:scale-105 transition-all"
                    >
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
};
