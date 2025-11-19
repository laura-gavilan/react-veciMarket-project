export const ProductCardInfo = ({ product, isOwner, commerceId, navigate, handleDelete }) => {
    if (!product) return null;

    let imageSrc = null;

    if (product.images?.[0]) {
        const img = product.images[0];

        imageSrc = (img.startsWith("http") || img.startsWith("/products/"))
            ? img
            : `/products/${img}`;
    }



    return (
        <div
            key={product._id}
            className="group bg-neutral-warm rounded-3xl shadow-md border border-primary-light overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
        >
            {imageSrc && (
                <div className="w-full h-48 overflow-hidden rounded-t-3xl">
                    <img
                        src={imageSrc}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h3 className="text-lg font-semibold text-primary truncate">
                        {product.name}
                    </h3>

                    <p className="text-primary-dark font-bold mt-1 text-base">
                        {product.price.toFixed(2)} €
                    </p>
                </div>

                {isOwner && (
                    <div className="flex gap-3 mt-3 justify-center">
                        <button
                            onClick={() => navigate(`/admin/commerce/${commerceId}/edit/${product._id}`)}
                            className="px-3 py-1 text-sm rounded-lg btn-primary hover:scale-105 transition-transform"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDelete(product._id)}
                            className="text-sm text-red-600 hover:underline"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
