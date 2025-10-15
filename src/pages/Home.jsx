import { Link } from "react-router-dom";
import { useCommerce } from "../core/commerce/CommerceContext";
import { useProduct } from "../core/products/ProductContext";
import { useEffect, useState } from "react";

export const Home = () => {
    const { commerces } = useCommerce();
    const { products } = useProduct();

    const featuredCommerces = commerces.slice(0, 5);
    const featuredProducts = products.slice(0, 5);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="bg-gray-50 text-gray-900 font-roboto">

            <section className="relative max-w-7xl mx-auto px-10 py-44 rounded-3xl shadow-2xl mt-6 overflow-hidden">
                <div
                    className="absolute inset-0 rounded-3xl bg-cover bg-[position:90%_right]"
                    style={{ backgroundImage: "url('/images/food.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/30 to-transparent rounded-3xl"></div>

                <div className="absolute top-4 left-4 max-w-lg text-white text-left space-y-4">
                    <h1 className="text-5xl md:text-6xl font-poppins font-semibold mb-4 drop-shadow-lg">
                        VeciMarket
                    </h1>

                    <div className="mt-2 text-lg md:text-xl text-gray-100/90 drop-shadow space-y-2">
                        <span className="block  text-[var(--color-burdeos-dark)]">Descubre los</span>
                        <span className="block  text-[var(--color-burdeos-dark)]">mejores productos</span>
                        <span className="block  text-[var(--color-burdeos-dark)]">locales</span>
                    </div>

                    <div className="flex flex-col gap-4 mt-8 items-start">
                        <Link
                            to="/aboutUs"
                            className="btn-secondary gradient-hover bg-white/20 hover:bg-white/30 text-white border border-white rounded-xl px-6 py-2 transition-all"
                        >
                            Conoce más
                        </Link>
                        <Link
                            to="/register"
                            className="btn-primary gradient-hover bg-[var(--color-burdeos-dark)] hover:bg-[var(--color-burdeos-light)] text-[var(--color-mostaza-pastel)] rounded-xl px-6 py-2 font-medium transition-all"
                        >
                            Regístrate
                        </Link>
                    </div>
                </div>
            </section>

            
            <section className="py-16 px-6 bg-gradient-to-b from-orange-50 to-yellow-50 text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-10 text-gray-800">
                    Categorías destacadas
                </h2>

                <div className="flex flex-wrap justify-center gap-4">
                    {["Alimentación", "Libros", "Hogar", "Deportes", "Belleza"].map((cat) => (
                        <Link
                            key={cat}
                            to={`/commerce?category=${cat.toLowerCase()}`}
                            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-300 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:from-orange-500 hover:to-yellow-400 transition-transform duration-300 cursor-pointer"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                <div className="mt-10">
                    <Link to="/commerce" className="btn-secondary gradient-hover">
                        Ver todas las categorías
                    </Link>
                </div>
            </section>

            
            <section className="py-16 px-6 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-10 text-gray-800">
                    Comercios destacados
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {featuredCommerces.map((commerce) => (
                        <Link key={commerce._id} to={`/commerce/${commerce._id}`} className="block group">
                            <div className="bg-gradient-to-b from-orange-100/30 to-yellow-100/30 border border-orange-100 rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-[0_8px_25px_rgba(255,165,0,0.4)]">
                                {commerce.image && (
                                    <img
                                        src={commerce.image}
                                        alt={commerce.name}
                                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                                        {commerce.name}
                                    </h3>
                                    <p className="text-gray-700/80 text-sm md:text-base line-clamp-3">
                                        {commerce.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-10">
                    <Link to="/commerce" className="btn-secondary gradient-hover">
                        Ver todos los comercios
                    </Link>
                </div>
            </section>


            <section className="py-16 px-6 bg-gradient-to-b from-orange-50 to-yellow-50 text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-10 text-gray-800">
                    Productos destacados
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-2xl mx-auto">
                    {featuredProducts.map((product) => (
                        <Link key={product._id} to={`/commerce/${product.commerceId}`} className="block group">
                            <div className="bg-gradient-to-b from-orange-100/20 to-yellow-100/20 border border-orange-100 rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-[0_8px_25px_rgba(255,165,0,0.4)] w-full max-w-[350px] md:max-w-[450px]">
                                {product.images?.[0] && (
                                    <div className="w-full flex justify-center bg-white/10">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-36 h-36 md:w-40 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-2xl"
                                        />
                                    </div>
                                )}
                                <div className="p-5">
                                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors break-words">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-700/80 mt-2 font-medium">{product.price.toFixed(2)} €</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-10">
                    <Link to="/commerce" className="btn-secondary gradient-hover">
                        Ver más productos
                    </Link>
                </div>
            </section>


            <section className="py-16 px-6 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-10 text-gray-800">
                    Ubicación de los comercios
                </h2>

                <div className="w-full h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                    <iframe
                        src="https://www.google.com/maps/d/embed?mid=1v-LgmsYezLmRGLzZQu39nVbPfRPoJRs&ehbc=2E312F&noprof=1"
                        className="w-full h-full border-0"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa de comercios"
                    ></iframe>
                </div>
            </section>

            <section className="py-20 px-6 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-6 text-gray-800">
                    Contáctanos
                </h2>
                <p className="text-gray-700/80 mb-10">
                    ¿Tienes preguntas o sugerencias? Escríbenos y te responderemos lo antes posible.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <a href="mailto:contacto@vecimarket.com" className="btn-primary gradient-hover">
                        Enviar correo
                    </a>
                    <Link to="/contact" className="btn-secondary gradient-hover">
                        Ir a la página de contacto
                    </Link>
                </div>
            </section>


            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-[var(--color-mostaza)] text-[var(--color-burdeos-dark)] p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
                >
                    ↑
                </button>
            )}
        </div>
    );
};