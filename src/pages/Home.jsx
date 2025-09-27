import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

export const Home = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center text-center px-6 py-16 bg-white text-violet-900 min-h-[calc(100vh-80px)]">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-6">
                    Bienvenidx a
                    <span className="text-violet-700">VeciMarket</span>, tu App de comercio local de confianza
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
                    Conecta con tu comunidad, apoya a tus vecinos y descubre productos únicos cerca de ti.
                </p>

                <div className="flex gap-4">
                    <Link to="/register" className="px-6 py-3 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-600 transition-all duration-300 shadow-md">
                        Regístrate
                    </Link>

                    <Link to="/commerce" className="px-6 py-3 rounded-full border border-violet-700 text-violet-700 hover:bg-violet-700 hover:text-white transition-all duration-300 shadow-md">
                        Explorar comercios
                    </Link>
                </div>
            </div>
        </Layout>
    );
};