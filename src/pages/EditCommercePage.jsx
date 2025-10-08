import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useCommerce } from "../core/commerce/CommerceContext";
import { api } from "../core/http/axios";

export const EditCommercePage = () => {
    const { updateCommerce } = useCommerce();;
    const { commerceId } = useParams();
    const navigate = useNavigate();
    const { selectedCommerce } = useOutletContext();

    const [form, setForm] = useState({
        name: "",
        category: "all",
        description: "",
        address: { street: "", city: "", phone: "", email: "", schedule: "" },
    });

    useEffect(() => {
        if (selectedCommerce)
            setForm({
                name: selectedCommerce.name || "",
                category: selectedCommerce.category || "all",
                description: selectedCommerce.description || "",
                address: selectedCommerce.address || {
                    street: "",
                    city: "",
                    phone: "",
                    email: "",
                    schedule: "",
                },
            });
    }, [selectedCommerce]);

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
            updateCommerce(data);
            navigate(-1);
        } catch (error) {
            console.error("Error actualizando comercio:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
            <h1 className="text-3xl md:text-4xl font-bold text-violet-900 mb-8 text-center">
                Editar Comercio
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-violet-700 mb-2">Categoría</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none shadow-sm transition-all"
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
                    <label className="text-sm font-medium text-violet-700 mb-2">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nombre del comercio"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none shadow-sm transition-all"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-violet-700 mb-2">Descripción</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Descripción breve del comercio"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none shadow-sm transition-all resize-none"
                        rows={4}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-violet-700 mb-2">Calle</label>
                        <input
                            type="text"
                            name="street"
                            value={form.address.street}
                            onChange={handleChange}
                            placeholder="Calle"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none shadow-sm transition-all"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-violet-700 mb-2">Ciudad</label>
                        <input
                            type="text"
                            name="city"
                            value={form.address.city}
                            onChange={handleChange}
                            placeholder="Ciudad"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none shadow-sm transition-all"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-violet-700 mb-2">Teléfono</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.address.phone}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none shadow-sm transition-all"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-violet-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.address.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none shadow-sm transition-all"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-violet-700 mb-2">Horario</label>
                    <input
                        type="text"
                        name="schedule"
                        value={form.address.schedule}
                        onChange={handleChange}
                        placeholder="Horario de apertura"
                        className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none shadow-sm transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform font-semibold"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};