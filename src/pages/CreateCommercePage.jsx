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
        address: {
            street: "",
            city: "",
            phone: "",
            email: "",
            schedule: "",
        },
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

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

            formData.append("address[street]", form.address.street);
            formData.append("address[city]", form.address.city);
            formData.append("address[phone]", form.address.phone);
            formData.append("address[email]", form.address.email);
            formData.append("address[schedule]", form.address.schedule);

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
        <div className="min-h-screen bg-general flex items-center justify-center p-6">
            <div className="bg-white border border-[var(--color-burdeos-dark)] shadow-lg rounded-3xl p-10 w-full max-w-2xl elevation">
                <h1 className="font-title text-h1/[125%] text-[var(--color-burdeos-dark)] font-semibold mb-8 text-center">
                    Crear Nuevo Comercio
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={form.name}
                            onChange={handleChange}
                            className="flex-1 border border-gray-300 p-3 rounded-xl shadow-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                            required
                        />
                        <input
                            type="text"
                            name="slug"
                            placeholder="Slug"
                            value={form.slug}
                            onChange={handleChange}
                            className="flex-1 border border-gray-300 p-3 rounded-xl shadow-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                            required
                        />
                    </div>

                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        className="border border-gray-300 p-3 rounded-xl shadow-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition resize-none"
                        required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="address.street"
                            placeholder="Calle"
                            value={form.address.street}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 rounded-xl shadow-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                            required
                        />
                        <input
                            type="text"
                            name="address.city"
                            placeholder="Ciudad"
                            value={form.address.city}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 rounded-xl shadow-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                            required
                        />
                        <input
                            type="text"
                            name="address.phone"
                            placeholder="Teléfono"
                            value={form.address.phone}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 rounded-xl shadow-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                        />
                        <input
                            type="email"
                            name="address.email"
                            placeholder="Email"
                            value={form.address.email}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 rounded-xl shadow-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                        />
                        <input
                            type="text"
                            name="address.schedule"
                            placeholder="Horario"
                            value={form.address.schedule}
                            onChange={handleChange}
                            className="col-span-1 sm:col-span-2 border border-gray-300 p-3 rounded-xl shadow-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                        />
                    </div>

                    <div>
                        <label className="block font-sans text-[var(--color-burdeos-dark)] font-medium mb-2">
                            Imagen del Comercio
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="border border-gray-300 p-2 rounded-xl shadow-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-40 h-40 object-cover rounded-lg border border-gray-300"
                            />
                        )}
                    </div>

                    <button type="submit" className="btn-primary mt-4 w-full">
                        Crear Comercio
                    </button>
                </form>
            </div>
        </div>
    );
};
