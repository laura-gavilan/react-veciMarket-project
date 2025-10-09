export const Contact = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-16 bg-general text-[var(--color-burdeos-darker)]">

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-title font-semibold mb-6 text-center">
                Contáctanos
            </h1>

            {/* Descripción */}
            <p className="text-center mb-10 max-w-xl text-[var(--color-burdeos-dark)] text-lg md:text-xl">
                ¿Tienes alguna duda o sugerencia? Escríbenos y nos pondremos en contacto contigo lo antes posible.
            </p>

            {/* Formulario */}
            <div className="w-full max-w-2xl bg-[var(--color-gray-warm)] shadow-lg rounded-3xl p-8 elevation transition-all">
                <form className="flex flex-col gap-4">

                    <div>
                        <label className="block font-semibold mb-1 text-[var(--color-burdeos-dark)]" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Tu nombre"
                            className="w-full px-4 py-2 border rounded-lg border-[var(--color-burdeos-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] placeholder:text-[var(--color-burdeos-light)] placeholder:italic transition-all"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1 text-[var(--color-burdeos-dark)]" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="tu@email.com"
                            className="w-full px-4 py-2 border rounded-lg border-[var(--color-burdeos-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] placeholder:text-[var(--color-burdeos-light)] placeholder:italic transition-all"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1 text-[var(--color-burdeos-dark)]" htmlFor="message">
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            placeholder="Escribe tu mensaje..."
                            rows="5"
                            className="w-full px-4 py-2 border rounded-lg border-[var(--color-burdeos-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] placeholder:text-[var(--color-burdeos-light)] placeholder:italic transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-8 py-3 font-semibold rounded-full shadow-md bg-[var(--color-mostaza)] text-[var(--color-burdeos-dark)] transition-all hover:bg-gradient-to-r hover:from-[var(--color-mostaza)] hover:via-[var(--color-mostaza-pastel)] hover:to-[var(--color-burdeos-light)] hover:text-white transform hover:scale-105"
                    >
                        Enviar
                    </button>
                </form>

                {/* Información de contacto */}
                <div className="mt-8 text-center space-y-2 text-[var(--color-burdeos-darker)]">
                    <p><span className="font-semibold">Teléfono:</span> +34 123 456 789</p>
                    <p><span className="font-semibold">Email:</span> contacto@vecimarket.com</p>
                    <p><span className="font-semibold">Dirección:</span> Calle Desconozco 123, Madrid, España</p>
                </div>
            </div>
        </div>
    );
};