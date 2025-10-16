export const Contact = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-16 text-[var(--color-burdeos-darker)]">

            <h1 className="text-4xl md:text-5xl font-title font-semibold mb-6 text-center text-[var(--color-burdeos-dark)]">
                Contáctanos
            </h1>

            <p className="text-center mb-12 max-w-2xl text-lg md:text-xl text-[var(--color-burdeos-darker)]">
                ¿Tienes alguna duda o sugerencia? Escríbenos y nos pondremos en contacto contigo lo antes posible.
            </p>

            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)] p-8 transition-all">
                <form className="flex flex-col gap-6">

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-[var(--color-burdeos-dark)]" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Tu nombre"
                            className="w-full px-5 py-3 border rounded-3xl border-[var(--color-burdeos-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] placeholder:text-[var(--color-burdeos-light)] placeholder:italic transition-all"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-[var(--color-burdeos-dark)]" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="tu@email.com"
                            className="w-full px-5 py-3 border rounded-3xl border-[var(--color-burdeos-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] placeholder:text-[var(--color-burdeos-light)] placeholder:italic transition-all"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-[var(--color-burdeos-dark)]" htmlFor="message">
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            placeholder="Escribe tu mensaje..."
                            rows="5"
                            className="w-full px-5 py-3 border rounded-3xl border-[var(--color-burdeos-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] placeholder:text-[var(--color-burdeos-light)] placeholder:italic transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-8 py-3 font-semibold rounded-3xl shadow-md bg-[var(--color-mostaza)] text-[var(--color-burdeos-dark)] transition-all hover:bg-gradient-to-r hover:from-[var(--color-mostaza)] hover:via-[var(--color-mostaza-pastel)] hover:to-[var(--color-burdeos-light)] hover:text-white transform hover:scale-105"
                    >
                        Enviar
                    </button>
                </form>

                <div className="mt-10 text-center space-y-3 text-[var(--color-burdeos-darker)]">
                    <p><span className="font-semibold">Teléfono:</span> +34 123 456 789</p>
                    <p><span className="font-semibold">Email:</span> contacto@vecimarket.com</p>
                    <p><span className="font-semibold">Dirección:</span> Calle Desconozco 123, Madrid, España</p>
                </div>
            </div>
        </div>
    );
};
