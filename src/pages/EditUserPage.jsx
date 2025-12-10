import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from './../core/user/useUser';
import { EditUserForm } from "../components/EditUserForm";

const EditUserPage = () => {
    const { user, updateUserData, loading } = useUser();
    const [error, setError] = useState(null);
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

    useEffect(() => {
        if (!loading && !user) {
            setError("No se ha podido cargar el usuario.");
        }
    }, [loading, user]);

    if (loading)
        return <p className="text-center mt-8 text-primary-dark font-sans">Cargando usuario...</p>;


    if (error) {
        return (
            <PageError
                title="Error al cargar la página de usuario."
                message="No se ha podido cagrar el usuario. Por favor, inténtelo de nuevo."
                onRetry={() => window.location.reload()} />
        )
    }

    const handleSubmit = useCallback(async () => {
        try {
            await updateUserData(form);
            navigate("/user");
        } catch (err) {
            console.error("Error al actualizar usuario:", err);
            setError("No se pudo actualizar el perfil. Inténtelo nuevamente.");
        }
    }, [form, updateUserData, navigate]);

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

export default EditUserPage;




