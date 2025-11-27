import { memo, useCallback } from "react";

export const CartItems = memo(({ item, updateItem, removeItem }) => {

    const decrease = useCallback(() => {
        if (item.productId?._id) {
            updateItem(item.productId._id, item.qty - 1);
        }
    }, [item, updateItem]);

    const increase = useCallback(() => {
        if (item.productId?._id) {
            updateItem(item.productId._id, item.qty + 1)
        };
    }, [item, updateItem]);

    const handleRemove = useCallback(() => {
        if (item.productId?._id) {
            removeItem(item.productId._id)
        };
    }, [item, removeItem]);


    return (
        <div div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-3xl p-4" >
            <div className="flex items-center gap-4">
                <img
                    src={item.productId?.images?.[0]}
                    alt={item.productId?.name}
                    className="w-24 h-24 object-cover rounded-xl"
                />
                <div>
                    <h3 className="text-lg font-semibold text-primary-dark">
                        {item.productId?.name}
                    </h3>
                    <p className="text-primary-dark">
                        {item.productId?.description || "Sin descripción"}
                    </p>
                    <p className="font-bold mt-1 text-primary-dark">
                        Precio: {(item.priceSnapshot ?? item.productId?.price ?? 0).toFixed(2)} €
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1 rounded-lg"
                        onClick={decrease}
                        disabled={item.qty <= 1 || !item.productId?._id}
                    >
                        -
                    </button>
                    <span className="text-lg font-semibold">{item.qty}</span>
                    <button
                        className="px-3 py-1 rounded-lg"
                        onClick={increase}
                        disabled={!item.productId?._id}
                    >
                        +
                    </button>
                </div>

                <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={handleRemove}
                    disabled={!item.productId?._id}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
});