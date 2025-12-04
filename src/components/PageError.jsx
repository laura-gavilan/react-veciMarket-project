import { memo, useMemo } from "react";

export const PageError = memo(
    ({
        title = "Error al cargar los datos",
        message,
        icon = "⚠️",
        onRetry,
        retryText = "Reintentar",
        className = "",
        containerClassName = "",
        fullPage = false,
    }) => {
        const containerClasses = useMemo(() => {
            const baseContainerClasses = "flex items-center justify-center bg-background";
            return fullPage
                ? `${baseContainerClasses} min-h-screen px-6 ${containerClassName}`
                : `${baseContainerClasses} py-16 px-6 ${containerClassName}`;
        }, [fullPage, containerClassName]);

        return (
            <div className={containerClasses}>
                <div
                    className={`
                        flex flex-col items-center text-center p-10 rounded-2xl shadow-xl 
                        bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-700
                        max-w-lg w-full ${className}
                    `}
                >
                    <div className="text-6xl mb-4 text-red-500">
                        {icon}
                    </div>


                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        {onRetry && (
                            <button variant="danger" onClick={onRetry} className="w-full">
                                {retryText}
                            </button>
                        )}

                        <button 
                            variant="tertiary" 
                            className="w-full" 
                            onClick={() => (window.location.href = "/")}
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);
