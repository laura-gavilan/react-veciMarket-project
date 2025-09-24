import { useEffect, useState } from "react"
import { api } from './../core/http/axios';



export const ProductsPage = () => {
    const [ products, setProducts ] = useState([]);

    useEffect (() => {
        api.get("/products")
        .then((response) => {
                console.log("response", response);
                console.log("Products data:", response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, [])

    return (
        <div>
            <h1>Productos</h1>

            <div>
                {products.map((product) => (
                    <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}