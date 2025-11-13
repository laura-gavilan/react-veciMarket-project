import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-secondary text-accent-primary py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h2 className="text-2xl font-title font-semibold text-primary-dark mb-4">
                        VeciMarket
                    </h2>
                    <p className="text-primary">
                        Apoya a los comercios locales y descubre productos únicos en tu comunidad.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary-dark">Enlaces</h3>
                    <ul className="space-y-2 text-primary">
                        <li>
                            <Link to="/" className="hover:text-primary-dark transition-colors">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/commerce" className="hover:text-primary-dark transition-colors">Comercios</Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:text-primary-dark transition-colors">Registro</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-primary-dark transition-colors">Contacto</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary-dark">Contacto & Redes</h3>
                    <p className="mb-4 text-primary">Correo: <a href="mailto:contacto@vecimarket.com" className=" text-primary hover:text-primary-dark transition-colors">contacto@vecimarket.com</a></p>
                </div>
            </div>

            <div className="mt-8 border-t border-primary-light pt-4 text-center text-sm text-primary-dark/70">
                © 2025 <span className="font-title font-semibold text-primary-dark">VeciMarket</span>. Todos los derechos reservados.
            </div>
        </footer>
    );
};
