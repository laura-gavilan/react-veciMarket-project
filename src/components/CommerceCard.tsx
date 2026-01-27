import { memo, useMemo } from "react";
import { useTranslate } from "../translations/locales/useTranslate";
import type { CommerceProps, SlugProps } from "../types/types";



export const CommerceCard = memo<CommerceProps>(({ commerce, onClick }) => {
    const { t } = useTranslate();

    const slugToKey: SlugProps = {
        "suelas": "suelas",
        "sabores-del-barrio": "neighborhood_flavors",
        "tinta-y-papel": "ink_and_paper",
        "rizos": "curls_studio",
        "sportzone": "sport_zone",
        "decoracasa": "decor_home",
        "petworld": "pet_world",
        "electro-hogar": "home_appliances",
        "panaderia-el-trigo-dorado": "golden_wheat_bakery"
    };

    const normalizedSlug = commerce.slug.trim().toLowerCase();
    const translationKey = slugToKey[normalizedSlug];

    const imageSrc = useMemo(() => {
        const img = commerce.image || commerce.images?.[0];
        if (!img) return null;

        return img.startsWith("/")
            ? img
            : `/commerces/${img}`;
    }, [commerce.image, commerce.images]);

    return (
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
                {translationKey ? t(`commerces.commerce_names.${translationKey}`) : commerce.name}
            </h2>
            <p className="text-lg sm:text-xl font-title font-semibold text-primary-dark text-center mt-2 leading-snug">
                {translationKey ? t(`commerces.commerce_descriptions.${translationKey}`) : commerce.description}
            </p>

        </div>

    );
});