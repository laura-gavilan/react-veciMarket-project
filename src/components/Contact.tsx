import { useTranslate } from "../translations/locales/useTranslate";

export const Contact = () => {
    const { t } = useTranslate();
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-16 text-primary-dark">

            <h1 className="text-4xl md:text-5xl font-title font-semibold mb-6 text-center text-primary">
                {t("pages.contact.title")}
            </h1>

            <p className="text-center mb-8 max-w-2xl text-lg md:text-xl text-primary-dark">
                {t("pages.contact.questions")}
            </p>

            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-primary-light p-8 transition-all">
                <form className="flex flex-col gap-6">

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-primary" htmlFor="name">
                            {t("pages.contact.form.name")}
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder={t("pages.contact.form.placeholder_name")}
                            className="w-full px-4 py-2 border rounded-2xl border-primary-light focus:outline-none focus:ring-2 focus:ring-accent-primary placeholder:text-primary-light placeholder:italic transition-all"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-[var(--color-burdeos-dark)]" htmlFor="email">
                            {t("pages.contact.form.email")}
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder={t("pages.contact.form.placeholder_email")}
                            className="w-full px-4 py-2 border rounded-2xl border-primary-light focus:outline-none focus:ring-2 focus:ring-accent-primary placeholder:text-primary-light placeholder:italic transition-all"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-primary" htmlFor="message">
                            {t("pages.contact.form.message")}
                        </label>
                        <textarea
                            id="message"
                            placeholder={t("pages.contact.form.placeholder_message")}
                            rows={5}
                            className="w-full px-4 py-2 border rounded-2xl border-primary-light focus:outline-none focus:ring-2 focus:ring-accent-primary placeholder:text-primary-light placeholder:italic transition-all"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm rounded-full btn-primary mt-4"
                        >
                            {t("pages.contact.form.send")}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center space-y-2 text-primary-dark">
                    <p><span className="font-semibold">{t("pages.contact.contact.phone")}</span> +34 123 456 789</p>
                    <p><span className="font-semibold">{t("pages.contact.contact.email")}</span> contacto@vecimarket.com</p>
                    <p><span className="font-semibold">{t("pages.contact.contact.location")}</span> Calle Desconozco 123, Madrid, España</p>
                </div>
            </div>
        </div>
    );
};
