import { useContext, useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import { CommerceContext } from "../core/commerce/CommerceContext";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../core/http/axios";
import { FavoriteButton } from "../components/FavoriteButton";
import { CartButton } from "../components/CartButton";
// import { CartButton } from "../components/CartButton";


export const CommerceDetailPage = () => {
    const { commerces, loading } = useContext(CommerceContext);
    const { user } = useContext(AuthContext);
    const { commerceId } = useParams();
    const [selectedCommerce, setSelectedCommerce] = useState(null);
    const navigate = useNavigate();

    const refreshCommerce = async () => {
        try {
            const { data } = await api.get(`/commerces/${commerceId}`);
            setSelectedCommerce(data);
        } catch (error) {
            console.error("Error cargando el comercio:", error);
        }
    };

    useEffect(() => {
        if (!commerceId || loading) return;

        const commerceFromContext = commerces?.find(c => c._id === commerceId || c.slug === commerceId);

        if (commerceFromContext) {
            console.log("✅ Comercio encontrado:", commerceFromContext);
            setSelectedCommerce(commerceFromContext);

            if (!commerceFromContext.products || commerceFromContext.products.length === 0) {
                refreshCommerce();
            }
        } else {
            console.log("🔄 Comercio no encontrado en contexto, buscando en API...");
            refreshCommerce();
        }
    }, [commerceId, commerces, loading]);


    useEffect(() => {
        if (!selectedCommerce) return;
        const updated = commerces?.find(c => c._id === selectedCommerce._id);
        if (updated && updated !== selectedCommerce) {
            setSelectedCommerce(updated);
        }
    }, [commerces]);

    // ✅ Estado de carga
    if (loading || !selectedCommerce) {
        return (
            <div className="flex items-center justify-center min-h-screen text-[var(--color-burdeos-light)]">
                <h1 className="text-2xl font-semibold animate-pulse">
                    Cargando comercio...
                </h1>
            </div>
        );
    }

    const { name, description, address, products } = selectedCommerce;

    return (
        <div className="min-h-screen bg-[var(--color-gray-warm)] py-12 px-6 flex flex-col gap-14">
            <button
                onClick={() => navigate(-1)}
                className="self-start px-6 py-2 bg-[var(--color-burdeos-dark)] text-[var(--color-mostaza-pastel)] rounded-full shadow-md hover:bg-[var(--color-burdeos-light)] hover:scale-105 transition-all font-semibold"
            >
                ← Volver
            </button>

            <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col md:flex-row gap-6 border border-[var(--color-burdeos-light)] hover:shadow-2xl transition-all duration-300">
                {(selectedCommerce.image || selectedCommerce.images?.[0]) && (
                    <img
                        src={
                            (selectedCommerce.image || selectedCommerce.images?.[0]).startsWith("http")
                                ? (selectedCommerce.image || selectedCommerce.images?.[0])
                                : selectedCommerce.image?.startsWith("/images/")
                                    ? selectedCommerce.image
                                    : `/commerces/${selectedCommerce.images?.[0] || selectedCommerce.image}`
                        }
                        alt={name}
                        className="w-full md:w-1/2 h-70 object-cover rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300"
                    />
                )}

                <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-burdeos-dark)]">
                            {name}
                        </h1>
                        <p className="text-[var(--color-burdeos-darker)] text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-[var(--color-burdeos-darker)] mt-8 text-sm md:text-base">
                        <p><span className="font-semibold text-[var(--color-burdeos-dark)]">📍 Calle:</span> {address.street}</p>
                        <p><span className="font-semibold text-[var(--color-burdeos-dark)]">🏙️ Ciudad:</span> {address.city}</p>
                        <p><span className="font-semibold text-[var(--color-burdeos-dark)]">📞 Teléfono:</span> {address.phone}</p>
                        <p><span className="font-semibold text-[var(--color-burdeos-dark)]">📧 Email:</span> {address.email}</p>
                        <p className="sm:col-span-2"><span className="font-semibold text-[var(--color-burdeos-dark)]">🕒 Horario:</span> {address.schedule}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-10 border border-[var(--color-burdeos-light)]">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-burdeos-dark)] border-b-2 border-[var(--color-burdeos-light)] pb-2">
                        Productos
                    </h2>
                </div>

                {products?.length > 0 ? (
                    <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="group bg-white rounded-2xl shadow-md border border-[var(--color-burdeos-light)] overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                {product.images?.[0] && (
                                    <div className="w-full h-44 overflow-hidden">
                                        <img
                                            src={
                                                product.images[0].startsWith("http")
                                                    ? product.images[0]
                                                    : product.images[0].startsWith("/products/")
                                                        ? product.images[0]
                                                        : `/products/${product.images[0]}`
                                            }
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-base font-semibold text-[var(--color-burdeos-dark)] truncate">
                                            {product.name}
                                        </h3>
                                        <p className="text-[var(--color-burdeos-light)] font-bold mt-1 text-sm">
                                            {product.price.toFixed(2)} €
                                        </p>
                                    </div>

                                    <div className="mt-3 flex justify-end gap-2">
                                        <FavoriteButton product={product} />
                                        <CartButton product={product}/>
                                    </div>

                                    
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-[var(--color-burdeos-darker)] text-center mt-6">
                        No hay productos disponibles por el momento.
                    </p>
                )}
            </div>

            {(address?.mapUrl || (address?.street && address?.city)) && (
                <section className="py-10 px-6 w-full max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[var(--color-burdeos-dark)] border-b-2 border-[var(--color-burdeos-light)] inline-block pb-1">
                        Ubicación del comercio
                    </h2>

                    <div className="w-full h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                        <iframe
                            src={
                                address.mapUrl
                                    ? address.mapUrl
                                    : `https://www.google.com/maps?q=${encodeURIComponent(`${address.street}, ${address.city}`)}&output=embed`
                            }
                            className="w-full h-full border-0"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Ubicación de ${name}`}
                        ></iframe>
                    </div>
                </section>
            )}

            <Outlet context={{ selectedCommerce, refreshCommerce, commerceId }} />
        </div>
    );
};
