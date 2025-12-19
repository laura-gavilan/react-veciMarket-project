import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";
import { EditCommerceForm } from "../components/EditCommerceForm";
import { useRef } from "react";
import { useTranslate } from "../translations/locales/useTranslate";


const EditCommercePage = () => {
    const { commerceId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [toast, setToast] = useState(null);
    const formRef = useRef(null);
    const { t } = useTranslate();


    const showToast = useCallback((message, duration = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    },[]);


    useEffect(() => {
        const fetchCommerce = async () => {
            try {
                const { data } = await api.get(`/commerces/${commerceId}`);
                setForm({
                    name: data.name || "",
                    category: data.category || "all",
                    description: data.description || "",
                    address: data.address || { street: "", city: "", phone: "", email: "", schedule: "" },
                });
            } catch (error) {
                console.error("Error al cargar el comercio:", error);
                navigate("/");
            }
        };
        fetchCommerce();
    }, [commerceId]);



    const handleSubmit = useCallback(async (form) => {
        try {
            await api.patch(`/commerces/${commerceId}`, form);
            showToast(t("toast.update_commerce"));
            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error actualizando comercio:", error);
            showToast(t("toast.error_update_commerce"));
        }
        formRef.current.focusFirst();
    });

    return (
        <div className="min-h-screen flex justify-center px-6 py-12 bg-gray-warm">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-primary-light p-8 flex flex-col gap-8">
                <button
                    onClick={() => navigate(-1)}
                    className="self-start px-6 py-2 bg-primary-dark text-accent rounded-full shadow-md hover:bg-primary-light hover:scale-105 transition-all font-semibold"
                >
                    {t("components.back_button")}
                </button>

                <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
                    {t("commerces.edit_commerce")}
                </h1>

                {form && (
                    <EditCommerceForm
                        onSubmit={handleSubmit}
                        form={form}
                        setForm={setForm}
                        ref={formRef}
                    />
                )}

                {!form && (
                    <p className="text-center text-gray-500">{t("commerces.loading")}.</p>
                )}

            </div>

            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </div>
    );
};

export default EditCommercePage;
