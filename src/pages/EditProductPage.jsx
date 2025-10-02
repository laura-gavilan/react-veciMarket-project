import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";
import { getTokenFromLocalStorage } from "../core/auth/auth.service";
import { AuthContext } from "../contexts/AuthContext";

export const EditProductPage = () => {
    const { commerceId, productId } = useParams(); // productId puede ser undefined
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        releaseDate: "",
        category: "all",
    });
    const [loading, setLoading] = useState(false);

    // Cargar producto si productId existe
    useEffect(() => {
        if (!productId) return; // crear, no editar

        setLoading(true);
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${productId}`);
                setForm({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    releaseDate: data.releaseDate.split("T")[0],
                    category: data.category[0] || "all",
                });
            } catch (error) {
                console.error("Error al cargar producto:", error.response?.data || error);
                alert("Error al cargar el producto");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Debes iniciar sesión");

        try {
            const token = getTokenFromLocalStorage();
            const payload = {
                name: form.name,
                description: form.description,
                price: parseFloat(form.price),
                releaseDate: new Date(form.releaseDate).toISOString(),
                category: [form.category],
                commerceId,
            };

            if (productId) {
                // EDITAR
                await api.patch(`/products/${productId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Producto actualizado");
            } else {
                // CREAR
                await api.post(`/products`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Producto creado");
            }

            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error al guardar producto:", error.response?.data || error);
            alert("Error al guardar el producto");
        }
    };

    if (loading) return <p className="text-center mt-6">Cargando producto...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
                {productId ? "Editar Producto" : "Crear Producto"}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2 rounded resize-none"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={form.price}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="date"
                    name="releaseDate"
                    value={form.releaseDate}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                >
                    <option value="all">All</option>
                    <option value="food">Food</option>
                    <option value="books-paper">Books & Paper</option>
                    <option value="health-beauty">Health & Beauty</option>
                    <option value="sports">Sports</option>
                    <option value="pets">Pets</option>
                    <option value="home">Home</option>
                    <option value="other">Other</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
                >
                    {productId ? "Actualizar" : "Crear"}
                </button>
            </form>
        </div>
    );
};