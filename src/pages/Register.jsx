import { useState } from "react";
import { useAuth } from "../core/auth/useAuth";
import { Container } from "../components/Container";

const INITIAL_FORM = { firstName: "", lastName: "", name: "", email: "", password: "", bio: "", phoneNumber: "", address: "", role: "" };

const REGISTER_FORM = [
    { input: { name: "username", type: "text", placeholder: "testuser", required: true }, label: { text: "Nombre de usuario" } },
    { input: { name: "name", type: "text", placeholder: "María", required: true }, label: { text: "Nombre" } },
    { input: { name: "firstName", type: "text", placeholder: "López", required: true }, label: { text: "Primer apellido" } },
    { input: { name: "lastName", type: "text", placeholder: "Sáez", required: true }, label: { text: "Segundo apellido" } },
    { input: { name: "email", type: "email", placeholder: "maria@example.com", required: true }, label: { text: "Correo electrónico" } },
    { input: { name: "password", type: "password", placeholder: "Debe contener al menos 6 caracteres", required: true }, label: { text: "Contraseña" } },
    { input: { name: "bio", type: "text", placeholder: "Escribe tus preferencias", required: false }, label: { text: "Biografía" } },
    { input: { name: "phoneNumber", type: "tel", placeholder: "+34 600000000", required: true }, label: { text: "Número de teléfono" } },
    { input: { name: "address", type: "text", placeholder: "Dirección", required: true }, label: { text: "Dirección" } },
    { input: { name: "role", type: "text", placeholder: "user", required: true }, label: { text: "Rol (admin/user)" } },
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
        <Container className="flex items-center justify-center min-h-[140vh] px-6 py-16">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-[var(--color-burdeos-light)] p-10 md:p-16 transition-all">
                <h2 className="text-4xl md:text-5xl font-title font-semibold text-center mb-12 text-[var(--color-burdeos-dark)]">
                    Crea tu cuenta
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={onRegisterSubmit}>
                    {REGISTER_FORM.map(({ input, label }) => (
                        <div key={input.name} className="relative flex flex-col">
                            <input
                                name={input.name}
                                type={input.type}
                                placeholder=" "
                                value={form[input.name]}
                                onChange={onInputChange}
                                required={input.required}
                                className="peer border border-[var(--color-burdeos-light)] rounded-3xl px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-mostaza)] transition-all shadow-sm"
                            />
                            <label className="absolute left-4 top-2 text-[var(--color-burdeos-dark)] text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-[var(--color-burdeos-dark)] peer-focus:text-sm">
                                {label.text}
                            </label>
                        </div>
                    ))}

                    <div className="md:col-span-2 flex justify-center pt-4">
                        <button
                            type="submit"
                            className="px-10 py-3 bg-gradient-to-r from-[var(--color-mostaza)] via-[var(--color-mostaza-pastel)] to-[var(--color-burdeos-light)] text-[var(--color-burdeos-dark)] font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                            Regístrate
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm mt-6 text-[var(--color-burdeos-dark)]">
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className="text-[var(--color-burdeos-light)] font-semibold hover:underline">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </Container>
    );
};

