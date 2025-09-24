import { useState } from "react";
import { useAuth } from "../core/auth/useAuth";

const INITIAL_FORM = { email: "", password: "" };

const LOGIN = [
    {
        input: {
            name: "email",
            type: "email",
            placeholder: "example@example.com",
            label: "email",
            required: true,
        },
    },
    {
        input: {
            name: "password",
            type: "password",
            placeholder: "******",
            label: "Contraseña",
            required: true,
        },
    },
];


export const Login = () => {
    const { login } = useAuth();
    const [form, setForm] = useState(INITIAL_FORM);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            await login(form); 
            setForm(INITIAL_FORM);
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            setError(error.response?.data?.message || "Correo o contraseña incorrectos");
        }
    };


    return (
        <div className="flex items-centr justify-center bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit} className="w-full max-w-md bg-white dar:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-5">
                <h2 className="text-2xl font-bold text-center text-gray-800 dar:text-gray-100 mb-6">Iniciar sesión</h2>

                {LOGIN.map(({ input }) => (
                    <div key={input.name} className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{input.label}</label>

                        <input className="w-full px-4 py-2 border rounded-xl focus:ring-blue-500"
                            type={input.type}
                            name={input.name}
                            placeholder={input.placeholder}
                            value={form[input.name]}
                            onChange={handleChange}
                            required={input.required} />
                    </div>
                ))}

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl">Entrar</button>
            </form>
        </div>
    );
};