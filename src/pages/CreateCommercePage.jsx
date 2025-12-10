import { useNavigate } from 'react-router-dom';
import { useAuth } from '../core/auth/useAuth';
import { useCommerce } from './../core/commerce/CommerceContext';
import { useCallback, useState } from 'react';
import { CreateCommerceForm } from '../components/CreateCommerceForm';


export const CreateCommercePage = () => {
    const { addCommerce } = useCommerce();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const [form, setForm] = useState({ name: "", category: "", description: "" });

    const showToast = useCallback((message, duration = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        try {
            const newCommerce = {
                ...form,
                ownerUserId: user?._id,
            };

            await addCommerce(newCommerce);
            navigate("/commerce");
        } catch (error) {
            console.error("Error al crear comercio:", error);
            showToast("No se pudo crear el comercio. Revisa los datos.");
        }
    }, [form, user, addCommerce, navigate, showToast]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-warm p-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-primary-light p-10 flex flex-col gap-8">
                <h1 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-6">
                    Crear Comercio
                </h1>

                <CreateCommerceForm
                    onSubmit={handleSubmit}
                    form={form}
                    setForm={setForm}
                />
            </div>

            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </div>
    );
};




