import { useState } from "react";
import { useTranslate } from "../translations/locales/useTranslate";
import type { ProductForm } from "../types/types";
import type { CategoryKey } from "./Category";

export type CreateProductFormProps = {
    onSubmit: (form: ProductForm) => void;
};

export const INITIAL_PRODUCT_FORM: ProductForm = {
    name: "",
    description: "",
    price: 0,
    category: ["all"],
    releaseDate: "",
    images: [],
};

export const CreateProductForm = ({ onSubmit }: CreateProductFormProps) => {
    const { t } = useTranslate();
    const [form, setForm] = useState<ProductForm>(INITIAL_PRODUCT_FORM);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        if (name === "category") {
            setForm(prev => ({ ...prev, category: [value as CategoryKey] }));
        } else if (name === "price") {
            setForm(prev => ({ ...prev, price: Number(value) }));
        } else {
            setForm(prev => ({ ...prev, [name as keyof ProductForm]: value }));
        }
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">{t("products.title")}</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ej. Pan integral"
                    className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-dark transition"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">{t("components.description")}</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder={t("form.product.placeholder_description")}
                    rows={4}
                    className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-dark transition resize-none"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">{t("products.price")}(€)</label>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder={t("form.placeholder_price")}
                    step={0.01}
                    min={0}
                    className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">{t("form.date")}</label>
                <input
                    type="date"
                    name="releaseDate"
                    value={form.releaseDate}
                    onChange={handleChange}
                    className="px-4 py-2 border border-primary-lightrounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">{t("categories.title")}</label>
                <select
                    name="category"
                    value={form.category[0]}
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

            <button
                type="submit"
                className="mt-4 w-full bg-primary-light text-accent py-3 rounded-2xl font-semibold shadow-md hover:bg-primary-light hover:scale-105 transition-all"
            >
                {t("products.create_product")}
            </button>
        </form>
    );
};