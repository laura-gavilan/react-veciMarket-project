import { useNavigate } from "react-router-dom"

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="self-start px-6 py-2 bg-primary text-accent-primary-light rounded-full shadow-md hover:bg-primary-light hover:scale-105 transition-all font-semibold"
        >
            ← Volver
        </button>
    )
}