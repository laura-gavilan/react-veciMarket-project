import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";
import { useProduct } from "../core/products/ProductContext";

export const EditProductPage = () => {
    const { commerceId, productId } = useParams();
    const navigate = useNavigate();
    const { updateProduct } = useProduct();


    const [form, setForm] = useState({
        name: "",
        category: "all",
        description: "",
        price: "",
        image:"",
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: commerce } = await api.get(`/commerces/${commerceId}`);
                const product = commerce.products.find(p => p._id === productId);
                if (product) {
                    setForm({
                        name: product.name,
                        category: product.category || "all",
                        description: product.description || "",
                        price: product.price.toString(),
                        image: product.image || "",
                    });
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
        setForm(prev => ({ ...prev, [name]: value }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const priceValue = parseFloat(form.price);
        if (isNaN(priceValue) || priceValue < 0) {
            alert("Introduce un precio válido");
            return;
        }

        try {
            const updatedProduct = {
                _id: productId,
                name: form.name,
                category: form.category,
                price: priceValue,
                description: form.description,
                image: form.image,
                commerceId,
            };
            updateProduct(productId, updatedProduct);

            alert("Producto actualizado correctamente");
            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-gray-warm)] p-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)] p-10 flex flex-col gap-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-burdeos-dark)] text-center mb-6">
                    Editar Producto
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-2">Subir nueva imagen</label>
                        <input
                            type="text"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="/products/shoes.jpg"
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition"
                        />

                        {form.image && (
                            <div className="mt-4 flex justify-center">
                                <img 
                                src={form.image}
                                alt="Vista previa del producto"
                                className="max-h-40 rounded-2xl shadow-md border-[var(--color-burdeos-light] object-contain"
                                onError={(e) => (e.target.style.display = "none")}/>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-2">Nombre del producto</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej. Pan integral"
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-2">Categoría</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
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
                        <label className="font-semibold text-[var(--color-burdeos-dark)] mb-2">Precio (€)</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Ej. 2.50"
                            min={0}
                            step={0.01}
                            className="px-4 py-2 border border-[var(--color-burdeos-light)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-burdeos-dark)] transition"
                            required
                        />
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button type="submit" className="flex-1 bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] py-3 rounded-2xl font-semibold shadow-md hover:bg-[var(--color-burdeos-light)] hover:scale-105 transition-all">
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-[var(--color-burdeos-light)] text-[var(--color-burdeos-dark)] py-3 rounded-2xl font-semibold shadow-md hover:bg-[var(--color-burdeos-dark)] hover:text-[var(--color-mostaza-pastel)] transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

