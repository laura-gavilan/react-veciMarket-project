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

    const [currentImage, setCurrentImage] = useState(""); // Imagen actual del producto
    const [newImage, setNewImage] = useState(null); // Nuevo archivo seleccionado
    const [preview, setPreview] = useState(""); // Preview de la nueva imagen

    // Cargar datos del producto al montar
    useEffect(() => {
        const product = selectedCommerce?.products.find((p) => p._id === productId);
        if (product) {
            setForm({
                name: product.name,
                description: product.description,
                price: product.price.toString(), // Guardamos como string para evitar NaN
            });
            setCurrentImage(product.images?.[0] || "");
        }
    }, [selectedCommerce, productId]);

    // Manejar cambios en inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "price" ? value : value,
        }));
    };

    // Preview de archivo seleccionado
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Enviar formulario
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

            if (newImage) {
                payload.append("image", newImage);
            }

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
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100 flex items-center justify-center p-6">
            <div className="bg-white/90 backdrop-blur-md border border-violet-100 shadow-xl rounded-3xl p-10 w-full max-w-lg transition-all duration-300 hover:shadow-violet-200">
                <h1 className="text-3xl font-bold text-violet-800 mb-8 text-center">
                    Editar Producto
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Imagen actual o preview */}
                    {(preview || currentImage) && (
                        <div className="mb-4 text-center">
                            <img
                                src={preview || currentImage}
                                alt={form.name}
                                className="mx-auto w-40 h-40 object-cover rounded-lg border"
                            />
                        </div>
                    )}

                    {/* Input para subir nueva imagen */}
                    <div>
                        <label className="block text-sm font-semibold text-violet-700 mb-2">
                            Subir nueva imagen
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 outline-none transition-all"
                        />
                    </div>

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-semibold text-violet-700 mb-2">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej. Pan integral"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-semibold text-violet-700 mb-2">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe el producto..."
                            rows="4"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 outline-none transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-sm font-semibold text-violet-700 mb-2">
                            Precio (€)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Ej. 2.50"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 outline-none transition-all"
                            min={0}
                            step={0.01}
                            required
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-violet-700 hover:bg-violet-800 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all duration-300"
                        >
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-xl shadow-md transition-all duration-300"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};