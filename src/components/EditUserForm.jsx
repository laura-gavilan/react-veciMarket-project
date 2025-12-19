import { forwardRef, useEffect, useRef } from "react";

export const EditUserForm = forwardRef(({ form, setForm, onSubmit }, ref) => {
    const firstInputRef = useRef(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [form]);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-primary-dark font-sans"
            ref={ref}
        >
            {[
                { label: t("form.user.username"), name: "username", type: "text" },
                { label: t("form.user.name"), name: "name", type: "text" },
                { label: t("form.user.firstName"), name: "firstName", type: "text" },
                { label: t("form.user.lastName"), name: "lastName", type: "text" },
                { label: t("form.user.email"), name: "email", type: "email" },
                { label: t("form.user.phoneNumber"), name: "phoneNumber", type: "text" },
                { label: t("form.user.address"), name: "address", type: "text", fullWidth: true }
            ].map((field, index) => (
                <div key={field.name} className={field.fullWidth ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
                    <label className="mb-2 font-semibold text-primary-dark">{field.label}:</label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="border border-primary-lightrounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
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