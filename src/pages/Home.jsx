import { Link } from "react-router-dom";
import { CommercePage } from "./CommercePage";

export const Home = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-violet-50 to-white text-violet-900">

            <section className="flex flex-col items-center justify-center text-center px-6 py-20">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                    Bienvenidx a <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-violet-500">VeciMarket</span>, tu App de comercio local
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-10">
                    Conecta con tu comunidad, apoya a tus vecinos y descubre productos únicos cerca de ti.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/register"
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-700 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                    >
                        Regístrate
                    </Link>
                    <Link
                        to="/commerce"
                        className="px-8 py-3 rounded-full border-2 border-violet-700 text-violet-700 font-semibold hover:bg-violet-700 hover:text-white shadow-md hover:scale-105 transition-all duration-300"
                    >
                        Explorar comercios
                    </Link>
                </div>
            </section>

            <section className="px-6 py-8 bg-gray-50">
                <CommercePage limit={3} />
                <div className="text-center mt-8">
                    <Link
                        to="/commerce"
                        className="px-8 py-3 rounded-full border-2 border-violet-700 text-violet-700 font-semibold hover:bg-violet-700 hover:text-white shadow-md hover:scale-105 transition-all duration-300"
                    >
                        Ver todos los comercios
                    </Link>
                </div>
            </section>

            <section className="px-6 py-14 text-center bg-white rounded-3xl mx-6 md:mx-20 my-14 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-violet-800">Contacto</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    ¿Tienes preguntas, sugerencias o quieres ponerte en contacto con nosotros? Escríbenos y nuestro equipo te responderá lo antes posible.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <a
                        href="mailto:contacto@vecimarket.com"
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-700 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                    >
                        Enviar correo
                    </a>
                    <Link
                        to="/contact"
                        className="px-8 py-3 rounded-full border-2 border-violet-700 text-violet-700 font-semibold hover:bg-violet-700 hover:text-white shadow-md hover:scale-105 transition-all duration-300"
                    >
                        Ir a la página de contacto
                    </Link>
                </div>
            </section>

        </div>
    );
};