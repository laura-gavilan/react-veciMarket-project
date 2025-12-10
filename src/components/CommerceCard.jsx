import { memo, useMemo } from "react";
// import { ErrorBoundary } from "./ErrorBoundary";
// import { PageError } from "./PageError";

export const CommerceCard = memo(({ commerce, onClick }) => {

    const imageSrc = useMemo(() => {
        const img = commerce.image || commerce.images?.[0];
        if (!img) return null;

        return img.startsWith("/")
            ? img
            : `/commerces/${img}`;
    }, [commerce.image, commerce.images]);

    return (
        // <ErrorBoundary
        //     fallback={
        //         <PageError
        //             title="Error al cargar el comercio."
        //             message="No se ha podido cargar el comercio. Por favor, recargue la página."
        //             onRetry={() => window.location.reload()}
        //         />
        //     }>

            <div
                className="group bg-white rounded-3xl shadow-xl p-6 border border-primary-light overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                onClick={onClick}
            >
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt={commerce.name}
                        className="w-full h-44 sm:h-48 md:h-40 lg:h-36 object-cover rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-105"
                    />
                )}
                <h2 className="text-lg sm:text-xl font-title font-semibold text-primary-dark text-center mt-2 leading-snug">
                    {commerce.name}
                </h2>
                <p className="text-lg sm:text-xl font-title font-semibold text-primary-dark text-center mt-2 leading-snug">
                    {commerce.description}
                </p>

            </div>
        // </ErrorBoundary>
    );
});