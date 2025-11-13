import { CartButton } from "./CartButton";
import { useNavigate } from "react-router-dom";

export const ProductModal = ({ product, commerce, onClose }) => {
    const navigate = useNavigate();

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-3xl p-6 w-11/12 max-w-lg relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                    ✕
                </button>

                <div className="w-full h-64 mb-4 overflow-hidden rounded-xl">
                    {product.images?.[0] && (
                        <img
                            src={product.images[0].startsWith("/") ? product.images[0] : `/products/${product.images[0]}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                <h2 className="text-2xl font-semibold text-primary-dark mb-2">{product.name}</h2>
                <p className="text-lg font-medium text-primary-dark mb-4">{product.price} €</p>


                <div className="flex gap-4 mb-4">
                    <CartButton product={product} />
                    {commerce && (
                        <button
                            onClick={() => navigate(`/commerce/${commerce._id}`)}
                            className="px-4 py-2 rounded-xl bg-[var(--color-mostaza)] text-[var(--color-burdeos-dark)] font-semibold hover:bg-yellow-400 transition"
                        >
                            Ir al comercio
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
