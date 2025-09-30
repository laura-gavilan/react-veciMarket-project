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
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-violet-900">
                Crear Nuevo Comercio
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition resize-none"
                />
                <input
                    type="text"
                    name="address.street"
                    placeholder="Calle"
                    value={form.address.street}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                <input
                    type="text"
                    name="address.city"
                    placeholder="Ciudad"
                    value={form.address.city}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                <input
                    type="text"
                    name="address.phone"
                    placeholder="Teléfono"
                    value={form.address.phone}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                <input
                    type="email"
                    name="address.email"
                    placeholder="Email"
                    value={form.address.email}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                <input
                    type="text"
                    name="address.schedule"
                    placeholder="Horario"
                    value={form.address.schedule}
                    onChange={handleChange}
                    className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                <button
                    type="submit"
                    className="bg-violet-900 text-white px-6 py-3 rounded-lg hover:bg-violet-800 transition-colors font-semibold mt-2"
                >
                    Crear Comercio
                </button>
            </form>
        </div>
    );
};