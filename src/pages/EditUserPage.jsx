import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from './../core/user/useUser';

export const EditUserPage = () => {
    const { user, updateUserData, loading } = useUser();
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

    if (loading)
        return <p className="text-center mt-10 text-[var(--color-burdeos-dark)] font-sans text-lg">Cargando usuario...</p>;
    if (!user)
        return <p className="text-center mt-10 text-[var(--color-burdeos-dark)] font-sans text-lg">No hay usuario logueado.</p>;

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateUserData(form);
        navigate("/user");
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)]">
            <button
                type="button"
                onClick={() => navigate("/user")}
                className="btn-secondary mb-6"
            >
                ← Volver
            </button>

            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-[var(--color-burdeos-dark)] text-center">
                Editar Perfil de {user.name}
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[var(--color-burdeos-darker)] font-sans">
                {[
                    { label: "Nombre de usuario", name: "username", type: "text" },
                    { label: "Nombre", name: "name", type: "text" },
                    { label: "Primer Apellido", name: "firstName", type: "text" },
                    { label: "Segundo Apellido", name: "lastName", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Teléfono", name: "phoneNumber", type: "text" },
                    { label: "Dirección", name: "address", type: "text", fullWidth: true }
                ].map((field) => (
                    <div key={field.name} className={field.fullWidth ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
                        <label className="mb-2 font-semibold text-[var(--color-burdeos-dark)]">{field.label}:</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                        />
                    </div>
                ))}

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                    <button type="submit" className="btn-primary flex-1 w-full">Guardar Cambios</button>
                </div>
            </form>
        </div>
    );
};




