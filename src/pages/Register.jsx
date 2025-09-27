import { useState } from "react";
import { useAuth } from "../core/auth/useAuth";
import { Container } from "../components/Container";

const INITIAL_FORM = { firstName: "", lastName: "", name: "", email: "", password: "", bio: "", phoneNumber: "", address: "", role: "" };

const REGISTER_FORM = [
    {
        input: {
            name: "firstName",
            type: "text",
            placeholder: "López",
            required: true
        },
        label: {
            text: "Primer apellido",
        },
    },
    {
        input: {
            name: "lastName",
            type: "text",
            placeholder: "Sáez",
            required: true
        },
        label: {
            text: "Segundo apellido",
        },
    },
    {
        input: {
            name: "name",
            type: "text",
            placeholder: "María",
            required: true
        },
        label: {
            text: "Nombre",
        },
    },
    {
        input: {
            name: "email",
            type: "email",
            placeholder: "maria@example.com",
            required: true
        },
        label: {
            text: "Correo electrónico",
        },
    },
    {
        input: {
            name: "password",
            type: "password",
            placeholder: "Debe contener al menos 6 caracteres",
            required: true
        },
        label: {
            text: "Contraseña",
        },
    },
    {
        input: {
            name: "bio",
            type: "text",
            placeholder: "Escribe tus preferencias",
            required: false
        },
        label: {
            text: "Biografía",
        },
    },
    {
        input: {
            name: "phoneNumber",
            type: "tel",
            placeholder: "+34 600000000",
            required: true
        },
        label: {
            text: "Número de teléfono",
        },
    },
    {
        input: {
            name: "address",
            type: "text",
            placeholder: "Dirección",
            required: true,
        },
        label: {
            text: "Dirección",
        },
    },
    {
        input: {
            name: "role",
            type: "text",
            placeholder: "admin",
            label: "Rol (admin/user)",
            required: true,
        },
        label: {
            text: "Rol (commerce/user)",
        },
    },
];


export const Register = () => {
    const { register } = useAuth();
    const [form, setForm] = useState(INITIAL_FORM);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const onRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            await register(form);
            setForm(INITIAL_FORM);
        } catch (error) {
            console.error("Error en el registro", error);
        }
    };

    return (
        <Container className="flex items-center justify-center min-h-[70vh] max-w-element-width-md">
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Rellena el formulario para el registro</h2>

                    <form className="flex flex-col gap-5"
                        onSubmit={onRegisterSubmit} >
                        {REGISTER_FORM.map(({ input, label }) => (
                            <div key={input.name} className="text-sm flex-col gap-1">
                                <input className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={form[input.name]}
                                    onChange={onInputChange}
                                    required={input.required}
                                />
                                <label className="text-sm font-medium text-gray-700">{label.text}</label>
                            </div>
                        ))}

                        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
                            Regístrate
                        </button>
                    </form>
                </div>
            </div>
        </Container>
    );
};
