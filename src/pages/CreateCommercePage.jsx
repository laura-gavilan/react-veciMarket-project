import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";
import { AuthContext } from "../contexts/AuthContext";
import { useCommerce } from "../core/commerce/CommerceContext";

export const CreateCommercePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { addCommerce } = useCommerce();

    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        address: { street: "", city: "", phone: "", email: "", schedule: "" },
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name.includes("address.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) return alert("Debes iniciar sesión para crear un comercio");

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("slug", form.slug);
            formData.append("description", form.description);
            formData.append("ownerUserId", user.id);

            Object.entries(form.address).forEach(([key, value]) => {
                formData.append(`address[${key}]`, value);
            });

            if (imageFile) formData.append("image", imageFile);

            const { data } = await api.post("/commerces", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            addCommerce({ ...data, ownerUserId: { id: user.id, name: user.name } });
            navigate("/admin");
        } catch (error) {
            console.error("Error creando comercio:", error);
            alert("Error al crear el comercio. Intenta nuevamente.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-gray-warm)] p-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)] p-10 flex flex-col gap-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-burdeos-dark)] text-center mb-6">
                    Crear Nuevo Comercio
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={form.name}
                            onChange={handleChange}
                            className="flex-1 px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                            required
                        />
                        <input
                            type="text"
                            name="slug"
                            placeholder="Slug"
                            value={form.slug}
                            onChange={handleChange}
                            className="flex-1 px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                            required
                        />
                    </div>

                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition resize-none"
                        required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="address.street"
                            placeholder="Calle"
                            value={form.address.street}
                            onChange={handleChange}
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                            required
                        />
                        <input
                            type="text"
                            name="address.city"
                            placeholder="Ciudad"
                            value={form.address.city}
                            onChange={handleChange}
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                            required
                        />
                        <input
                            type="text"
                            name="address.phone"
                            placeholder="Teléfono"
                            value={form.address.phone}
                            onChange={handleChange}
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                        />
                        <input
                            type="email"
                            name="address.email"
                            placeholder="Email"
                            value={form.address.email}
                            onChange={handleChange}
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                        />
                        <input
                            type="text"
                            name="address.schedule"
                            placeholder="Horario"
                            value={form.address.schedule}
                            onChange={handleChange}
                            className="col-span-1 sm:col-span-2 px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-2">Imagen del Comercio</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="px-3 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-40 h-40 object-cover rounded-xl border border-[var(--color-burdeos-light)]"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] py-3 rounded-2xl font-semibold shadow-md hover:bg-[var(--color-burdeos-light)] hover:scale-105 transition-all"
                    >
                        Crear Comercio
                    </button>
                </form>
            </div>
        </div>
    );
};
