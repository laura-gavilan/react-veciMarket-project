import { useCommerce } from "../core/commerce/CommerceContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const AdminPage = () => {
    const { commerces, loading } = useCommerce();
    const { user } = useContext(AuthContext);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-500">
                <h1 className="text-2xl font-semibold animate-pulse">
                    Cargando comercios...
                </h1>
            </div>
        );

    const myCommerces = commerces.filter(
        commerce => commerce.ownerUserId?._id === user._id
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-12 px-6 flex flex-col gap-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-violet-900 text-center">
                Tus Comercios
            </h1>

            {myCommerces.length === 0 ? (
                <p className="text-gray-500 text-center text-lg mt-6">
                    No tienes comercios aún.
                </p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myCommerces.map((commerce) => (
                        <li
                            key={commerce._id}
                            className="relative bg-white rounded-3xl p-6 shadow-xl border border-violet-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            <Link to={`/admin/commerce/${commerce._id}`} className="block h-full">
                                {(commerce.image || commerce.images?.[0]) && (
                                    <img
                                        src={
                                            (commerce.image || commerce.images?.[0]).startsWith("http")
                                                ? (commerce.image || commerce.images?.[0])
                                                : commerce.image?.startsWith("/images/")
                                                    ? commerce.image
                                                    : `/commerces/${commerce.images?.[0] || commerce.image}`
                                        }
                                        alt={commerce.name}
                                        className="w-full h-48 object-cover rounded-2xl mb-4 shadow-md hover:shadow-lg transition-transform duration-300"
                                    />
                                )}
                                <h2 className="font-extrabold text-2xl text-violet-900 mb-3">
                                    {commerce.name}
                                </h2>
                                <p className="text-gray-700 mb-4 line-clamp-3">
                                    {commerce.description}
                                </p>
                                <small className="text-gray-500">
                                    Propietario: {commerce.ownerUserId?.name}
                                </small>
                                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-violet-400 to-violet-600 
                                                rounded-full opacity-30 blur-xl pointer-events-none"></div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
