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
        <div className="font-sans">

            <section className="relative max-w-auto mx-auto px-6 py-30 shadow-2xl overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-right bg-no-repeat"
                    style={{ backgroundImage: "url('/images/food.jpg')" }}
                />

                <div className="relative z-10 max-w-lg ml-auto text-white space-y-4">
                    <h1 className="text-5xl md:text-6xl font-title font-semibold drop-shadow-lg">
                        VeciMarket
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-burdeos-dark)] drop-shadow">
                        Descubre los mejores productos y locales de tu barrio.
                    </p>

                    <p className="text-md md:text-lg text-white/90 drop-shadow">
                        Apoya el comercio local y encuentra ofertas exclusivas en tu zona. ¡Todo lo que necesitas, cerca de ti!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-end">
                        <Link
                            to="/aboutUs"
                            className="btn-secondary bg-white/20 hover:bg-white/30 text-white border border-white rounded-xl px-6 py-2 transition-all"
                        >
                            Conoce más
                        </Link>
                        <Link
                            to="/register"
                            className="btn-primary bg-[var(--color-burdeos-dark)] hover:bg-[var(--color-burdeos-light)] text-[var(--color-mostaza)] rounded-xl px-6 py-2 font-medium transition-all"
                        >
                            Regístrate
                        </Link>
                    </div>
                </div>
            </section>


            <section className="py-16 px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-title font-semibold mb-10 text-[var(--color-burdeos-dark)]">
                    Categorías destacadas
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {["Alimentación", "Libros", "Hogar", "Deportes", "Belleza"].map(cat => (
                        <Link
                            key={cat}
                            to={`/commerce?category=${cat.toLowerCase()}`}
                            className="px-6 py-3 bg-[var(--color-mostaza)] text-[var(--color-burdeos-dark)] font-semibold rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
                <div className="mt-10">
                    <Link to="/commerce" className="btn-secondary">
                        Ver todas las categorías
                    </Link>
                </div>
            </section>


            <section className="py-16 px-6 max-auto mx-auto bg-[var(--color-gray-warm)]">
                <h2 className="text-3xl md:text-4xl font-title font-semibold mb-10 text-[var(--color-burdeos-dark)] text-center">
                    Comercios destacados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {featuredCommerces.map(commerce => (
                        <Link key={commerce._id} to={`/commerce/${commerce._id}`} className="block group">
                            <div className="bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)] overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
                                {commerce.image && (
                                    <img
                                        src={commerce.image}
                                        alt={commerce.name}
                                        className="w-full h-44 object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                                <div className="p-5 text-center">
                                    <h3 className="text-lg md:text-xl font-title font-semibold text-[var(--color-burdeos-dark)] mb-2">
                                        {commerce.name}
                                    </h3>
                                    <p className="text-[var(--color-burdeos-darker)] text-sm line-clamp-3">
                                        {commerce.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link to="/commerce" className="btn-secondary">
                        Ver todos los comercios
                    </Link>
                </div>
            </section>


            <section className="py-16 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-title font-semibold mb-10 text-[var(--color-burdeos-dark)] text-center">
                    Productos destacados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {featuredProducts.map(product => (
                        <Link key={product._id} to={`/commerce/${product.commerceId}`} className="block group">
                            <div className="bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)] overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
                                {product.images?.[0] && (
                                    <div className="w-full flex justify-center bg-white/10">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="p-5 text-center">
                                    <h3 className="text-lg md:text-xl font-title font-semibold text-[var(--color-burdeos-dark)] mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-[var(--color-burdeos-darker)] mt-1 font-medium">
                                        {product.price.toFixed(2)} €
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link to="/commerce" className="btn-secondary">
                        Ver más productos
                    </Link>
                </div>
            </section>


            <section className="py-16 px-6 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-title font-semibold mb-6 text-[var(--color-burdeos-dark)]">
                    Ubicación de los comercios
                </h2>
                <div className="w-full h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
                    <iframe
                        src="https://www.google.com/maps/d/embed?mid=1v-LgmsYezLmRGLzZQu39nVbPfRPoJRs&ehbc=2E312F&noprof=1"
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa de comercios"
                    />
                </div>
            </section>


            <section className="py-20 px-6 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-title font-semibold mb-6 text-[var(--color-burdeos-dark)]">
                    Contáctanos
                </h2>
                <p className="text-[var(--color-burdeos-darker)] mb-10">
                    ¿Tienes preguntas o sugerencias? Escríbenos y te responderemos lo antes posible.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <a href="mailto:contacto@vecimarket.com" className="btn-primary">
                        Enviar correo
                    </a>
                    <Link to="/contact" className="btn-secondary">
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
