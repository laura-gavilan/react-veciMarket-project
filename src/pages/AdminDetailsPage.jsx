import { useContext, useEffect } from "react";
import { useParams, useNavigate, Outlet, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useProduct } from "../contexts/ProductContext";
import { CommerceContext } from "../contexts/CommerceContext";

export const AdminDetailPage = () => {
    const { commerces, fetchCommerces } = useContext(CommerceContext);
    const { user } = useContext(AuthContext);
    const { products, loadProducts, deleteProduct } = useProduct();
    const { commerceId } = useParams();
    const navigate = useNavigate();

    const selectedCommerce = commerces.find((c) => c._id === commerceId);

    useEffect(() => {
        fetchCommerces();
    }, [fetchCommerces]);

    useEffect(() => {
        if (selectedCommerce) loadProducts(selectedCommerce._id);
    }, [selectedCommerce]);

    if (!selectedCommerce) return <div><h1>No se encuentra el comercio</h1></div>;

    const isOwner = user?._id === selectedCommerce?.ownerUserId?._id;

    const handleEditCommerce = () => navigate(`edit`);
    const handleCreateProduct = () => navigate(`create`);

    // Callback que se pasará a hijos para refrescar productos
    const refreshProducts = () => loadProducts(selectedCommerce._id);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{selectedCommerce.name}</h1>
            <p>{selectedCommerce.description}</p>

            {isOwner && (
                <div className="mt-4 flex gap-2">
                    <button onClick={handleEditCommerce} className="btn btn-primary">
                        Editar Comercio
                    </button>
                    <button onClick={handleCreateProduct} className="btn btn-success">
                        Crear Producto
                    </button>
                </div>
            )}

            <h2 className="mt-6 text-xl font-semibold">Productos</h2>
            <ul className="mt-2">
                {products.length > 0 ? (
                    products
                        .filter((p) => p.commerceId === selectedCommerce._id)
                        .map((p) => (
                            <li key={p._id} className="flex justify-between items-center border-b py-1">
                                <span>{p.name}</span>
                                <div className="flex gap-2">
                                    <Link to={`edit/${p._id}`} className="btn btn-sm btn-primary">Editar</Link>
                                    <button className="btn btn-sm btn-danger" onClick={() => {
                                        deleteProduct(p._id);
                                        refreshProducts();
                                    }}>
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))
                ) : (
                    <p>No hay productos aún</p>
                )}
            </ul>

            {/* Rutas hijas */}
            <Outlet context={{ refreshProducts, selectedCommerce }} />
        </div>
    );
};