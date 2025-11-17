import { useState } from "react"

export const SearchBar = () => {
    const [search, setSearch] = useState();

    return (
        <div className="mb-8 w-full md:w-1/2 relative">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full px-5 py-3 rounded-full border border-primary-dark bg-white text-primary-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all duration-300"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-dark transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>
    )
}