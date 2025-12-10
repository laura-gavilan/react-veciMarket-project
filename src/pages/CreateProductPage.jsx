import { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";
import { CreateProductForm } from "../components/CreateProductForm";

const CreateProductPage = () => {
    const { commerceId } = useParams();
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState(null);

    const showToast = useCallback((message, duration = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);


    const handleSubmit = useCallback(async (form) => {
        setErrors(null);

        try {
            const payload = {
                ...form,
                price: parseFloat(form.price),
                releaseDate: new Date(form.releaseDate).toISOString(),
                commerceId,
            };

            await api.post("/products", payload);

            showToast("Producto creado correctamente");
            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error creando producto:", error);

            if (error.response?.data?.invalidFields) {
                setErrors(error.response.data.invalidFields);
            } else {
                setErrors([{ message: "No se pudo crear el producto" }]);
                navigate("/");
            }
        }
    }, [showToast, navigate, commerceId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-warm p-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-primary-light p-10 flex flex-col gap-5">
                <button
                    onClick={() => navigate(-1)}
                    className="self-start px-6 py-2 bg-primary-dark text-accent rounded-full shadow-md hover:bg-primary-light hover:scale-105 transition-all font-semibold"
                >
                    ← Volver
                </button>

                <h1 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-5">
                    Crear Nuevo Producto
                </h1>

                {errors && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                        {errors.map((error, index) => (
                            <p key={index}>{error.message}</p>
                        ))}
                    </div>
                )}

                <CreateProductForm onSubmit={handleSubmit} />
            </div>

            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </div >
    );
};

export default CreateProductPage;