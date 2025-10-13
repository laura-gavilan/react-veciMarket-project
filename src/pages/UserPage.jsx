import { Link } from "react-router-dom";
import { useUser } from "../core/user/useUser";


export const UserPage = () => {
    const { user, deleteUser, loading } = useUser();

    if (loading) return <p className="text-center mt-8">Cargando usuario...</p>;
    if (!user) return <p className="text-center mt-8">No hay usuario logueado.</p>;

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer."
        );

        if (confirmDelete) {
            await deleteUser();
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-general rounded-xl shadow-md elevation">
            <h1 className="mb-6">Perfil de {user.name}</h1>

            <div className="space-y-2">
                <p><strong>Nombre de usuario:</strong> {user.username}</p>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Primer Apellido:</strong> {user.firstName}</p>
                <p><strong>Segundo Apellido:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Teléfono:</strong> {user.phoneNumber}</p>
                <p><strong>Dirección:</strong> {user.address}</p>
            </div>

            <div className="mt-6 flex gap-4">
                <Link to="/user/edit">
                    <button className="btn-primary">Editar perfil</button>
                </Link>

                <button
                    onClick={handleDelete}
                    className="btn-secondary text-red-600 hover:text-red-700"
                >
                    Eliminar perfil
                </button>
            </div>
        </div>
    );
};



