import { useNavigate } from 'react-router-dom';
import { useAuth } from '../core/auth/useAuth';

import { useCommerce } from './../core/commerce/CommerceContext';
import { useState } from 'react';


export const CreateCommercePage = () => {
    const { addCommerce } = useCommerce();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    const showToast = (message, duration = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    };


    const [form, setForm] = useState({
        name: "",
        description: "",
        image: "",
        address: {
            street: "",
            city: "",
            phone: "",
            email: "",
            schedule: "",
        },
        isActive: true,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newCommerce = {
                ...form,
                ownerUserId: user?._id,
            };

            await addCommerce(newCommerce);
            navigate("/commerce");
        } catch (error) {
            console.error("Error al crear comercio:", error);
            showToast("No se pudo crear el comercio. Revisa los datos.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-warm p-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-primary-light p-10 flex flex-col gap-8">
                <h1 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-6">
                    Crear Comercio
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label className="font-semibold text-primary mb-2">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-primary-dark mb-2">Descripción</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            className="w-full border rounded p-2 h-24"
                        />
                    </div>


                    <div>
                        <label className="font-semibold text-primary-dark mb-2">URL de Imagen</label>
                        <input
                            type="text"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="/images/commerces/shoes.jpg"
                            className="w-full border rounded p-2"
                        />
                    </div>


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

                    <button
                        type="submit"
                        className="px-4 py-2 bg-accent-primary text-primary-dark rounded-2xl font-semibold shadow-md hover:bg-primary-light hover:text-accent transition-all"
                    >
                        Crear Comercio
                    </button>
                </form>
            </div>

            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </div>


    );
};




