import { Link } from "react-router-dom";
import { useUser } from "../core/user/useUser";

export const UserPage = () => {
    const { user, deleteUser, loading } = useUser();

    if (loading)
        return <p className="text-center mt-8 text-primary-dark font-sans">Cargando usuario...</p>;
    if (!user)
        return <p className="text-center mt-8 text-primary-dark font-sans">No hay usuario logueado.</p>;

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer."
        );

        if (confirmDelete) {
            await deleteUser();
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-primary-light">
            <h1 className="text-2xl md:text-3xl font-title font-semibold mb-6 text-primary text-center">
                Perfil de {user.name}
            </h1>

            <div className="space-y-3 text-primary-dark font-sans">
                <p><strong>Nombre de usuario:</strong> {user.username}</p>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Primer Apellido:</strong> {user.firstName}</p>
                <p><strong>Segundo Apellido:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Teléfono:</strong> {user.phoneNumber}</p>
                <p><strong>Dirección:</strong> {user.address}</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/user/edit" className="flex-1">
                    <button className="btn-primary w-full">Editar perfil</button>
                </Link>

                <button
                    onClick={handleDelete}
                    className="btn-secondary flex-1 text-red-600 hover:text-red-700 w-full"
                >
                    Eliminar perfil
                </button>
            </div>
        </div>
    );
};




