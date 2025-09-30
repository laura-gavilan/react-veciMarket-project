export const Contact = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-16 bg-white text-violet-900">
            <h1 className="text-4xl font-bold mb-6 text-center">Contáctanos</h1>
            <p className="text-center text-gray-600 mb-10 max-w-xl">
                ¿Tienes alguna duda o sugerencia? Escríbenos y nos pondremos en contacto contigo lo antes posible.
            </p>

            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Tu nombre"
                            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-700"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="tu@email.com"
                            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-700"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            placeholder="Escribe tu mensaje..."
                            rows="5"
                            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-700"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-6 py-3 bg-violet-700 text-white font-semibold rounded-full hover:bg-violet-600 transition-all duration-300 shadow-md"
                    >
                        Enviar
                    </button>
                </form>

                
                <div className="mt-8 text-gray-700 space-y-2 text-center">
                    <p><span className="font-semibold">Teléfono:</span> +34 123 456 789</p>
                    <p><span className="font-semibold">Email:</span> contacto@vecimarket.com</p>
                    <p><span className="font-semibold">Dirección:</span> Calle Desconozco 123, Madrid, España</p>
                </div>
            </div>
        </div>
    );
};