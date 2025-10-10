import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from './../core/user/useUser';

export const EditUserPage = () => {
    const { user, updateUserData } = useUser();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: user?.username || "",
        name: user?.name || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        address: user?.address || "",
    });

    if (!user) return <p className="text-center mt-8">No hay usuario logueado.</p>;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserData(form);
        navigate("/user");
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-general rounded-xl shadow-md elevation">
            <button
                type="button"
                onClick={() => navigate("/user")}
                className="btn-secondary"
            >
                Volver
            </button>
            <h1 className="mb-6 mt-6">Editar Perfil de {user.name}</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { label: "Nombre de usuario", name: "username", type: "text" },
                    { label: "Nombre", name: "name", type: "text" },
                    { label: "Primer Apellido", name: "firstName", type: "text" },
                    { label: "Segundo Apellido", name: "lastName", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Teléfono", name: "phoneNumber", type: "text" },
                    { label: "Dirección", name: "address", type: "text" }
                ].map((field) => (
                    <div key={field.name} className="flex flex-col">
                        <label className="mb-1 font-semibold">{field.label}:</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mostaza"
                        />
                    </div>
                ))}

                <div className="flex gap-4 mt-4">
                    <button type="submit" className="btn-primary">Guardar Cambios</button>

                </div>
            </form>
        </div>
    );
};



