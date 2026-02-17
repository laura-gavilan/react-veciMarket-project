import { memo, useCallback, useMemo } from "react";


export interface CategoryFilterProps {
    categories: string[];
    categoryName: Record<string, string>;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    showProducts: boolean;
    setShowProducts: React.Dispatch<React.SetStateAction<boolean>>;
};


export const CategoryFilter = memo(({ categories, categoryName, selectedCategory, setSelectedCategory, showProducts, setShowProducts}: CategoryFilterProps) => {

    const handleSelectedCategory = useCallback((category: string) => {
        setSelectedCategory(category);
        setShowProducts(true);
    }, [setSelectedCategory, setShowProducts]);

    const handleHideProducts = useCallback(() => {
        setShowProducts(false);
    }, [setShowProducts]);

    const categoryButtons = useMemo(() => {
        return categories.map(category => (
            <button
                key={category}
                onClick={() => { handleSelectedCategory(category) }}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                    ? "bg-accent-primary text-primary-dark shadow-md scale-105"
                    : "bg-white text-primary-dark border border-primary-dark hover:bg-accent-light hover:scale-105"
                    }`}
            >
                {categoryName[category]}
            </button>
        ));
    }, [categories, selectedCategory, categoryName, handleSelectedCategory]);

    return (
        <div className="w-full mb-10 flex flex-wrap gap-3 justify-center">
            {categoryButtons}

            {showProducts && (
                <button
                    onClick={handleHideProducts}
                    className="px-5 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                >
                    Ocultar todos
                </button>
            )}
        </div>
    );
});