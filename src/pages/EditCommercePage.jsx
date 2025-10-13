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

    // Cargar datos del comercio
    useEffect(() => {
        const fetchCommerce = async () => {
            try {
                const { data } = await api.get(`/commerces/${commerceId}`);
                setForm({
                    name: data.name || "",
                    category: data.category || "all",
                    description: data.description || "",
                    address: data.address || {
                        street: "",
                        city: "",
                        phone: "",
                        email: "",
                        schedule: "",
                    },
                });
            } catch (error) {
                console.error("Error al cargar el comercio:", error);
            }
        };
        fetchCommerce();
    }, [commerceId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name in form.address) {
            setForm((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await api.patch(`/commerces/${commerceId}`, form);
            alert("Comercio actualizado correctamente");
            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error actualizando comercio:", error);
            alert("No se pudo actualizar el comercio");
        }
    };

    return (
        <div className="flex justify-center mt-12">
            <div className="card-form max-w-3xl w-full p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <button onClick={() => navigate(-1)} className="btn-secondary self-start">
                    ← Volver
                </button>
                
                <h1 className="text-h2 font-semibold text-[var(--color-burdeos-dark)] mb-6 text-center">
                    Editar Comercio
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Categoría */}
                    <div className="flex flex-col">
                        <label className="form-label">Categoría</label>
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

                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nombre del comercio"
                            className="input-field border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col">
                        <label className="form-label">Descripción</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Descripción breve del comercio"
                            className="input-field border border-gray-300 rounded-md"
                            rows={4}
                            required
                        />
                    </div>

                    {/* Dirección */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col">
                            <label className="form-label">Calle</label>
                            <input
                                type="text"
                                name="street"
                                value={form.address.street}
                                onChange={handleChange}
                                placeholder="Calle"
                                className="input-field border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="form-label">Ciudad</label>
                            <input
                                type="text"
                                name="city"
                                value={form.address.city}
                                onChange={handleChange}
                                placeholder="Ciudad"
                                className="input-field border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="form-label">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.address.phone}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            className="input-field border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.address.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                            className="input-field border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="form-label">Horario</label>
                        <input
                            type="text"
                            name="schedule"
                            value={form.address.schedule}
                            onChange={handleChange}
                            placeholder="Horario de apertura"
                            className="input-field border border-gray-300 rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-save mt-4 bg-[var(--color-burdeos-dark)] text-white py-3 rounded-lg"
                    >
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
};