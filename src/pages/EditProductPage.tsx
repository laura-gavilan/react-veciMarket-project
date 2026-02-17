import { useState, useEffect, useCallback, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../core/http/axios";
import { useProduct } from "../core/products/ProductContext";
import { EditProductForm } from "../components/EditProductForm";
import type { ProductForm } from "../types/types";
import type { Product } from "../components/ProductCard";
import type { CategoryKey } from "../components/Category";

export const INITIAL_EDIT_PRODUCT_FORM: ProductForm = {
    name: "",
    category: ["all"],
    description: "",
    price: "",
    releaseDate: "",
    images: [],
};

const EditProductPage = () => {
    const { commerceId, productId } = useParams<{ commerceId: string, productId: string }>();
    const navigate = useNavigate();
    const { updateProduct } = useProduct();
    const [currentImage, setCurrentImage] = useState<string>("");
    const [newImage, setNewImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [form, setForm] = useState<ProductForm>(INITIAL_EDIT_PRODUCT_FORM);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = useCallback((message: string, duration: number = 3000) => {
        setToast(message);
        setTimeout(() => setToast(null), duration);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: commerce } = await api.get<{ products: Product[] }>(`/commerces/${commerceId}`);
                const product: Product | undefined = commerce.products.find(product => product._id === productId);
                if (product) {
                    setForm({
                        name: product.name,
                        category: product.category ? [product.category as CategoryKey] : ["all"],
                        description: product.description || "",
                        price: product.price.toString(),
                        releaseDate: "",
                        images: product.images || [],
                    });
                    setCurrentImage(product.images?.[0] || "");
                } else {
                    showToast("Producto no encontrado");
                    navigate(-1);
                }
            } catch (error) {
                console.error("Error al cargar producto:", error);
                showToast("No se pudo cargar el producto");
                navigate(-1);
            }
        };
        fetchData();
    }, [commerceId, productId, navigate, showToast]);


    const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0]
        console.log("Archivo seleccionado:", file);
        setNewImage(file);

        const previewUrl = URL.createObjectURL(file);
        console.log("Preview URL:", previewUrl);
        setPreview(previewUrl);
    }, []);

    const handleSubmit = useCallback(async (form: ProductForm) => {
        const priceValue = typeof form.price === "string" ? parseFloat(form.price) : form.price;
        if (isNaN(priceValue) || priceValue < 0) {
            showToast("Introduce un precio válido");
            return;
        }

        try {
            const payload = new FormData();
            payload.append("name", form.name);
            payload.append("category", form.category[0]);
            payload.append("price", priceValue.toString());
            payload.append("description", form.description);
            if (newImage) payload.append("image", newImage);

            const { data: updatedProductFromApi } = await api.patch(`/products/${productId}`, payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (updatedProductFromApi.images?.[0]) {
                setCurrentImage(updatedProductFromApi.images[0]);
                setPreview("");
            };

            if (!productId) {
                showToast("Producto no válido");
                return;
            }
            // Actualizamos el contexto/local state
            updateProduct(productId, {
                _id: productId,
                name: form.name,
                category: form.category[0],
                price: priceValue,
                description: form.description,
                images: updatedProductFromApi.images || [currentImage],
                commerceId,
            });


            showToast("Producto actualizado correctamente");
            navigate(`/admin/commerce/${commerceId}`);
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    }, [form, updateProduct, commerceId, showToast, productId, currentImage, newImage, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-warm p-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-primary-light p-10 flex flex-col gap-8">
                <h1 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-6">
                    Editar Producto
                </h1>

                {form && (
                    <EditProductForm
                        form={form}
                        setForm={setForm}
                        currentImage={currentImage}
                        preview={preview}
                        handleFileChange={handleFileChange}
                        onSubmit={handleSubmit}
                        onCancel={() => navigate(-1)}
                    />
                )}
            </div>


            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-dark text-white px-4 py-2 rounded shadow-lg z-50 text-sm">
                    {toast}
                </div>
            )}
        </div>
    );
};

export default EditProductPage;

