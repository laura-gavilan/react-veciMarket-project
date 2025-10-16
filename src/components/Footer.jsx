import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-[var(--color-mostaza-pastel)] text-[var(--color-burdeos-light)] py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h2 className="text-2xl font-title font-semibold text-[var(--color-burdeos-dark)] mb-4">
                        VeciMarket
                    </h2>
                    <p className="text-gray-800/70">
                        Apoya a los comercios locales y descubre productos únicos en tu comunidad.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4 text-[var(--color-burdeos-dark)]">Enlaces</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-[var(--color-burdeos-dark)] transition-colors">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/commerce" className="hover:text-[var(--color-burdeos-dark)] transition-colors">Comercios</Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:text-[var(--color-burdeos-dark)] transition-colors">Registro</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-[var(--color-burdeos-dark)] transition-colors">Contacto</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4 text-[var(--color-burdeos-dark)]">Contacto & Redes</h3>
                    <p className="mb-4">Correo: <a href="mailto:contacto@vecimarket.com" className="hover:text-[var(--color-burdeos-dark)] transition-colors">contacto@vecimarket.com</a></p>
                </div>
            </div>

            <div className="mt-8 border-t border-[var(--color-burdeos-light)] pt-4 text-center text-sm text-gray-800/70">
                © 2025 <span className="font-title font-semibold text-[var(--color-burdeos-dark)]">VeciMarket</span>. Todos los derechos reservados.
            </div>
        </footer>
    );
};
