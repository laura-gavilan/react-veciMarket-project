export const CommerceHeader = ({ commerce }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-10 border border-primary-light hover:shadow-2xl transition-all duration-300">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">
                {commerce.name}
            </h1>

            <p className="text-primary-dark text-lg leading-relaxed mb-8">
                {commerce.description}
            </p>
        </div>
    )
};