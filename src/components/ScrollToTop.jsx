import { useEffect, useState } from "react";

export const ScrollToTop = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);


    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    if (!showScrollTop) return null;

    return (
        <>
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-[var(--color-mostaza)] text-primary-dark p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
                    title="Volver arriba"
                >
                    ↑
                </button>
            )}
        </>
    );
};