import { useState} from "react"
import { useTranslate } from "../translations/locales/useTranslate";
import type {  CommerceForm } from "../types/types";

export type CreateCommerceFormProps = {
    form: CommerceForm;
    setForm: React.Dispatch<React.SetStateAction<CommerceForm>>;
    onSubmit: (form: CommerceForm) => void | Promise<void>;
};


export const INITIAL_COMMERCE_FORM = {
        name: "",
        category: "all",
        description: "",
        image: "",
        address: { street: "", city: "", phone: "", email: "", schedule: "" }
    };

export const CreateCommerceForm = ({ onSubmit }: CreateCommerceFormProps) => {
    const { t } = useTranslate();
    const [form, setForm] = useState<CommerceForm>(INITIAL_COMMERCE_FORM);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (name.includes("address.")) {
            const addressField = name.split(".")[1];
            setForm({
                ...form,
                address: { ...form.address, [addressField]: value },
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="flex flex-col">
                <label className="font-semibold text-primary mb-2">{t("components.name")}</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2"
                />
            </div>

            <div>
                <label className="font-semibold text-primary-dark mb-2">{t("components.description")}</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="w-full border rounded p-2 h-24"
                />
            </div>

            <div>
                <label className="font-semibold text-primary-dark mb-2">{t("components.url")}</label>
                <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="/images/commerces/shoes.jpg"
                    className="w-full border rounded p-2"
                />
            </div>

            <fieldset className="border p-3 rounded">
                <legend className="font-semibold">{t("pages.contact.location.address")}</legend>

                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        name="address.street"
                        placeholder={t("form.placeholder_street")}
                        value={form.address.street}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                    <input
                        type="text"
                        name="address.city"
                        placeholder={t("form.placeholder_city")}
                        value={form.address.city}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                    <input
                        type="text"
                        name="address.phone"
                        placeholder={t("form.placeholder_phone")}
                        value={form.address.phone}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                    <input
                        type="email"
                        name="address.email"
                        placeholder={t("form.placeholder_email")}
                        value={form.address.email}
                        onChange={handleChange}
                        className="border rounded p-2"
                    />
                    <input
                        type="text"
                        name="address.schedule"
                        placeholder={t("form.placeholder_schedule")}
                        value={form.address.schedule}
                        onChange={handleChange}
                        className="col-span-2 border rounded p-2"
                    />
                </div>
            </fieldset>

            <button
                type="submit"
                className="px-4 py-2 bg-accent-primary text-primary-dark rounded-2xl font-semibold shadow-md hover:bg-primary-light hover:text-accent transition-all"
            >
                {t("commerces.create_commerce")}
            </button>
        </form>
    );
};