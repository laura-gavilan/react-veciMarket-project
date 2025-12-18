import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";
import translationES from "./locales/es.json";
// import translationFR from "./locales/fr.json";



i18n
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["es", "en"],
        resources: {
            es: { translation: translationES },
            en: { translation: translationEN },
            // fr: { translation: translationFR },
            // zh: { translation: translationChinese },
        },
        fallbackLng: "es",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;