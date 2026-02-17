import { forwardRef, useEffect, useRef, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { useTranslate } from "../translations/locales/useTranslate";
import type { UserForm } from "../types/types";

export type EditUserFormProps = {
    form: UserForm;
    setForm: Dispatch<SetStateAction<UserForm>>;
    onSubmit: () => void;
};

export const INITIAL_USER_FORM = {
    username: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
};

export const EditUserForm = forwardRef<HTMLFormElement, EditUserFormProps>(({ form, setForm, onSubmit }, ref) => {
    const firstInputRef = useRef<HTMLInputElement | null>(null);
    const { t } = useTranslate();

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [form]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm(prev => ({ ...prev, [name as keyof UserForm]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };

    const fields: { label: string; name: keyof UserForm; type: string; fullWidth?: boolean }[] = [
        { label: t("form.user.username"), name: "username", type: "text" },
        { label: t("form.user.name"), name: "name", type: "text" },
        { label: t("form.user.firstName"), name: "firstName", type: "text" },
        { label: t("form.user.lastName"), name: "lastName", type: "text" },
        { label: t("form.user.email"), name: "email", type: "email" },
        { label: t("form.user.phoneNumber"), name: "phoneNumber", type: "text" },
        { label: t("form.user.address"), name: "address", type: "text", fullWidth: true }
    ];

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-primary-dark font-sans"
            ref={ref}
        >
            {fields.map((field, index) => (
                <div key={field.name} className={field.fullWidth ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
                    <label className="mb-2 font-semibold text-primary-dark">{field.label}:</label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="border border-primary-light rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                        ref={index === 0 ? firstInputRef : null}
                    />
                </div>
            ))}

            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                <button type="submit"
                    className="px-6 py-2 text-sm rounded-full btn-primary mt-8">
                    {t("components.save")}
                </button>
            </div>
        </form>
    );
});