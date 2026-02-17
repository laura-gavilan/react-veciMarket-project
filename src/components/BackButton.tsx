import { useNavigate } from "react-router-dom"
import { useTranslate } from "../translations/locales/useTranslate";

export const BackButton = () => {
    const navigate = useNavigate();
    const {t} = useTranslate();

    const handleOnClick = (): void => {
        navigate(-1)
    };

    return (
        <button
            onClick={handleOnClick}
            className="self-start px-6 py-2 bg-primary text-accent-primary-light rounded-full shadow-md hover:bg-primary-light hover:scale-105 transition-all font-semibold"
        >
            {(t("components.back_button"))}
            
        </button>
    )
};