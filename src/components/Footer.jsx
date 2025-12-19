import { Link } from "react-router-dom";
import { useTranslate } from "../translations/locales/useTranslate";

export const Footer = () => {
    const { t }= useTranslate();
    return (
        <footer className="bg-secondary text-accent-primary py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h2 className="text-2xl font-title font-semibold text-primary-dark mb-4">
                        VeciMarket
                    </h2>
                    <p className="text-primary">
                        {t("footer.title")}
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary-dark">{t("footer.links.title")}</h3>
                    <ul className="space-y-2 text-primary">
                        <li>
                            <Link to="/" className="hover:text-primary-dark transition-colors">{t("footer.links.home")}</Link>
                        </li>
                        <li>
                            <Link to="/commerce" className="hover:text-primary-dark transition-colors">{t("footer.links.commerces")}</Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:text-primary-dark transition-colors">{t("footer.links.register")}</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-primary-dark transition-colors">{t("footer.links.contact")}</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary-dark">{t("footer.contact_networks.title")}</h3>
                    <p className="mb-4 text-primary">{t("footer.contact_networks.email")} <a href="mailto:contacto@vecimarket.com" className=" text-primary hover:text-primary-dark transition-colors">contacto@vecimarket.com</a></p>
                </div>
            </div>

            <div className="mt-8 border-t border-primary-light pt-4 text-center text-sm text-primary-dark/70">
                © 2025 <span className="font-title font-semibold text-primary-dark">VeciMarket</span>. {t("footer.reserved_rights")}
            </div>
        </footer>
    );
};
