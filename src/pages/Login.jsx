import { useState } from "react";
import { useAuth } from "../core/auth/useAuth";
import { Container } from "../components/Container";

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
        <Container className="flex items-center justify-center min-h-[70vh] max-w-element-width-md">
            <div className="flex items-center justify-center min-h-screen bg-white px-6">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10">
                    <h2 className="text-3xl font-extrabold text-center mb-10 text-violet-800">
                        Inicia sesión
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {LOGIN.map(({ input }) => (
                            <div key={input.name} className="flex flex-col text-left">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    {input.label}
                                </label>
                                <input
                                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={form[input.name]}
                                    onChange={handleChange}
                                    required={input.required}
                                />
                            </div>
                        ))}

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="mt-4 w-full bg-violet-700 text-white py-3 rounded-full font-semibold hover:bg-violet-600 transition-all duration-300 shadow-md"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </Container>
    );
};