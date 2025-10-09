import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../core/http/axios";

export const EditProductPage = () => {
    const { productId } = useParams();
    const { selectedCommerce, refreshCommerce } = useOutletContext();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
    });

    const [currentImage, setCurrentImage] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        const product = selectedCommerce?.products.find((p) => p._id === productId);
        if (product) {
            setForm({
                name: product.name,
                description: product.description,
                price: product.price.toString(),
            });
            setCurrentImage(product.images?.[0] || "");
        }
    }, [selectedCommerce, productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const priceValue = parseFloat(form.price);
        if (isNaN(priceValue) || priceValue < 0) {
            alert("Introduce un precio válido");
            return;
        }

        try {
            const payload = new FormData();
            payload.append("name", form.name);
            payload.append("description", form.description);
            payload.append("price", priceValue);

            if (newImage) payload.append("image", newImage);

            await api.patch(`/products/${productId}`, payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (refreshCommerce) await refreshCommerce();
            navigate(-1);
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("No se pudo actualizar el producto.");
        }
    };

    return (
        <div className="min-h-screen bg-general flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-10 max-w-lg w-full shadow-lg elevation">
                <h1 className="text-h3 font-title font-semibold text-[var(--color-burdeos-dark)] mb-8 text-center">
                    Editar Producto
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Imagen actual / preview */}
                    {(preview || currentImage) && (
                        <div className="mb-4 text-center">
                            <img
                                src={preview || currentImage}
                                alt={form.name}
                                className="mx-auto w-40 h-40 object-cover rounded-3xl border border-[var(--color-burdeos-light)] shadow-md"
                            />
                        </div>
                    )}

                    {/* Subir nueva imagen */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Subir nueva imagen
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-5 py-3 rounded-3xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] outline-none transition-all"
                        />
                    </div>

                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej. Pan integral"
                            className="w-full px-5 py-3 rounded-3xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe el producto..."
                            rows="4"
                            className="w-full px-5 py-3 rounded-3xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] outline-none transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Precio */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Precio (€)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Ej. 2.50"
                            className="w-full px-5 py-3 rounded-3xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-mostaza)] focus:border-[var(--color-mostaza)] outline-none transition-all"
                            min={0}
                            step={0.01}
                            required
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 mt-6">
                        <button type="submit" className="btn-primary flex-1">
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn-secondary flex-1"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
