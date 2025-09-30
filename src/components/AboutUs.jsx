export const AboutUs = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50 text-violet-900 flex flex-col items-center px-6 py-16">

            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-center">
                Quiénes <span className="text-violet-700">Somos</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl text-center mb-10">
                VeciMarket es tu plataforma de comercio local de confianza.
                Nuestra misión es conectar a los vecinos, apoyar a los comercios locales y fomentar una comunidad más cercana y solidaria.
                Descubre productos únicos cerca de ti y forma parte de nuestra red.
            </p>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
                <div className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow duration-300">
                    <h3 className="font-bold text-xl mb-2">Misión</h3>
                    <p className="text-gray-600">
                        Apoyar el comercio local y fortalecer la comunidad vecinal mediante una plataforma intuitiva y confiable.
                    </p>
                </div>
                <div className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow duration-300">
                    <h3 className="font-bold text-xl mb-2">Visión</h3>
                    <p className="text-gray-600">
                        Ser la plataforma de referencia para el comercio local, fomentando relaciones duraderas entre vecinos y comercios.
                    </p>
                </div>
                <div className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow duration-300">
                    <h3 className="font-bold text-xl mb-2">Valores</h3>
                    <p className="text-gray-600">
                        Comunidad, confianza, cercanía y apoyo al comercio local son los pilares que guían nuestra labor diaria.
                    </p>
                </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-6">
                <span className="text-violet-700">VeciMarket</span>
            </h1>

            
            <div className="text-center">
                <p className="text-gray-700 mb-4">
                    Únete a nuestra comunidad y descubre todo lo que VeciMarket tiene para ofrecer.
                </p>
                <a
                    href="/register"
                    className="px-6 py-3 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-600 transition-all duration-300 shadow-md"
                >
                    Regístrate ahora
                </a>
            </div>
        </div>
    );
};