import { useTranslate } from "../translations/locales/useTranslate";

export const AboutUs = () => {
    const { t } = useTranslate();

    return (
        <div className="min-h-[calc(100vh-80px)] text-primary-dark flex flex-col items-center px-6 py-20">

            <h1 className="text-xl md:text-5xl font-title font-semibold mb-6 text-center">
                {t("pages.about.title")}
    
            </h1>

            <p className="text-base md:text-lg max-w-3xl text-center mb-16">
                {t("pages.about.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 w-full max-w-6xl">
                {[
                    { title: t("pages.about.mission.title"), text: t("pages.about.mission.text")},
                    { title: t("pages.about.vision.title"), text: t("pages.about.vision.text")  },
                    { title: t("pages.about.values.title"), text:t("pages.about.values.text") }
                ].map((item, index) => (
                    <div
                        key={index}
                        className="p-8 bg-general rounded-3xl shadow-lg elevation text-center transition-all"
                    >
                        <h3 className="font-title font-semibold text-2xl mb-4 text-primary">{item.title}</h3>
                        <p className="text-primary-dark">{item.text}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-3xl md:text-5xl font-title font-semibold tracking-wide mb-6 text-center">
                <span className="text-primary-dark text-3xl md:text-5xl font-title font-semibold mb-6 text-center">
                    VeciMarket
                </span>
            </h2>

            <div className="text-center">
                <p className="text-primary-dark mb-6 text-base md:text-lg">
                    {t("pages.about.community")}
                </p>
                <a
                    href="/register"
                    className="btn-primary"
                >
                    {t("pages.about.register")}
                </a>
            </div>
        </div>
    );
};