import { Link } from "react-router-dom";

const links = [
    { text: "Sobre nosotros", to: "/aboutUs" },
    { text: "Productos", to: "/products" },
    { text: "Comercio", to: "/commerce" },
    { text: "Usuario", to: "/users" },
    { text: "Regístrate", to: "/register" },
    { text: "Inicia sesión", to: "/login" },
]

export const NavBar = () => {
    return (
        <nav className="flex items-center justify-between bg-gray-700 text-white px-6 py-4" >
            {/* logo */}
            <Link to="/" className="text-2xl font-bold">
                VeciMarket
            </Link>

            <div className="flex space-x-6">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}>
                        {link.text}
                    </Link>
                ))}
            </div>
        </nav>
    );
};