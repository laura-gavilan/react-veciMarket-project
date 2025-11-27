import { useCallback, useState } from "react"

export const SearchBar = ( { onSearch }) => {
    const [search, setSearch] = useState("");

    const handleInputChange = useCallback((event)=> {
        const value = event.target.value;
        setSearch(value);
        onSearch?.(value);
    }, [onSearch]);

    const handleClear = useCallback(() => {
        setSearch("");
        onSearch?.("");
    }, [onSearch]);

    return (
        <div className="mb-8 w-full md:w-1/2 relative">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-full border border-primary-dark bg-white text-primary-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all duration-300"
                />
                {search && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-dark transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>
    )
};