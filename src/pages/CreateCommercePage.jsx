import { useNavigate } from 'react-router-dom';
import { useAuth } from '../core/auth/useAuth';

import { useCommerce } from './../core/commerce/CommerceContext';
import { useState } from 'react';


export const CreateCommercePage = () => {
    const { addCommerce } = useCommerce();
    const { user } = useAuth(); // Usuario logueado
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        // image: "",
        address: {
            street: "",
            city: "",
            phone: "",
            email: "",
            schedule: "",
        },
        isActive: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("address.")) {
            const addressField = name.split(".")[1];
            setForm({
                ...form,
                address: { ...form.address, [addressField]: value },
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newCommerce = {
                ...form,
                ownerUserId: user?._id, // vincula el comercio al usuario logueado
            };

            await addCommerce(newCommerce);
            navigate("/commerce"); // redirige a la lista general
        } catch (error) {
            console.error("Error al crear comercio:", error);
            alert("No se pudo crear el comercio. Revisa los datos.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-gray-warm)] p-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)] p-10 flex flex-col gap-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-burdeos-dark)] text-center mb-6">Crear Comercio</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-2">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-2">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={form.slug}
                            onChange={handleChange}
                            placeholder="ej: calzado, moda, comida..."
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-2">Descripción</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2 h-24"
                        />
                    </div>

                    {/* Imagen */}
                    {/* <div>
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-2">URL de Imagen</label>
                        <input
                            type="text"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="/images/commerces/shoes.jpg"
                            className="w-full border rounded p-2"
                        />
                    </div> */}

                    {/* Dirección */}
                    <fieldset className="border p-3 rounded">
                        <legend className="font-semibold">Dirección</legend>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="address.street"
                                placeholder="Calle"
                                value={form.address.street}
                                onChange={handleChange}
                                className="border rounded p-2"
                            />
                            <input
                                type="text"
                                name="address.city"
                                placeholder="Ciudad"
                                value={form.address.city}
                                onChange={handleChange}
                                className="border rounded p-2"
                            />
                            <input
                                type="text"
                                name="address.phone"
                                placeholder="Teléfono"
                                value={form.address.phone}
                                onChange={handleChange}
                                className="border rounded p-2"
                            />
                            <input
                                type="email"
                                name="address.email"
                                placeholder="Email"
                                value={form.address.email}
                                onChange={handleChange}
                                className="border rounded p-2"
                            />
                            <input
                                type="text"
                                name="address.schedule"
                                placeholder="Horario"
                                value={form.address.schedule}
                                onChange={handleChange}
                                className="col-span-2 border rounded p-2"
                            />
                        </div>
                    </fieldset>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="flex-1 bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] py-3 rounded-2xl font-semibold shadow-md hover:bg-[var(--color-burdeos-light)] hover:scale-105 transition-all">
                        Crear Comercio
                    </button>
                </form>
            </div>
        </div>
    );
};




