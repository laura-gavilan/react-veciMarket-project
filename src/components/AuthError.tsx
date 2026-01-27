import type { AuthErrorProps} from "../types/types";

export const AuthError = ({ error, onRetry, onClear }: AuthErrorProps)=> {
    if (!error) return null;

    return (
        <div
            className="bg-error-50 border border-error-200"
            style={{
                borderRadius: "var(--radius-default)",
                padding: "var(--spacing-md)",
                margin: "var(--spacing-md)",
            }}
        >
            <div className="flex items-start">

                {/* Icono */}
                <div className="flex-shrink-0">
                    <svg
                        className="text-error-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{ width: 20, height: 20 }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                {/* Contenido */}
                <div style={{ marginLeft: "var(--spacing-sm)" }}>

                    {/* Título */}
                    <div
                        className="text-error-700 font-semibold"
                        style={{ marginBottom: "var(--spacing-xs)", fontSize: "0.9rem" }}
                    >
                        Error de autenticación
                    </div>

                    {/* Mensaje */}
                    <div
                        className="text-error-600"
                        style={{ marginBottom: "var(--spacing-md)", fontSize: "0.85rem" }}
                    >
                        {error}
                    </div>

                    {/* Acciones */}
                    <div className="flex" style={{ gap: "var(--spacing-sm)" }}>
                        {onRetry && (
                            <button
                                onClick={onRetry}
                                className="border border-error-300 text-error-700 px-3 py-1 rounded-md text-sm hover:bg-error-100 transition"
                            >
                                Reintentar
                            </button>
                        )}

                        {onClear && (
                            <button
                                onClick={onClear}
                                className="border border-error-300 text-error-700 px-3 py-1 rounded-md text-sm hover:bg-error-100 transition"
                            >
                                Cerrar
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};
