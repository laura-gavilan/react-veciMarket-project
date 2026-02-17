import { useNavigate } from 'react-router-dom';
import { useAuth } from '../core/auth/useAuth';
import { useCommerce } from '../core/commerce/CommerceContext';
import { useCallback, useState } from 'react';
import { CreateCommerceForm } from '../components/CreateCommerceForm';
import { useTranslate } from '../translations/locales/useTranslate';
import type { Commerce, CommerceForm } from '../types/types';



export const INITIAL_CREATE_COMMERCE_FORM: CommerceForm = {
    name: "",
    category: "",
    description: "",
    address: {
        street: "",
        city: "",
        phone: "",
        email: "",
        schedule: "",
    }
};

const CreateCommercePage = () => {
    const { addCommerce } = useCommerce();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [toast, setToast] = useState<string | null>(null);
    const [form, setForm] = useState<CommerceForm>(INITIAL_CREATE_COMMERCE_FORM);
    const { t } = useTranslate();

    const showToast = useCallback((message: string, duration: number = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);

    const handleSubmit = useCallback(async  (form: CommerceForm) => {
        if (!user?._id) {
            showToast("Debes iniciar sesión para crear un comercio");
            return;
        };

        try {
            const newCommerce = {
                ...form,
                ownerUserId: user?._id,
                slug: form.name.toLowerCase().replace(/\s+/g, "-"),
            } as Commerce;

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
                    {t("commerces.create_commerce")}
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

export default CreateCommercePage;



