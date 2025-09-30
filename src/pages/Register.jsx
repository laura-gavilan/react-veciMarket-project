import { useState } from "react";
import { useAuth } from "../core/auth/useAuth";
import { Container } from "../components/Container";


const INITIAL_FORM = { firstName: "", lastName: "", name: "", email: "", password: "", bio: "", phoneNumber: "", address: "", role:"" };

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
            text: "Rol (admin/user)",
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
        register(form);
        setForm(INITIAL_FORM);
    };

    return (
        <Container className="flex items-center justify-center min-h-[70vh] max-w-element-width-md">
            <div className="flex items-center justify-center min-h-screen bg-white px-6">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
                    <h2 className="text-3xl font-extrabold text-center mb-10 text-violet-800">Crea tu cuenta</h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        onSubmit={onRegisterSubmit} >
                        {REGISTER_FORM.map(({ input, label }) => (
                            <div key={input.name} className="flex flex-col text-left">
                                <input className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={form[input.name]}
                                    onChange={onInputChange}
                                    required={input.required}
                                />
                                <label className="text-sm font-medium text-gray-700 mb-1">{label.text}</label>
                            </div>
                        ))}

                        <div className="pt-6 flex justify-center ">
                            <button type="submit" className="px-8 py-3 bg-violet-700 text-white font-semibold rounded-full hover:bg-violet-600 transition-all duration-300 shadow-md">
                                Regístrate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
};
