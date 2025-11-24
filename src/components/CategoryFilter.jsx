import { memo, useMemo } from "react";

export const CategoryFilter = memo(({
    categories,
    categoryName,
    selectedCategory,
    setSelectedCategory,
    showProducts,
    setShowProducts,
}) => {

    const categoryButtons = useMemo(() => {
        return categories.map(category => (
            <button
                key={category}
                onClick={() => {
                    setSelectedCategory(category);
                    setShowProducts(true);
                }}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                    ? "bg-accent-primary text-primary-dark shadow-md scale-105"
                    : "bg-white text-primary-dark border border-primary-dark hover:bg-accent-light hover:scale-105"
                    }`}
            >
                {categoryName[category]}
            </button>
        ));
    }, [categories, selectedCategory, categoryName, setSelectedCategory, setShowProducts]);

    return (
        <div className="w-full mb-10 flex flex-wrap gap-3 justify-center">
            {categoryButtons}

            {showProducts && (
                <button
                    onClick={() => setShowProducts(false)}
                    className="px-5 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                >
                    Ocultar todos
                </button>
            )}
        </div>
    );
});