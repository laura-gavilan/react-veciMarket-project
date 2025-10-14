import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";

export const EditProductPage = () => {
    const { commerceId, productId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        category: "all",
        description: "",
        price: "",
    });

    const [currentImage, setCurrentImage] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [commerceProducts, setCommerceProducts] = useState([]);

    // Cargar el comercio y producto desde API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener productos del comercio
                const { data: commerce } = await api.get(`/commerces/${commerceId}`);
                setCommerceProducts(commerce.products || []);

                // Buscar el producto
                const product = commerce.products.find(p => p._id === productId);
                if (product) {
                    setForm({
                        name: product.name,
                        category: product.category || "all",
                        price: product.price.toString(),
                    });
                    setCurrentImage(product.images?.[0] || "");
                } else {
                    alert("Producto no encontrado");
                    navigate(-1);
                }
            } catch (error) {
                console.error("Error al cargar producto:", error);
                alert("No se pudo cargar el producto");
                navigate(-1);
            }
        };
        fetchData();
    }, [commerceId, productId, navigate]);

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
            payload.append("category", form.category);
            payload.append("price", priceValue);

            if (newImage) payload.append("image", newImage);

            await api.patch(`/products/${productId}`, payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Producto actualizado correctamente");
            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("No se pudo actualizar el producto.");
        }
    };

    return (
        <div className="flex justify-center mt-12">
            <div className="card-form max-w-3xl w-full p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <button onClick={() => navigate(-1)} className="btn-secondary self-start">
                    ← Volver
                </button>
                
                <h1 className="text-h3 font-title font-semibold text-[var(--color-burdeos-dark)] mb-8 text-center">
                    Editar Producto
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {(preview || currentImage) && (
                        <div className="mb-4 text-center">
                            <img
                                src={preview || currentImage}
                                alt={form.name}
                                className="mx-auto w-40 h-40 object-cover rounded-3xl border border-[var(--color-burdeos-light)] shadow-md"
                            />
                        </div>
                    )}

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

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[var(--color-burdeos-dark)] mb-2">
                            Categoría
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="input-field border border-gray-300 rounded-md focus:border-[var(--color-burdeos-dark)] focus:ring focus:ring-[var(--color-burdeos-light)] transition-all"
                            required
                        >
                            <option value="all">Todas</option>
                            <option value="food">Alimentación</option>
                            <option value="books-paper">Libros & Papelería</option>
                            <option value="health-beauty">Salud & Belleza</option>
                            <option value="sports">Deportes</option>
                            <option value="pets">Animales</option>
                            <option value="home">Hogar</option>
                            <option value="other">Otras</option>
                        </select>
                    </div>

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
