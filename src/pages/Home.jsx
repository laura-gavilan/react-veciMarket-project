import { Link } from "react-router-dom";
import { CommercePage } from "./CommercePage";

export const Home = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-white via-violet-50 to-violet-100 text-gray-900 font-inter">

            {/* HERO */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-[url('/images/hero-market.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-violet-900">
                        Bienvenidx a <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600">VeciMarket</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
                        Conecta con tu comunidad, apoya a tus vecinos y descubre productos únicos cerca de ti.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/register"
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-700 to-fuchsia-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Regístrate
                        </Link>
                        <Link
                            to="/commerce"
                            className="px-8 py-3 rounded-full border-2 border-violet-700 text-violet-800 font-semibold hover:bg-violet-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                            Explorar comercios
                        </Link>
                    </div>
                </div>
            </section>

            {/* COMERCIOS DESTACADOS */}
            <section className="px-6 py-16 bg-gradient-to-b from-violet-100 to-white">
                <CommercePage limit={3} />
                <div className="text-center mt-8">
                    <Link
                        to="/commerce"
                        className="px-8 py-3 rounded-full border-2 border-violet-700 text-violet-800 font-semibold hover:bg-violet-700 hover:text-white hover:scale-105 shadow-md transition-all duration-300"
                    >
                        Ver todos los comercios
                    </Link>
                </div>
            </section>

            {/* CONTACTO */}
            <section className="px-6 py-20 bg-white text-center rounded-3xl mx-6 md:mx-20 my-14 shadow-xl border border-violet-100">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-violet-800">Contáctanos</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    ¿Tienes preguntas, sugerencias o quieres ponerte en contacto con nosotros?
                    Escríbenos y nuestro equipo te responderá lo antes posible.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <a
                        href="mailto:contacto@vecimarket.com"
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-700 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Enviar correo
                    </a>
                    <Link
                        to="/contact"
                        className="px-8 py-3 rounded-full border-2 border-violet-700 text-violet-800 font-semibold hover:bg-violet-700 hover:text-white hover:scale-105 shadow-md transition-all duration-300"
                    >
                        Ir a la página de contacto
                    </Link>
                </div>
            </section>

        </div>
    );
};