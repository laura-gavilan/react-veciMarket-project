import { useTranslation } from "react-i18next";


export const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const languages = Object.keys(i18n.options.resources);

    const languagesMap = {
        es: "Español",
        en: "English",
    }; 

    return (
        <select
            value={i18n.language}
            onChange={(event) => i18n.changeLanguage(event.target.value)}
            className="px-3 py-2 border rounded"
        >
            {languages.map((language) => (
                <option key={language} value={language}>
                    {languagesMap?.[language] || "Idioma"}
                </option>
            ))}
        </select>
    );
};