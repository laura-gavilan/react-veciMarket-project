import { useCallback, useRef, useState } from "react";
import { useAuth } from "../core/auth/useAuth";
import { Container } from "../components/Container";
import { Link } from "react-router-dom";
import { AuthError } from "../components/AuthError";
import { useTranslate } from "../translations/locales/useTranslate";

const INITIAL_FORM = { email: "", password: "" };


const Login = () => {
    const { login } = useAuth();
    const [form, setForm] = useState(INITIAL_FORM);
    const [error, setError] = useState(null);
    const emailRef = useRef(null);
    const { t } = useTranslate();

    const LOGIN = [
        {
            input: {
                name: "email",
                type: "email",
                placeholder: t("pages.login.form.email.placeholder"),
                label: t("pages.login.form.email.label"),
                required: true,
            },
        },
        {
            input: {
                name: "password",
                type: "password",
                placeholder: t("pages.login.form.password.placeholder"),
                label: t("pages.login.form.password.label"),
                required: true,
            },
        },
    ];

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        setError(null);

        try {
            await login(form);
            setForm(INITIAL_FORM);
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            setError(error.response?.data?.message || "Correo o contraseña incorrectos");
            emailRef.current.focus();
        }
    }, [login, form]);

    return (
        <Container className="flex items-center justify-center min-h-[70vh]">
            <div className="flex items-center justify-center min-h-screen w-full px-6 bg-gradient-to-b from-gray-50 via-gray-100 to-white">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-primary-dark">
                        {t("pages.login.title")}
                    </h2>

                    <AuthError
                        error={error}
                        onRetry={() => setError(null)}
                        onClear={() => setError(null)} />

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {LOGIN.map(({ input }) => (
                            <div key={input.name} className="flex flex-col text-left">
                                <label className="text-sm font-semibold mb-1 text-primary-dark">
                                    {input.label}
                                </label>
                                <input
                                    ref={input.name === "email" ? emailRef : null}
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={form[input.name]}
                                    onChange={handleChange}
                                    required={input.required}
                                    className="w-full px-4 py-3 border rounded-xl border-primary-light focus:outline-none focus:ring-2 focus:ring-gradient-burdeos-mostaza transition-all duration-300"
                                />
                            </div>
                        ))}

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="mt-4 w-full py-3 rounded-full font-semibold text-white bg-accent-primary shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                        >
                            {t("pages.login.enter")}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-6 text-primary-dark">
                        {t("pages.login.question_register")}{" "}
                        <Link to="/register" className="text-primary-light font-semibold hover:underline">
                            {t("pages.login.register")}
                        </Link>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default Login;