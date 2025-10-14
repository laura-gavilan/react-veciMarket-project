import { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../core/auth/useAuth";

export const NavBar = () => {
    const { user } = useContext(AuthContext);
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);

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
        setUserMenu(false);
        setOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-[var(--color-gray-warm)] shadow-md transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-title text-h4 text-[var(--color-burdeos-dark)] font-semibold">VeciMarket</span>
                </Link>

                {/* Menú escritorio */}
                <div className="hidden md:flex items-center gap-8 text-[1rem] font-semibold text-[var(--color-burdeos-dark)]">
                    {links.map(({ to, label }) => (
                        <Link key={to} to={to} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">
                            {label}
                        </Link>
                    ))}

                    {/* Icono login / usuario */}
                    <div className="relative">
                        {!user ? (
                            <Link to="/login" className="flex items-center justify-center w-6 h-6">
                                <img
                                    src="/public/icons/login.png"
                                    alt="Login"
                                    className="w-full h-full object-contain"
                                />
                            </Link>
                        ) : (
                            <button
                                onClick={() => setUserMenu(!userMenu)}
                                className="flex items-center justify-center w-6 h-6"
                            >
                                <img
                                    src="/public/icons/login.png"
                                    alt="Usuario"
                                    className="w-full h-full object-contain"
                                />
                            </button>
                        )}

                        {/* Dropdown cerrar sesión */}
                        {user && userMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menú móvil */}
                <div className="flex items-center gap-4 md:hidden">
                    <button className="focus:outline-none" onClick={() => setOpen(!open)}>
                        <img
                            src={open ? "/public/xmark-solid-full.svg" : "/public/white-burger-menu.png"}
                            alt="Menú"
                            className="w-10 h-10 transition-transform duration-300"
                        />
                    </button>
                </div>
            </div>

            {/* Menú móvil desplegable */}
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

                    {!user ? (
                        <Link to="/login" onClick={() => setOpen(false)} className="w-10 h-10">
                            <img
                                src="/public/icons/login.png"
                                alt="Login"
                                className="w-full h-full object-contain"
                            />
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="btn-secondary w-full"
                        >
                            Cerrar sesión
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};