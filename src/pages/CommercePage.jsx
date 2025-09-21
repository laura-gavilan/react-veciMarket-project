import { commerceData } from "../../db";

export const CommercePage = () => {
    return (
        <div className="p-6">
            {commerceData.map((category) => (
                <div key={category.category} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                    {category.stores.map((store) => (
                        <div key={store.name} className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
                            <div className="grid-grid-cols-2 md:grid-cols-4 gap-4">
                                {store.products.map((product) => (
                                    <div key={product.name} className="border p-4 rounded shadow">
                                        {/* <img src="" alt="" /> */}
                                        <h4 className="font-bold">{product.name}</h4>
                                        <p className="text-sm text-gray-600">{product.description}</p>
                                        <p className="font-semibold mt-1">€{product.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

