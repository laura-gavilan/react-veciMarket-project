import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";
import translationES from "./locales/es.json";
import translationHI from "./locales/hi.json";



i18n
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["es", "en", "hi"],
        resources: {
            es: { translation: translationES },
            en: { translation: translationEN },
            hi: { translation: translationHI },
        },
        fallbackLng: "es",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;