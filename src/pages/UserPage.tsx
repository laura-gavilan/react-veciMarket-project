import { Link } from "react-router-dom";
import { useUser } from "../core/user/useUser";
import { useEffect, useState } from "react";
import { PageError } from "../components/PageError";
import { useTranslate } from "../translations/locales/useTranslate";
import type { User } from "../types/types";

export type UserPageType = {
    user: User | null,
    deleteUser: () => Promise<void>,
    loading: boolean,
};

const UserPage = () => {
    const { user, deleteUser, loading } = useUser();
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslate();

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
                message="No se ha podido cagrar el usuario. Por favor, inténtelo de nuevo."
                onRetry={() => window.location.reload()} />
        )
    }

    const handleDelete = async (): Promise<void> => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer."
        );

        if (confirmDelete) {
            await deleteUser();
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-primary-light">
            <h1 className="text-2xl md:text-3xl font-title font-semibold mb-6 text-primary text-center">
                {t("user.profile_user", { name: user.name })}
            </h1>

            <div className="space-y-3 text-primary-dark font-sans">
                <p><strong>{t("user.username")}:</strong> {user.username}</p>
                <p><strong>{t("user.name")}:</strong> {user.name}</p>
                <p><strong>{t("user.firstName")}:</strong> {user.firstName}</p>
                <p><strong>{t("user.lastName")}:</strong> {user.lastName}</p>
                <p><strong>{t("user.email")}:</strong> {user.email}</p>
                <p><strong>{t("user.phoneNumber")}:</strong> {user.phoneNumber}</p>
                <p><strong>{t("user.address")}:</strong> {user.address}</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/user/edit" className="flex-1">
                    <button className="btn-primary w-full">{t("user.edit_profile")}</button>
                </Link>

                <button
                    onClick={handleDelete}
                    className="btn-secondary flex-1 text-red-600 hover:text-red-700 w-full"
                >
                    {t("user.delete_profile")}
                </button>
            </div>
        </div>
    );
};

export default UserPage;



