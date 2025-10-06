import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";
import { getTokenFromLocalStorage } from "../core/auth/auth.service";
import { AuthContext } from "../contexts/AuthContext";
import { useCommerce } from "../contexts/CommerceContext";

export const CreateCommercePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { addCommerce } = useCommerce();

    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        address: {
            street: "",
            city: "",
            phone: "",
            email: "",
            schedule: "",
        },
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name.includes("address.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Debes iniciar sesión para crear un comercio");

        try {
            const token = getTokenFromLocalStorage();
            const payload = { ...form, ownerUserId: user.id };

            const { data } = await api.post("/commerces", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            addCommerce({ ...data, ownerUserId: { id: user.id, name: user.name } });
            navigate("/admin");
        } catch (error) {
            console.error("Error creando comercio:", error);
            alert("Error al crear el comercio. Intenta nuevamente.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100 flex items-center justify-center p-6">
            <div className="bg-white/90 backdrop-blur-md border border-violet-200 shadow-xl rounded-3xl p-10 w-full max-w-2xl transition-all duration-300 hover:shadow-violet-300">
                <h1 className="text-3xl font-bold text-violet-800 mb-8 text-center">
                    Crear Nuevo Comercio
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Nombre y Slug */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={form.name}
                            onChange={handleChange}
                            className="flex-1 border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                            required
                        />
                        <input
                            type="text"
                            name="slug"
                            placeholder="Slug"
                            value={form.slug}
                            onChange={handleChange}
                            className="flex-1 border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition resize-none"
                        required
                    />

                    {/* Dirección */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="address.street"
                            placeholder="Calle"
                            value={form.address.street}
                            onChange={handleChange}
                            className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                            required
                        />
                        <input
                            type="text"
                            name="address.city"
                            placeholder="Ciudad"
                            value={form.address.city}
                            onChange={handleChange}
                            className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                            required
                        />
                        <input
                            type="text"
                            name="address.phone"
                            placeholder="Teléfono"
                            value={form.address.phone}
                            onChange={handleChange}
                            className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                        />
                        <input
                            type="email"
                            name="address.email"
                            placeholder="Email"
                            value={form.address.email}
                            onChange={handleChange}
                            className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                        />
                        <input
                            type="text"
                            name="address.schedule"
                            placeholder="Horario"
                            value={form.address.schedule}
                            onChange={handleChange}
                            className="col-span-1 sm:col-span-2 border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
                    >
                        Crear Comercio
                    </button>
                </form>
            </div>
        </div>
    );
};