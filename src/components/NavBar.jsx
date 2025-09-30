import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../core/auth/useAuth";

export const NavBar = () => {
    const { user } = useContext(AuthContext);
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-violet-900 text-white px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-wide hover:text-gray-200 transition"
                >
                    VeciMarket
                </Link>

                <button className="md:hidden block" onClick={() => setOpen(!open)}>
                    <img
                        src={open ? "/public/xmark-solid-full.svg" : "/public/white-burger-menu.png"}
                        alt="Icono menú"
                        className="w-7 h-7"
                    />
                </button>


                <div className="hidden md:flex gap-3">
                    <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/">
                        Inicio
                    </Link>

                    {!user && (
                        <>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/aboutUs">
                                Sobre nosotros
                            </Link>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/commerce">
                                Comercios
                            </Link>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/contact">
                                Contacto
                            </Link>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/register">
                                Regístrate
                            </Link>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/login">
                                Inicia sesión
                            </Link>
                        </>
                    )}

                    {user && user.role !== "admin" && (
                        <>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/commerce">
                                Comercios
                            </Link>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/user">
                                Perfil
                            </Link>
                            <button
                                className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800"
                                onClick={logout}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )}

                    {user?.role === "admin" && (
                        <>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/commerce">
                                Comercios
                            </Link>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/admin">
                                Perfil
                            </Link>
                            <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800" to="/commerce/new">
                                Crear comercio
                            </Link>
                            <button
                                className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800"
                                onClick={logout}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )}
                </div>

                {open && (
                    <div className="flex flex-col gap-3 mt-4 md:hidden">
                        {!user && (
                            <>
                                <Link className="border px-4 py-2 rounded-full" to="/aboutUs" onClick={() => setOpen(false)}>
                                    Sobre nosotros
                                </Link>
                                <Link className="border px-4 py-2 rounded-full" to="/commerce" onClick={() => setOpen(false)}>
                                    Comercios
                                </Link>
                                <Link className="border px-4 py-2 rounded-full" to="/contact" onClick={() => setOpen(false)}>
                                    Contacto
                                </Link>
                                <Link className="border px-4 py-2 rounded-full" to="/register" onClick={() => setOpen(false)}>
                                    Regístrate
                                </Link>
                                <Link className="border px-4 py-2 rounded-full" to="/login" onClick={() => setOpen(false)}>
                                    Inicia sesión
                                </Link>
                            </>
                        )}

                        {user && user.role !== "admin" && (
                            <>
                                <Link className="border px-4 py-2 rounded-full" to="/commerce" onClick={() => setOpen(false)}>
                                    Comercios
                                </Link>
                                <Link className="border px-4 py-2 rounded-full" to="/user" onClick={() => setOpen(false)}>
                                    Perfil
                                </Link>
                                <button
                                    className="border px-4 py-2 rounded-full"
                                    onClick={() => {
                                        logout();
                                        setOpen(false);
                                    }}
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        )}

                        {user?.role === "admin" && (
                            <>
                                <Link className="border px-4 py-2 rounded-full" to="/commerce" onClick={() => setOpen(false)}>
                                    Comercios
                                </Link>
                                <Link className="border px-4 py-2 rounded-full" to="/admin" onClick={() => setOpen(false)}>
                                    Perfil
                                </Link>
                                <Link className="border px-4 py-2 rounded-full" to="/commerce/new" onClick={() => setOpen(false)}>
                                    Crear comercio
                                </Link>
                                <button
                                    className="border px-4 py-2 rounded-full"
                                    onClick={() => {
                                        logout();
                                        setOpen(false);
                                    }}
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};