import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useTranslate } from "../translations/locales/useTranslate";
import type { ProductForm } from "../types/types";

export type EditProductFormProps = {
    form: ProductForm;
    setForm: Dispatch<SetStateAction<ProductForm>>;
    currentImage?: string;
    preview?: string;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (form: ProductForm) => void;
    onCancel: () => void;
};

export const EditProductForm = ({ form, setForm, currentImage, preview, handleFileChange, onSubmit, onCancel }: EditProductFormProps) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(form);
    };

    const { t } = useTranslate();


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {(preview || currentImage) && (
                <div className="text-center">
                    <img
                        src={preview ? preview : currentImage}
                        alt={form.name}
                        className="mx-auto w-40 h-40 object-cover rounded-3xl border border-primary-light shadow-md"
                    />
                </div>
            )}

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">{t("components.new_image")}</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">{t("products.title")}</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("form.product.placeholder_product")}
                    className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">{t("categories.title")}</label>
                <select
                    name="category"
                    value={form.category || "all"}
                    onChange={handleChange}
                    className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                    required
                >
                    <option value="all">{t("categories.all")}</option>
                    <option value="food">{t("categories.food")}</option>
                    <option value="books-paper">{t("categories.books-paper")}</option>
                    <option value="health-beauty">{t("categories.health-beauty")}</option>
                    <option value="sports">{t("categories.sports")}</option>
                    <option value="pets">{t("categories.pets")}</option>
                    <option value="home">{t("categories.home")}</option>
                    <option value="clothing">{t("categories.clothing")}</option>
                    <option value="footwear">{t("categories.footwear")}</option>
                    <option value="other">{t("categories.other")}</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark  mb-2">{t("products.price")} (€)</label>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder={t("form.placeholder_price")}
                    min={0}
                    step={0.01}
                    className="px-4 py-2 text-primary-dark  rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                    required
                />
            </div>

            <div className="flex gap-4 mt-6">
                <button type="submit"
                    className="flex-1 bg-accent-primary text-accent py-3 rounded-2xl font-semibold shadow-md hover:bg-primary-light hover:scale-105 transition-all"
                >
                    {t("components.save")}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-primary-light text-primary-dark py-3  rounded-2xl font-semibold shadow-md hover:bg-primary hover:text-accent transition-all"
                >
                    {t("components.cancel")}
                </button>
            </div>
        </form>
    );
};