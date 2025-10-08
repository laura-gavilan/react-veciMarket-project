export const AboutUs = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-violet-50 to-white text-violet-900 flex flex-col items-center px-6 py-20">

            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">
                Quiénes <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-violet-500">Somos</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl text-center mb-16">
                VeciMarket es tu plataforma de comercio local de confianza. Nuestra misión es conectar a los vecinos, apoyar a los comercios locales y fomentar una comunidad más cercana y solidaria. Descubre productos únicos cerca de ti y forma parte de nuestra red.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 w-full max-w-6xl">
                {[
                    { title: "Misión", text: "Apoyar el comercio local y fortalecer la comunidad vecinal mediante una plataforma intuitiva y confiable." },
                    { title: "Visión", text: "Ser la plataforma de referencia para el comercio local, fomentando relaciones duraderas entre vecinos y comercios." },
                    { title: "Valores", text: "Comunidad, confianza, cercanía y apoyo al comercio local son los pilares que guían nuestra labor diaria." }
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                    >
                        <h3 className="font-bold text-2xl mb-4 text-violet-700">{item.title}</h3>
                        <p className="text-gray-600">{item.text}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-violet-500">VeciMarket</span>
            </h2>

            <div className="text-center">
                <p className="text-gray-700 mb-6 text-lg md:text-xl">
                    Únete a nuestra comunidad y descubre todo lo que VeciMarket tiene para ofrecer.
                </p>
                <a
                    href="/register"
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-700 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                >
                    Regístrate ahora
                </a>
            </div>
        </div>
    );
};