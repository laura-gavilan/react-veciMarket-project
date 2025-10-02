import { useContext, useEffect, useState } from "react";
import { api } from "../core/http/axios";
import { CommerceContext } from "../contexts/CommerceContext";
import { useNavigate } from "react-router-dom";

export const CommercePage = () => {
    const {commerces} = useContext(CommerceContext); 
    // const [commerces, setCommerces] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredCommerces, setFilteredCommerces] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     fetchCommerces();
    // }, []);

    useEffect(() => {
        const filtered = commerces.filter((commerce) =>
            commerce.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCommerces(filtered);
    }, [search, commerces]);

    // const fetchCommerces = async () => {
    //     try {
    //         const response = await api.get("/commerces");
    //         setCommerces(response.data);
    //         setFilteredCommerces(response.data);
    //     } catch (error) {
    //         console.error("Error al cargar los comercios", error);
    //     }
    // };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-violet-900 text-center">
                Explora los comercios de tu barrio
            </h1>

            <div className="mb-6 w-full md:w-1/2">
                <input
                    type="text"
                    placeholder="Buscar comercio..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full px-4 py-2 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:border-transparent shadow-sm"
                />
            </div>

            
            <div className="grid md:grid-cols-2 gap-6 justify-center w-full">
                {filteredCommerces.length > 0 ? (
                    filteredCommerces.map((commerce) => (
                        <div
                            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300"
                            key={commerce._id || commerce.slug}
                        >
                            <h2 onClick={() => navigate(`/commerce/${commerce._id}`)} className="text-2xl font-bold text-violet-900 text-center">{commerce.name}</h2>
                            <p className="text-gray-600 italic text-center">{commerce.description}</p>

                            <div className="mt-2 space-y-1 text-gray-700">
                                <p><span className="font-semibold">Slug:</span> {commerce.slug}</p>
                                <p><span className="font-semibold">Calle:</span> {commerce.address.street}</p>
                                <p><span className="font-semibold">Ciudad:</span> {commerce.address.city}</p>
                                <p><span className="font-semibold">Teléfono:</span> {commerce.address.phone}</p>
                                <p><span className="font-semibold">Email:</span> {commerce.address.email}</p>
                                <p><span className="font-semibold">Horario:</span> {commerce.address.schedule}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-2 text-center text-gray-500">No se encontraron comercios.</p>
                )}
            </div>
        </div>
    );
};