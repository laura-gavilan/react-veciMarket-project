import { useContext, useState, useEffect, memo, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../core/auth/useAuth";
import { useCart } from "../core/cart/useCart";


export const NavBar = memo(() => {
    const { user } = useContext(AuthContext);
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const { getTotalItems } = useCart();
    const [animate, setAnimate] = useState(false);

    const totalItems = useMemo(() => {
        return getTotalItems();
    }, [getTotalItems]);

    useEffect(() => {
        if (totalItems > 0) {
            setAnimate(true);
            const timeout = setTimeout(() => setAnimate(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [totalItems]);


    const links = useMemo(() => {
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
    }, [user]);


    const handleLogout = useCallback(() => {
        logout();
        setUserMenu(false);
        setOpen(false);
    }, [logout]);

    const toggleUserMenu = useCallback(() => setUserMenu(prev => !prev), []);
    const toggleMobileMenu = useCallback(() => setOpen(prev => !prev), []);

    return (
        <div className="pt-20">
            <nav className="fixed top-0 z-50 w-full bg-white  shadow-md transition-all duration-300">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

                    <div className="flex items-center md:hidden">
                        <button onClick={toggleMobileMenu}>
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

                                    <Link to="/cart" className="relative w-6 h-6">
                                        <img
                                            src="/icons/cart_shopping.png"
                                            alt="Cart"
                                            className="w-full h-full object-contain"
                                        />

                                        {totalItems > 0 && (
                                            <span className={`absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300 ${animate ? "scale-125" : "scale-100"}`} >
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>

                                    <Link to="/login" className="w-6 h-6">
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

                                    <Link to="/cart" className="relative flex items-center justify-center w-6 h-6">
                                        <img
                                            src="/icons/cart_shopping.png"
                                            alt="Cesta"
                                            className="w-full h-full object-contain"
                                        />

                                        {totalItems > 0 && (
                                            <span className={`absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300 ${animate ? "scale-125" : "scale-100"}`} >
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>

                                    {/* ICONO USUARIO CON PUNTO VERDE */}
                                    <button onClick={toggleUserMenu} className="relative w-6 h-6">
                                        <img
                                            src="/icons/login.png"
                                            alt="Usuario"
                                            className="w-full h-full object-contain"
                                        />
                                        <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
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
                                    <Link to="/cart" className="relative w-7 h-7">
                                        <img src="/icons/cart_shopping.png" className="w-full h-full" />

                                        {totalItems > 0 && (
                                            <span className={`absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300 ${animate ? "scale-125" : "scale-100"}`} >                                {totalItems}
                                            </span>
                                        )}
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

                                    <Link to="/cart" className="relative w-7 h-7">
                                        <img src="/icons/cart_shopping.png" className="w-full h-full" />

                                        {totalItems > 0 && (
                                            <span className={`absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300 ${animate ? "scale-125" : "scale-100"}`} >
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>

                                    <button className="relative w-7 h-7" onClick={toggleUserMenu}>
                                        <img src="/icons/login.png" className="w-full h-full" />
                                        <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
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
        </div>
    );
});