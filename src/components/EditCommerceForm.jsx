import { forwardRef, useImperativeHandle, useRef } from "react";

export const EditCommerceForm = forwardRef(({ form, setForm, onSubmit }, ref) => {
    const firstInputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setForm({
                name: "",
                category: "all",
                description: "",
                address: { street: "", city: "", phone: "", email: "", schedule: "" }
            });
        },
        focusFirst: () => firstInputRef.current.focus()
    }));

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name in form.address) {
            setForm((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-1">Categoría</label>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="px-4 py-2  border border-primary-light rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                    required
                >
                    <option value="all">Todas</option>
                    <option value="food">Alimentación</option>
                    <option value="books-paper">Libros & Papelería</option>
                    <option value="health-beauty">Salud & Belleza</option>
                    <option value="sports">Deportes</option>
                    <option value="pets">Animales</option>
                    <option value="home">Hogar</option>
                    <option value="clothing">Ropa</option>
                    <option value="footwear">Calzado</option>
                    <option value="other">Otras</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-1">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nombre del comercio"
                    className="px-4 py-2 border border-primary-lightrounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                    ref={firstInputRef}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-1">Descripción</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Descripción breve del comercio"
                    rows={4}
                    className="px-4 py-2 border border-primary-lightrounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                    required
                />
            </div>

            <div>
                <label className="font-semibold text-primary-dark mb-2">URL de Imagen</label>
                <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="/images/commerces/shoes.jpg"
                    className="w-full border rounded p-2"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label className="font-semibold text-primary-dark mb-1">Calle</label>
                    <input
                        type="text"
                        name="street"
                        value={form.address.street}
                        onChange={handleChange}
                        placeholder="Calle"
                        className="px-4 py-2 bborder border-primary-light rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold text-primary-dark mb-1">Ciudad</label>
                    <input
                        type="text"
                        name="city"
                        value={form.address.city}
                        onChange={handleChange}
                        placeholder="Ciudad"
                        className="px-4 py-2 border border-primary-light rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-1">Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    value={form.address.phone}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    className="px-4 py-2 border border-primary-light rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.address.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    className="px-4 py-2 border border-primary-lightrounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-1">Horario</label>
                <input
                    type="text"
                    name="schedule"
                    value={form.address.schedule}
                    onChange={handleChange}
                    placeholder="Horario de apertura"
                    className="px-4 py-2 border border-primary-light rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)]"
                />
            </div>

            <button
                type="submit"
                className="mt-4 w-full bg-primary-dark text-accent py-3 rounded-2xl font-semibold shadow-md hover:bg-primary-light hover:scale-105 transition-all"
            >
                Guardar cambios
            </button>
        </form>
    );
});