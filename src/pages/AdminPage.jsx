import { useCommerce } from "../core/commerce/CommerceContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const AdminPage = () => {
    const { commerces, loading } = useCommerce();
    const { user } = useContext(AuthContext);

    if (loading)
        return <p className="text-center mt-6 text-gray-500 text-lg">Cargando comercios...</p>;

    const myCommerces = commerces.filter(
        commerce => commerce.ownerUserId?._id === user._id
    );

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-10 text-center text-violet-900 tracking-tight">
                Tus Comercios
            </h1>

            {myCommerces.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No tienes comercios aún.
                </p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myCommerces.map((commerce) => (
                        <li
                            key={commerce._id}
                            className="relative bg-white rounded-3xl p-6 shadow-[0_10px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer"
                        >
                            <Link to={`/admin/commerce/${commerce._id}`} className="block h-full">
                                <h2 className="font-extrabold text-2xl text-violet-900 mb-3">
                                    {commerce.name}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {commerce.description}
                                </p>
                                <small className="text-gray-400">
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