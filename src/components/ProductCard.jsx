import { CartButton } from "./CartButton";
import { FavoriteButton } from "./FavoriteButton";

export const ProductCard = ({ product, commerce, onClick }) => {
    let imageSrc = null;

    if (product.images?.[0]) {
        const img = product.images[0];
        if (img.startsWith("http") || img.startsWith("/products/")) {
            imageSrc = img;
        } else {
            imageSrc = `/products/${img}`;
        }
    }
    return (
        <div
            className="group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer p-5 flex flex-col justify-between text-center hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 h-full"
            onClick={onClick}
        >
            {imageSrc && (
                <div className="w-full h-44 overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            <h3 className="text-lg md:text-xl font-title font-semibold text-primary-dark mt-2">
                {product.name}
            </h3>
            <p className="text-primary-dark mt-1 font-medium">{product.price} €</p>
            {commerce && (
                <p className="text-gray-500 text-sm mt-1 truncate">Comercio: {commerce.name}</p>
            )}

            <FavoriteButton product={product} />
            <div className="flex justify-center">
                <CartButton product={product} small />
            </div>
        </div>
    );
}