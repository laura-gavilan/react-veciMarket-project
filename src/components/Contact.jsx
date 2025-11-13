export const Contact = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-16 text-primary-dark">

            <h1 className="text-4xl md:text-5xl font-title font-semibold mb-6 text-center text-primary">
                Contáctanos
            </h1>

            <p className="text-center mb-8 max-w-2xl text-lg md:text-xl text-primary-dark">
                ¿Tienes alguna duda o sugerencia? Escríbenos y nos pondremos en contacto contigo lo antes posible.
            </p>

            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-primary-light p-8 transition-all">
                <form className="flex flex-col gap-6">

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-primary" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Tu nombre"
                            className="w-full px-4 py-2 border rounded-2xl border-primary-light focus:outline-none focus:ring-2 focus:ring-accent-primary placeholder:text-primary-light placeholder:italic transition-all"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-[var(--color-burdeos-dark)]" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="tu@email.com"
                            className="w-full px-4 py-2 border rounded-2xl border-primary-light focus:outline-none focus:ring-2 focus:ring-accent-primary placeholder:text-primary-light placeholder:italic transition-all"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-primary" htmlFor="message">
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            placeholder="Escribe tu mensaje..."
                            rows="5"
                            className="w-full px-4 py-2 border rounded-2xl border-primary-light focus:outline-none focus:ring-2 focus:ring-accent-primary placeholder:text-primary-light placeholder:italic transition-all"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm rounded-full btn-primary mt-4"
                        >
                            Enviar
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center space-y-2 text-primary-dark">
                    <p><span className="font-semibold">Teléfono:</span> +34 123 456 789</p>
                    <p><span className="font-semibold">Email:</span> contacto@vecimarket.com</p>
                    <p><span className="font-semibold">Dirección:</span> Calle Desconozco 123, Madrid, España</p>
                </div>
            </div>
        </div>
    );
};
