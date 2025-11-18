
export const EditUserForm = ({ form, setForm, onSubmit}) => {

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-primary-dark font-sans">
            {[
                { label: "Nombre de usuario", name: "username", type: "text" },
                { label: "Nombre", name: "name", type: "text" },
                { label: "Primer Apellido", name: "firstName", type: "text" },
                { label: "Segundo Apellido", name: "lastName", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Teléfono", name: "phoneNumber", type: "text" },
                { label: "Dirección", name: "address", type: "text", fullWidth: true }
            ].map((field) => (
                <div key={field.name} className={field.fullWidth ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
                    <label className="mb-2 font-semibold text-primary-dark">{field.label}:</label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="border border-primary-lightrounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                    />
                </div>
            ))}

            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                <button type="submit"
                    className="px-6 py-2 text-sm rounded-full btn-primary mt-8"
                >Guardar Cambios
                </button>
            </div>
        </form>
    );
}