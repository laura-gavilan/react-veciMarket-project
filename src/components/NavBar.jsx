import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
    { text: "Inicio", to: "/" },
    { text: "Sobre nosotros", to: "/aboutUs" },
    // { text: "Productos", to: "/products" },
    { text: "Comercio", to: "/commerce" },
    { text: "Usuario", to: "/users" },
    { text: "Regístrate", to: "/register" },
    { text: "Inicia sesión", to: "/login" },
]

export const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-violet-900 text-white px-6 py-4 shadow-lg" >
            <div className="flex items-center justify-between">
                {/* logo */}
                <Link to="/" className="text-2xl font-extrabold tracking-wide hover:text-gray-200 transition">
                    VeciMarket
                </Link>

                <button className="md:hidden block" onClick={() => setOpen(!open)}>
                    <img 
                    src={open ? "/public/xmark-solid-full.svg" : "/public/white-burger-menu.png"}
                    alt="Icono menú hamburguesa" 
                    className="w-7 h-7" />
                </button>

                <div className="hidden md:flex gap-3">
                    {links.map((link) => (
                        <Link
                            className="px-4 py-2 rounded-full hover:bg-white hover:text-violet-800 hover:border-white transition-all duration-300 shadow-sm"
                            key={link.to}
                            to={link.to}>
                            {link.text}
                        </Link>
                    ))}
                </div>

                {open && (
                    <div className="flex flex-col gap-3 mt-4 md:hidden">
                        {links.map((link) => (
                            <Link
                                className="border border-white/70 px-4 py-2 rounded-full hover:bg-white hover:text-violet-800 hover:border-white transition-all duration-300 shadow-sm text-center"
                                key={link.to}
                                to={link.to}
                                onclick={() => setOpen(false)}>
                                {link.text}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};