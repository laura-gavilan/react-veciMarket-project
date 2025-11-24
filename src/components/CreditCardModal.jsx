import { memo } from "react";

export const CreditCardModal = memo(({ isOpen, onClose, onConfirm, cardNumber, setCardNumber, expiry, setExpiry, cvc, setCvc }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">

                <h3 className="text-xl font-semibold mb-4">Introduce tu tarjeta</h3>

                {/* Número tarjeta */}
                <label className="text-sm font-medium">Número de tarjeta</label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded-lg mb-4"
                />

                {/* Fecha */}
                <label className="text-sm font-medium">Fecha de caducidad</label>
                <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded-lg mb-4"
                />

                {/* CVC */}
                <label className="text-sm font-medium">CVC</label>
                <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="123"
                    className="w-full p-2 border rounded-lg mb-4"
                />

                <div className="flex justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                    >
                        Pagar
                    </button>
                </div>

            </div>
        </div>
    );
});