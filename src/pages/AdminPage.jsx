import { useCommerce } from "../core/commerce/CommerceContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CommerceCard } from "../components/CommerceCard";
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
    const { commerces, loading } = useCommerce();
    const { user } = useContext(AuthContext);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const myCommerces = useMemo(() => {
        return commerces.filter(
            commerce => commerce.ownerUserId?._id === user._id
        );
    }, [commerces, user?._id]);


    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen text-primary-dark">
                <h1 className="text-2xl font-semibold animate-pulse">
                    Cargando comercios...
                </h1>
            </div>
        );


    return (
        <div className="min-h-screen bg-neutral-warm py-12 px-6 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark text-center">
                Tus Comercios
            </h1>

            {myCommerces.length === 0 && (
                <p className="text-primary-dark text-center text-lg mt-6">
                    No tienes comercios aún.
                </p>
            )}

            {myCommerces.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myCommerces.map((commerce) => (
                        <li
                            key={commerce._id}
                            className="relative bg-white rounded-3xl p-6 shadow-xl border border-primary-light hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            <CommerceCard
                                commerce={commerce}
                                onClick={() => navigate(`/admin/commerce/${commerce._id}`)} />
                        </li>
                    ))}
                </ul>
            )}

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-accent-primary text-primary-dark p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
                >
                    ↑
                </button>
            )}
        </div>
    );
};
