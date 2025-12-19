import { useState } from "react";
import { useTranslation } from "react-i18next";


export const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const languages = Object.keys(i18n.options.resources);
    const [open, setOpen] = useState(false);

    const languagesMap = {
        es: "ES",
        en: "EN",
        hi: "HI"
    };

    const flags = {
        es: "/images/flag-es.png",
        en: "/images/flag-en.png",
        hi: "/images/flag-hi.svg"
    };

    const handleChange = (lang) => {
        i18n.changeLanguage(lang);
        setOpen(false);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="px-2 py-1 border rounded flex items-center gap-2 bg-white"
            >
                {languagesMap[i18n.language]}
                <img
                    src={flags[i18n.language]}
                    alt={i18n.language}
                    className="w-4 h-4"
                />

            </button>

            {open && (
                <div className="absolute mt-1 border rounded bg-white shadow-md z-10">
                    {languages.map((lang) => (
                        <div
                            key={lang}
                            onClick={() => handleChange(lang)}
                            className="px-3 py-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {languagesMap[lang]}
                            <img
                                src={flags[lang]}
                                alt={lang}
                                className="w-4 h-4"
                            />

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};