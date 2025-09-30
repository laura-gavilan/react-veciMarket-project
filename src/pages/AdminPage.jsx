import { useCommerce } from "../contexts/CommerceContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const AdminPage = () => {
    const { commerces, loading, deleteCommerce } = useCommerce();
    const { user } = useContext(AuthContext);

    if (loading) return <p className="text-center mt-6">Cargando comercios...</p>;

    const myCommerces = commerces.filter(
        commerce => commerce.ownerUserId?.id === user.id
    );

    const handleDelete = (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este comercio?")) {
            deleteCommerce(id);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-violet-900">
                Tus Comercios
            </h1>

            {myCommerces.length === 0 ? (
                <p className="text-center text-gray-500">No tienes comercios aún.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {myCommerces.map((commerce, index) => (
                        <li
                            key={`${commerce.id}-${index}`}
                            className="border border-gray-200 rounded-xl p-4 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="mb-4">
                                <h2 className="font-bold text-xl text-violet-900 mb-1">
                                    {commerce.name}
                                </h2>
                                <p className="text-gray-700">{commerce.description}</p>
                                <small className="text-gray-400 mt-2 block">
                                    Propietario: {commerce.ownerUserId?.name}
                                </small>
                            </div>

                            <div className="flex gap-2 mt-auto">
                                <Link
                                    to={`/commerce/edit/${commerce.id}`}
                                    className="flex-1 text-center bg-violet-900 text-white px-4 py-2 rounded-lg hover:bg-violet-800 transition-colors"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(commerce.id)}
                                    className="flex-1 text-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};