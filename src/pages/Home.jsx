import { Link } from "react-router-dom";
import { CommercePage } from "./CommercePage";


export const Home = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-white text-violet-900">

            <section className="flex flex-col items-center justify-center text-center px-6 py-16">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-6">
                    Bienvenidx a <span className="text-violet-700">VeciMarket</span>, tu App de comercio local de confianza
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
                    Conecta con tu comunidad, apoya a tus vecinos y descubre productos únicos cerca de ti.
                </p>

                <div className="flex gap-4">
                    <Link
                        to="/register"
                        className="px-6 py-3 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-600 transition-all duration-300 shadow-md"
                    >
                        Regístrate
                    </Link>

                    <Link
                        to="/commerce"
                        className="px-6 py-3 rounded-full border border-violet-700 text-violet-700 hover:bg-violet-700 hover:text-white transition-all duration-300 shadow-md"
                    >
                        Explorar comercios
                    </Link>
                </div>
            </section>

            <section className="px-6 py-10 bg-gray-50">
                <h2 className="text-2xl font-bold mb-6 text-center">Comercios destacados</h2>
                <CommercePage limit={3} />
                <div className="text-center mt-6">
                    <Link
                        to="/commerce"
                        className="px-6 py-3 rounded-full border border-violet-700 text-violet-700 hover:bg-violet-700 hover:text-white transition-all duration-300 shadow-md"
                    >
                        Ver todos los comercios
                    </Link>
                </div>
            </section>


            <section className="px-6 py-10 text-center bg-gray-50 rounded-xl mx-6 md:mx-20 my-10 shadow-md">
                <h2 className="text-2xl font-bold mb-4">Contacto</h2>
                <p className="text-gray-600 max-w-xl mx-auto mb-6">
                    ¿Tienes preguntas, sugerencias o quieres ponerte en contacto con nosotros?
                    Escríbenos y nuestro equipo te responderá lo antes posible.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <a
                        href="mailto:contacto@vecimarket.com"
                        className="px-6 py-3 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-600 transition-all duration-300 shadow-md"
                    >
                        Enviar correo
                    </a>

                    <Link
                        to="/contact"
                        className="px-6 py-3 rounded-full border border-violet-700 text-violet-700 hover:bg-violet-700 hover:text-white transition-all duration-300 shadow-md"
                    >
                        Ir a la página de contacto
                    </Link>
                </div>
            </section>
        </div>
    );
};