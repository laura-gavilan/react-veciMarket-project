import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../core/auth/useAuth";
import { Container } from "../components/Container";
import { Link } from "react-router-dom";
import { AuthError } from "../components/AuthError";
import { useTranslate } from "../translations/locales/useTranslate";


const INITIAL_FORM = { firstName: "", lastName: "", name: "", email: "", password: "", bio: "", phoneNumber: "", address: "", role: "" };


const Register = () => {
    const { register } = useAuth();
    const [form, setForm] = useState(INITIAL_FORM);
    const [error, setError] = useState(null);
    const usernameRef = useRef(null);
    const { t } = useTranslate();

    const REGISTER_FORM = [
    { input: { name: "username", type: "text", placeholder: t("pages.register.form.username.placeholder"), required: true }, label: { text: t("pages.register.form.username.label") } },
    { input: { name: "name", type: "text", placeholder: t("pages.register.form.name.placeholder"), required: true }, label: { text: t("pages.register.form.name.label") } },
    { input: { name: "firstName", type: "text", placeholder: t("pages.register.form.firstName.placeholder"), required: true }, label: { text: t("pages.register.form.firstName.label") } },
    { input: { name: "lastName", type: "text", placeholder: t("pages.register.form.lastName.placeholder"), required: true }, label: { text: t("pages.register.form.lastName.label") } },
    { input: { name: "email", type: "email", placeholder: t("pages.register.form.email.placeholder"), required: true }, label: { text: t("pages.register.form.email.label") } },
    { input: { name: "password", type: "password", placeholder: t("pages.register.form.password.placeholder"), required: true }, label: { text: t("pages.register.form.password.label") } },
    { input: { name: "phoneNumber", type: "tel", placeholder: t("pages.register.form.phoneNumber.placeholder"), required: true }, label: { text: t("pages.register.form.phoneNumber.label") } },
    { input: { name: "address", type: "text", placeholder: t("pages.register.form.address.placeholder"), required: true }, label: { text: t("pages.register.form.address.label") } },
    { input: { name: "role", type: "text", placeholder: t("pages.register.form.role.placeholder"), required: true }, label: { text: t("pages.register.form.role.label") } }
];

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const onRegisterSubmit = useCallback(async (event) => {
        event.preventDefault();
        register(form);
        setForm(INITIAL_FORM);
        usernameRef.current.focus();
    }, []);

    return (
        <Container className="flex items-center justify-center min-h-[140vh] px-6 py-6">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-primary-light p-10 md:p-16 transition-all">
                <h2 className="text-xl md:text-2xl font-title font-semibold text-center mb-8 text-primary-dark">
                    {t("pages.register.title")}
                </h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={onRegisterSubmit}>
                    {REGISTER_FORM.map(({ input, label }) => (
                        <div key={input.name} className="relative flex flex-col">
                            <input
                                ref={input.name === "username" ? usernameRef : null}
                                name={input.name}
                                type={input.type}
                                placeholder=" "
                                value={form[input.name]}
                                onChange={onInputChange}
                                required={input.required}
                                className="peer border border-primary-light rounded-2xl px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all shadow-sm"
                            />
                            <label className="absolute left-3 top-2 text-primary-dark text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-primary-dark peer-focus:text-sm">
                                {label.text}
                            </label>
                        </div>
                    ))}

                    <div className="md:col-span-2 flex justify-center pt-4">
                        <button
                            type="submit"
                            className="px-8 py-2 btn-primary rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                            {t("pages.register.button_register")}
                        </button>
                    </div>


                </form>

                <AuthError
                    error={error}
                    onRetry={() => setError(null)}
                    onClear={() => setError(null)} />

                <p className="text-center text-sm mt-4 text-primary-dark">
                    {t("pages.register.questions_login")}{" "}
                    <Link to="/login" className="text-primary-light font-semibold hover:underline">
                        {t("pages.register.login")}
                    </Link>
                </p>
            </div>
        </Container>
    );
};

export default Register;