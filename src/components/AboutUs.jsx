export const AboutUs = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-general text-[var(--color-burdeos-darker)] flex flex-col items-center px-6 py-20">

            {/* Título principal */}
            <h1 className="text-3xl md:text-5xl font-title font-semibold mb-6 text-center">
                Quiénes{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-mostaza)] to-[var(--color-burdeos-dark)]">
                    Somos
                </span>
            </h1>

            {/* Descripción */}
            <p className="text-base md:text-lg max-w-3xl text-center mb-16">
                VeciMarket es tu plataforma de comercio local de confianza. Nuestra misión es conectar a los vecinos, apoyar a los comercios locales y fomentar una comunidad más cercana y solidaria. Descubre productos únicos cerca de ti y forma parte de nuestra red.
            </p>

            {/* Tarjetas de Misión, Visión, Valores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 w-full max-w-6xl">
                {[
                    { title: "Misión", text: "Apoyar el comercio local y fortalecer la comunidad vecinal mediante una plataforma intuitiva y confiable." },
                    { title: "Visión", text: "Ser la plataforma de referencia para el comercio local, fomentando relaciones duraderas entre vecinos y comercios." },
                    { title: "Valores", text: "Comunidad, confianza, cercanía y apoyo al comercio local son los pilares que guían nuestra labor diaria." }
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="p-8 bg-[var(--color-gray-warm)] rounded-3xl shadow-lg elevation text-center transition-all"
                    >
                        <h3 className="font-title font-semibold text-2xl mb-4 text-[var(--color-burdeos-dark)]">{item.title}</h3>
                        <p className="text-[var(--color-burdeos-darker)]">{item.text}</p>
                    </div>
                ))}
            </div>

            {/* Subtítulo VeciMarket con gradiente */}
            <h2 className="text-3xl md:text-5xl font-title font-semibold tracking-wide mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-burdeos-dark)] to-[var(--color-mostaza-pastel)]">
                    VeciMarket
                </span>
            </h2>

            {/* Call to Action */}
            <div className="text-center">
                <p className="text-[var(--color-burdeos-darker)] mb-6 text-base md:text-lg">
                    Únete a nuestra comunidad y descubre todo lo que VeciMarket tiene para ofrecer.
                </p>
                <a
                    href="/register"
                    className="btn-primary"
                >
                    Regístrate ahora
                </a>
            </div>
        </div>
    );
};