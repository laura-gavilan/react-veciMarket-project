import { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../core/auth/useAuth";

export const NavBar = () => {
    const { user } = useContext(AuthContext);
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    // Definimos los enlaces según el rol del usuario
    const links = useMemo(() => {
        if (!user) {
            return [
                { to: "/", label: "Inicio" },
                { to: "/aboutUs", label: "Sobre nosotros" },
                { to: "/commerce", label: "Comercios" },
                { to: "/contact", label: "Contacto" },
                { to: "/register", label: "Registro" },
            ];
        } else if (user.role === "admin") {
            return [
                { to: "/", label: "Inicio" },
                { to: "/commerce", label: "Comercios" },
                { to: "/admin", label: "Mis comercios" },
                { to: "/commerce/new", label: "Crear comercio" },
            ];
        } else {
            return [
                { to: "/", label: "Inicio" },
                { to: "/commerce", label: "Comercios" },
                { to: "/user", label: "Perfil" },
                { to: "/favorites", label: "Favoritos" },
            ];
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        setOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-[var(--color-gray-warm)] shadow-md transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-title text-h5 text-[var(--color-burdeos-dark)] font-semibold">VeciMarket</span>
                </Link>

                {/* Menú escritorio */}
                <div className="hidden md:flex items-center gap-8 text-[1rem] font-semibold text-[var(--color-burdeos-dark)]">
                    {links.map(({ to, label }) => (
                        <Link key={to} to={to} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Login / Logout / Menú móvil */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <Link to="/login" className="btn-primary">Login</Link>
                    ) : (
                        <button onClick={handleLogout} className="btn-secondary">Cerrar sesión</button>
                    )}

                    <button className="md:hidden focus:outline-none" onClick={() => setOpen(!open)}>
                        <img
                            src={open ? "/public/xmark-solid-full.svg" : "/public/white-burger-menu.png"}
                            alt="Menú"
                            className="w-10 h-10 transition-transform duration-300"
                        />
                    </button>
                </div>
            </div>

            {/* Menú móvil */}
            {open && (
                <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] shadow-inner border-t border-[var(--color-burdeos-light)] text-lg font-semibold transition-all duration-300">
                    {links.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setOpen(false)}
                            className="hover:text-[var(--color-mostaza)] transition-colors duration-300"
                        >
                            {label}
                        </Link>
                    ))}
                    {user && (
                        <button onClick={handleLogout} className="btn-secondary w-full">
                            Cerrar sesión
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};
