import { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../core/auth/useAuth";

export const NavBar = () => {
    const { user } = useContext(AuthContext);
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);


    const getLinks = () => {
        if (!user) {
            return [
                { to: "/", label: "Inicio" },
                { to: "/aboutUs", label: "Sobre nosotros" },
                { to: "/commerce", label: "Comercios & Productos" },
                { to: "/contact", label: "Contacto" },
                { to: "/register", label: "Registro" },
            ];
        } else if (user.role === "admin") {
            return [
                { to: "/commerce", label: "Comercios & Productos" },
                { to: "/user", label: "Perfil" },
                { to: "/admin", label: "Mis comercios" },
                { to: "/commerce/new", label: "Crear comercio" },
                { to: "/orders", label: "Pedidos" },
            ];
        } else {
            return [
                { to: "/", label: "Inicio" },
                { to: "/aboutUs", label: "Sobre nosotros" },
                { to: "/commerce", label: "Comercios & Productos" },
                { to: "/user", label: "Perfil" },
                { to: "/orders", label: "Pedidos" },
            ];
        }
    };

    const links = getLinks();

    const handleLogout = () => {
        logout();
        setUserMenu(false);
        setOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full  shadow-md transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

                <div className="flex items-center md:hidden">
                    <button onClick={() => setOpen(!open)}>
                        <img
                            src={open ? "/xmark-solid-full.svg" : "/burger-menu.png"}
                            alt="Menú"
                            className="w-10 h-10"
                        />
                    </button>
                </div>

                {/* Desktop */}
                <Link
                    to="/"
                    className={`font-title text-h4 text-primary font-semibold 
                ${open ? "hidden" : "flex"} 
                md:flex 
                absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0
            `}
                >
                    VeciMarket
                </Link>

                <div className="hidden md:flex items-center gap-8 text-[1rem] font-semibold text-primary-dark">
                    {links.map(({ to, label }) => (
                        <Link key={to} to={to} className="hover:text-accent-primary transition-colors duration-300">
                            {label}
                        </Link>
                    ))}


                    <div className="hidden md:flex items-center gap-6 relative">
                        {!user && (
                            <>

                                <Link to="/cart" className=" w-6 h-6">
                                    <img
                                        src="/icons/cart_shopping.png"
                                        alt="Cart"
                                        className="w-full h-full object-contain"
                                    />
                                </Link>

                                <Link to="/login" className=" w-6 h-6">
                                    <img
                                        src="/icons/login.png"
                                        alt="Login"
                                        className="w-full h-full object-contain"
                                    />
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <Link to="/favorites" className="flex items-center justify-center w-6 h-6">
                                    <img
                                        src="/icons/favourite.png"
                                        alt="Favoritos"
                                        className="w-full h-full object-contain"
                                    />
                                </Link>

                                <Link to="/cart" className="flex items-center justify-center w-6 h-6">
                                    <img
                                        src="/icons/cart_shopping.png"
                                        alt="Cesta"
                                        className="w-full h-full object-contain"
                                    />
                                </Link>

                                <button
                                    onClick={() => setUserMenu(!userMenu)}
                                    className=" w-6 h-6">
                                    <img
                                        src={userMenu ? "/xmark-solid-full.svg" : "/icons/login.png"}
                                        alt="Usuario"
                                        className="w-full h-full object-contain"
                                    />
                                </button>


                                {userMenu && (
                                    <div className="absolute right-0 mt-20 w-40 bg-white border rounded shadow-lg z-50">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>


                {/* movil */}
                {!open && (
                    <div className="flex items-center gap-4 md:hidden ml-auto">

                        {!user && (
                            <>
                                <Link to="/cart" className="w-7 h-7">
                                    <img src="/icons/cart_shopping.png" className="w-full h-full" />
                                </Link>

                                <Link to="/login" className="w-7 h-7">
                                    <img src="/icons/login.png" className="w-full h-full" />
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <Link to="/favorites" className="w-7 h-7">
                                    <img src="/icons/favourite.png" className="w-full h-full" />
                                </Link>

                                <Link to="/cart" className="w-7 h-7">
                                    <img src="/icons/cart_shopping.png" className="w-full h-full" />
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* MENÚ MOVIL — SIN ICONOS */}
            {open && (
                <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] text-lg font-semibold">
                    {links.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setOpen(false)}
                            className="hover:text-accent-primary"
                        >
                            {label}
                        </Link>
                    ))}

                    {!user ? (
                        <></>
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