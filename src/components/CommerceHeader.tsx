import { memo, useMemo } from "react";
import { useTranslate } from "../translations/locales/useTranslate";
import type { Commerce } from "../types/types";

export type CommerceHeaderType = {
    commerce: Commerce;
};

export const CommerceHeader = memo<CommerceHeaderType>(({ commerce }) => {
    const { street, city, phone, email, schedule } = commerce?.address || {};
    const  { t} = useTranslate();
    
    const imageSrc = useMemo(() => {
        const img = commerce.image || commerce.images?.[0];
        if (!img) return null;

        return img.startsWith("/")
            ? img
            : `/commerces/${img}`;
    }, [commerce.image, commerce.images?.length]);

    return (
        <div className="group flex flex-col bg-white rounded-3xl shadow-lg p-10 border items-center border-primary-light hover:shadow-2xl transition-all duration-300">
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={commerce.name}
                    className="w-full h-44 sm:h-48 md:h-40 lg:h-36 object-cover rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-105"
                />
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">
                {t("commerces.name", { commerce: commerce.name })}
            </h1>

            <p className="text-primary-dark text-lg leading-relaxed mb-4">
                {t("commerces.description", { description: commerce.description })}
            </p>
            <div>
                {street && <p className="text-primary-dark mb-1"><strong>{t("commerces.location.street")}:</strong> {street}</p>}
                {city && <p className="text-primary-dark mb-1"><strong>{t("commerces.location.city")}:</strong> {city}</p>}
                {phone && <p className="text-primary-dark mb-1"><strong>{t("commerces.location.phone")}:</strong> {phone}</p>}
                {email && <p className="text-primary-dark mb-1"><strong>{t("commerces.location.email")}:</strong> {email}</p>}
                {schedule && <p className="text-primary-dark mb-1"><strong>{t("commerces.location.schedule")}:</strong> {schedule}</p>}
            </div>
        </div>
    );
});
