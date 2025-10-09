import { Link } from "react-router-dom";
import { useCommerce } from "../core/commerce/CommerceContext";
import { useProduct } from "../core/products/ProductContext";

export const Home = () => {
    const { commerces } = useCommerce();
    const { products } = useProduct();

    const featuredCommerces = commerces.slice(0, 5);
    const featuredProducts = products.slice(0, 5);

    return (
        <div className="bg-gray-50 text-gray-900 font-roboto">

            {/* HERO SECTION */}
            <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-10 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-3xl shadow-2xl mt-6 transition-all duration-500">
                {/* Texto */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-poppins font-semibold mb-4 text-gradient bg-clip-text text-transparent from-orange-400 to-yellow-200">
                        VeciMarket
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-md mx-auto md:mx-0 text-gray-700/80">
                        Descubre los mejores productos locales, apoya a tus vecinos y forma parte de una comunidad que crece unida.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                        <Link to="/aboutUs" className="btn-secondary gradient-hover">Ver más</Link>
                        <Link to="/register" className="btn-primary gradient-hover">Regístrate</Link>
                    </div>
                </div>

                {/* Imagen */}
                <div className="flex-1 flex justify-center mt-6 md:mt-0">
                    <img
                        src="/images/main-home.jpg"
                        alt="Productos locales"
                        className="w-full max-w-md rounded-3xl shadow-2xl elevation hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </section>

            {/* CATEGORÍAS */}
            <section className="py-16 px-6 text-center bg-gradient-to-b from-orange-70 to-yellow-70 mt-16 rounded-3xl">
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-10 text-gray-800">
                    Categorías destacadas
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {["Alimentación", "Libros", "Hogar", "Deportes", "Belleza"].map((cat) => (
                        <div
                            key={cat}
                            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-300 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            {cat}
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Link to="/commerce" className="btn-secondary gradient-hover">
                        Ver todas las categorías
                    </Link>
                </div>
            </section>

            {/* COMERCIOS DESTACADOS */}
            <section className="py-16 px-6 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-10 text-gray-800">
                    Comercios destacados
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {featuredCommerces.map((commerce) => (
                        <div
                            key={commerce._id}
                            className="bg-gradient-to-b from-orange-100/20 to-yellow-100/20 border border-orange-100 rounded-3xl shadow-2xl overflow-hidden elevation hover:scale-105 transition-transform duration-500"
                        >
                            {commerce.image && (
                                <img
                                    src={commerce.image}
                                    alt={commerce.name}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                                    {commerce.name}
                                </h3>
                                <p className="text-gray-700/80 text-sm md:text-base">{commerce.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Link to="/commerce" className="btn-secondary gradient-hover">
                        Ver todos los comercios
                    </Link>
                </div>
            </section>

            {/* PRODUCTOS DESTACADOS */}
            <section className="py-16 px-6 bg-gradient-to-b from-orange-50 to-yellow-50 text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-10 text-gray-800">
                    Productos destacados
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-gradient-to-b from-orange-100/20 to-yellow-100/20 border border-orange-100 rounded-3xl shadow-2xl overflow-hidden elevation hover:scale-105 transition-transform duration-500"
                        >
                            {product.images?.[0] && (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-40 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-gray-700/80 mt-1">{product.price} €</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Link to="/commerce" className="btn-secondary gradient-hover">
                        Ver más productos
                    </Link>
                </div>
            </section>

            {/* CONTACTO */}
            <section className="py-20 px-6 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-6 text-gray-800">Contáctanos</h2>
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
        </div>
    );
};
