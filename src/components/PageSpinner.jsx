export const PageSpinner = ({
    message = "Cargando...",
    size = "xl",
    color = "primary",
    className = "",
    fullPage = false,
    containerClassName = "",
}) => {
    const baseContainerClasses = "flex items-center justify-center";

    const containerClasses = fullPage
        ? `${baseContainerClasses} min-h-screen ${containerClassName}`
        : `${baseContainerClasses} py-12 ${containerClassName}`;

    // Mapemos tamaños del spinner
    const sizeClasses = {
        sm: "h-5 w-5",
        md: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
    };

    const colorClasses = {
        primary: "text-blue-500",
        secondary: "text-gray-500",
        danger: "text-red-500",
        success: "text-green-500",
    };

    return (
        <div className={containerClasses}>
            <div className="text-center flex flex-col items-center">

                {/* Spinner */}
                <div
                    className={`
                        animate-spin rounded-full border-4 border-current border-t-transparent 
                        ${sizeClasses[size] || sizeClasses["xl"]} 
                        ${colorClasses[color] || colorClasses["primary"]} 
                        ${className}
                    `}
                />

                {/* Mensaje opcional */}
                {message && (
                    <p className="text-muted mt-4 text-sm font-medium">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

