import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { CommerceContext } from "../contexts/CommerceContext";
import { getTokenFromLocalStorage } from "../core/auth/auth.service";
import { api } from "../core/http/axios";

export const EditCommercePage = () => {
    const { commerces, fetchCommerces } = useContext(CommerceContext);
    const { commerceId } = useParams();
    const navigate = useNavigate();
    const { selectedCommerce } = useOutletContext(); // traemos comercio desde AdminDetailPage

    const [form, setForm] = useState({
        name: "",
        description: "",
        address: { street: "", city: "", phone: "", email: "", schedule: "" },
    });

    useEffect(() => {
        if (selectedCommerce) setForm({
            name: selectedCommerce.name,
            description: selectedCommerce.description,
            address: selectedCommerce.address || { street: "", city: "", phone: "", email: "", schedule: "" },
        });
    }, [selectedCommerce]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in form.address) {
            setForm(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/commerces/${commerceId}`, form, {
                headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
            });
            await fetchCommerces();; // actualiza contexto
            navigate(-1); // volver atrás
        } catch (error) {
            console.error("Error actualizando comercio:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Comercio</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="input input-bordered"
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Descripción"
                    className="input input-bordered"
                />
                <input type="text" name="street" value={form.address.street} onChange={handleChange} placeholder="Calle" className="input input-bordered" />
                <input type="text" name="city" value={form.address.city} onChange={handleChange} placeholder="Ciudad" className="input input-bordered" />
                <input type="text" name="phone" value={form.address.phone} onChange={handleChange} placeholder="Teléfono" className="input input-bordered" />
                <input type="email" name="email" value={form.address.email} onChange={handleChange} placeholder="Email" className="input input-bordered" />
                <input type="text" name="schedule" value={form.address.schedule} onChange={handleChange} placeholder="Horario" className="input input-bordered" />
                <button type="submit" className="btn btn-primary mt-2">Guardar</button>
            </form>
        </div>
    );
};