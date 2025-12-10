import { memo, useMemo } from "react";

export const CommerceHeader = memo(({ commerce }) => {
    const { street, city, phone, email, schedule } = commerce?.address || {};
    const imageSrc = useMemo(() => {
        const img = commerce.image || commerce.images?.[0];
        if (!img) return null;

        return img.startsWith("/")
            ? img
            : `/commerces/${img}`;
    }, [commerce.image, commerce.images]);

    return (
        <div className="flex flex-col bg-white rounded-3xl shadow-lg p-10 border items-center border-primary-light hover:shadow-2xl transition-all duration-300">
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={commerce.name}
                    className="w-full h-44 sm:h-48 md:h-40 lg:h-36 object-cover rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-105"
                />
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">
                {commerce.name}
            </h1>

            <p className="text-primary-dark text-lg leading-relaxed mb-4">
                {commerce.description}
            </p>
            <div>
                {street && <p className="text-primary-dark mb-1"><strong>Calle:</strong> {street}</p>}
                {city && <p className="text-primary-dark mb-1"><strong>Ciudad:</strong> {city}</p>}
                {phone && <p className="text-primary-dark mb-1"><strong>Teléfono:</strong> {phone}</p>}
                {email && <p className="text-primary-dark mb-1"><strong>Email:</strong> {email}</p>}
                {schedule && <p className="text-primary-dark mb-1"><strong>Horario:</strong> {schedule}</p>}
            </div>
        </div>
    );
});
