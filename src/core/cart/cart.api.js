import { api } from "../http/axios.js";

// Crear carrito vacío
export const createCartApi = async () => {
	const response = await api.post("/carts", {
		items: [],
		status: "active",
	});
	return response.data;
};

// Obtener todos los carritos (opcional)
export const getCartsApi = async () => {
	const response = await api.get("/carts");
	return response.data;
};

// Actualizar carrito existente
export const updateCartApi = async (cartId, items) => {
	console.log(`PATCH /carts/${cartId}`, { items });

	const response = await api.patch(`/carts/${cartId}`, {
		items,
		status: "active",
	});

	console.log("Carrito actualizado:", response.data);
	return response.data;
};

// Eliminar carrito
export const deleteCartApi = async (cartId) => {
	const response = await api.delete(`/carts/${cartId}`);
	return response.data;
};