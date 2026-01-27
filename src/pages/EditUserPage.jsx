import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from './../core/user/useUser';
import { EditUserForm } from "../components/EditUserForm";
import { useTranslate } from "../translations/locales/useTranslate";

const EditUserPage = () => {
    const { user, updateUserData, loading } = useUser();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslate();

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
        return <p className="text-center mt-8 text-primary-dark font-sans">{t("user.loading")}</p>;


    if (error) {
        return (
            <PageError
                title="Error al cargar la página de usuario."
                message= {t("user.no_update_profile")}
                onRetry={() => window.location.reload()} />
        )
    }

    const handleSubmit = useCallback(async () => {
        try {
            await updateUserData(form);
            navigate("/user");
        } catch (err) {
            console.error("Error al actualizar usuario:", err);
            setError(t("user.no_update_profile"));
        }
    }, [form, updateUserData, navigate]);

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl border border-primary-light">
            <button
                type="button"
                onClick={() => navigate("/user")}
                className="btn-secondary mb-6"
            >
                {t("components.back_button")}
            </button>

            <h1 className="text-3xl md:text-4xl font-title font-semibold mb-8 text-primary-dark text-center">
                {t("user.edit_profile_user", { name: user.name })}
            </h1>

            <EditUserForm
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit} />
        </div>
    );
};

export default EditUserPage;




