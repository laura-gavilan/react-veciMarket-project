import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from './../core/user/useUser';
import { EditUserForm } from "../components/EditUserForm";

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
        return <p className="text-center mt-10 text-primary-dark font-sans text-lg">Cargando usuario...</p>;
    if (!user)
        return <p className="text-center mt-10 text-primary-dark  font-sans text-lg">No hay usuario logueado.</p>;



    const handleSubmit = async () => {
        await updateUserData(form);
        navigate("/user");
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl border border-primary-light">
            <button
                type="button"
                onClick={() => navigate("/user")}
                className="btn-secondary mb-6"
            >
                ← Volver
            </button>

            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-primary-dark text-center">
                Editar Perfil de {user.name}
            </h1>

            <EditUserForm
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit} />
        </div>
    );
};




