
export const EditProductForm = ({ form, setForm, currentImage, preview, handleFileChange, onSubmit, onCancel }) => {

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };


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
                <label className="font-semibold text-primary-dark mb-2">Subir nueva imagen</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">Nombre del producto</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ej. Pan integral"
                    className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold text-primary-dark mb-2">Categoría</label>
                <select
                    name="category"
                    value={form.category || "all"}
                    onChange={handleChange}
                    className="px-4 py-2 border border-primary-light rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
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
                <label className="font-semibold text-primary-dark  mb-2">Precio (€)</label>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Ej. 2.50"
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
                    Guardar Cambios
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-primary-light text-primary-dark py-3  rounded-2xl font-semibold shadow-md hover:bg-primary hover:text-accent transition-all"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};