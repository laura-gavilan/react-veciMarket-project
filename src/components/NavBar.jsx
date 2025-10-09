import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../core/auth/useAuth";
import { useCommerce } from "../core/commerce/CommerceContext";

export const NavBar = () => {
    const { user } = useContext(AuthContext);
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-[var(--color-gray-warm)] shadow-md transition-all duration-300">

            {/* ---------- FILA SUPERIOR: LOGO + LOGIN + MENÚ ---------- */}
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-title text-h5 text-[var(--color-burdeos-dark)] font-semibold">VeciMarket</span>
                </Link>

                {/* Enlaces (desktop) */}
                <div className="hidden md:flex items-center gap-8 text-[1rem] font-semibold text-[var(--color-burdeos-dark)]">
                    {!user && (
                        <>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/">Inicio</Link>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/aboutUs">Sobre nosotros</Link>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/commerce">Comercios</Link>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/contact">Contacto</Link>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/register">Registro</Link>
                        </>
                    )}
                    {user && user.role !== "admin" && (
                        <>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/">Inicio</Link>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/commerce">Comercios</Link>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/user">Perfil</Link>
                        </>
                    )}
                    {user?.role === "admin" && (
                        <>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/">Inicio</Link>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/commerce">Comercios</Link>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/admin">Mis comercios</Link>
                            <Link className="hover:text-[var(--color-mostaza)] transition-colors duration-300" to="/commerce/new">Crear comercio</Link>
                        </>
                    )}
                </div>

                {/* Login / Logout / Menú */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <Link to="/login" className="btn-primary">
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={logout}
                            className="btn-secondary"
                        >
                            Cerrar sesión
                        </button>
                    )}

                    {/* Botón móvil */}
                    <button
                        className="md:hidden focus:outline-none"
                        onClick={() => setOpen(!open)}
                    >
                        <img
                            src={
                                open
                                    ? "/public/xmark-solid-full.svg"
                                    : "/public/white-burger-menu.png"
                            }
                            alt="Menú"
                            className="w-10 h-10 transition-transform duration-300"
                        />
                    </button>
                </div>
            </div>

            {/* ---------- MENÚ MÓVIL ---------- */}
            {open && (
                <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] shadow-inner border-t border-[var(--color-burdeos-light)] text-lg font-semibold transition-all duration-300">
                    {!user && (
                        <>
                            <Link to="/" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Inicio</Link>
                            <Link to="/aboutUs" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Sobre nosotros</Link>
                            <Link to="/commerce" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Comercios</Link>
                            <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Contacto</Link>
                            <Link to="/register" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Registro</Link>
                        </>
                    )}
                    {user && user.role !== "admin" && (
                        <>
                            <Link to="/" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Inicio</Link>
                            <Link to="/commerce" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Comercios</Link>
                            <Link to="/user" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Perfil</Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setOpen(false);
                                }}
                                className="btn-secondary w-full"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )}
                    {user?.role === "admin" && (
                        <>
                            <Link to="/" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Inicio</Link>
                            <Link to="/commerce" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Comercios</Link>
                            <Link to="/admin" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Mis comercios</Link>
                            <Link to="/commerce/new" onClick={() => setOpen(false)} className="hover:text-[var(--color-mostaza)] transition-colors duration-300">Crear comercio</Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setOpen(false);
                                }}
                                className="btn-secondary w-full"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
};