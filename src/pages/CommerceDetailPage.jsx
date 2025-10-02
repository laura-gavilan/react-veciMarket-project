import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CommerceContext } from "../contexts/CommerceContext";

export const CommerceDetailPage = () => {
    const { commerces } = useContext(CommerceContext);
    const params = useParams();

    // Buscamos el comercio de manera segura
    const selectedCommerce = commerces?.find(c => c._id === params.commerceId);

    if (!selectedCommerce) {
        return (
            <div className="p-4">
                <h1>No se encuentra el comercio</h1>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1>{selectedCommerce.name}</h1>
            <p>{selectedCommerce.description}</p>

            <h2 className="mt-6">Productos</h2>
            {selectedCommerce.products?.length > 0 ? (
                <ul className="list-disc list-inside">
                    {selectedCommerce.products.map(product => (
                        <li key={product._id}>
                            <strong>{product.name}</strong> - {product.price}€
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos disponibles</p>
            )}
        </div>
    );
};
