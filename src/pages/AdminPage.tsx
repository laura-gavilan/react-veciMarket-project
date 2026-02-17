import { useCommerce } from "../core/commerce/CommerceContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CommerceCard } from "../components/CommerceCard";
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from "../components/ErrorBoundary";
import { PageError } from "../components/PageError";
import { useTranslate } from "../translations/locales/useTranslate";

const AdminPage = () => {
    const { commerces, loading } = useCommerce();
    const context = useContext(AuthContext);
    if (!context) throw new Error("AdminPage must be used within AuthProvider");

    const { user } = context;
    const [showScrollTop, setShowScrollTop] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslate();

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
        if (!user) return [];
        return commerces.filter(
            commerce => commerce.ownerUserId === user?._id
        );
    }, [commerces, user]);


    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen text-primary-dark">
                <h1 className="text-2xl font-semibold animate-pulse">
                    {t("commerces.loading")}
                </h1>
            </div>
        );

    const onClickCommerceCard = useCallback((id: string) => navigate(`/admin/commerce/${id}`), [navigate]);

    return (
        <ErrorBoundary
            fallback={
                <PageError
                    title="Error al cargar tus comercios"
                    message="No se han cargado los comercios.Por favor, vuelve a reintentarlo."
                    onRetry={() => window.location.reload()}
                />

            }
        >
            <div className="min-h-screen bg-neutral-warm py-12 px-6 flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark text-center">
                    {t("commerces.your_commerces")}
                </h1>

                {myCommerces.length === 0 && (
                    <p className="text-primary-dark text-center text-lg mt-6">
                        {t("commerces.no_commerces")}
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
                                    onClick={() => onClickCommerceCard(commerce._id)} />
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
        </ErrorBoundary>
    );
};

export default AdminPage;
