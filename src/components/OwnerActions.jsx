import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom"
import { useTranslate } from "../translations/locales/useTranslate";

export const OwnerActions = memo(({ commerceId, onDelete }) => {
    const navigate = useNavigate();

    const onClickEditCommerce = useCallback((id) => navigate(`/admin/commerce/${id}/edit`), []);
    const onClickCreateProduct = useCallback((id) => navigate(`/admin/commerce/${id}/create`), []);
    const { t } = useTranslate();

    const buttons = useMemo(() => {
        return (
            <div className="flex flex-wrap gap-4 mt-4">
                <button
                    onClick={() => onClickEditCommerce(commerceId)}
                    className="px-5 py-2 rounded-full font-semibold bg-primary-dark text-accent-primary-light hover:bg-primary-light hover:scale-105 transition-all shadow-md"
                >
                    {t("commerces.edit_commerce")}
                </button>

                <button
                    onClick={() => onClickCreateProduct(commerceId)}
                    className="px-5 py-2 rounded-full font-semibold bg-accent-primary-light text-primary-dark hover:bg-accent-primary hover:scale-105 transition-all shadow-md"
                >
                    {t("commerces.create_product")}
                </button>

                <button
                    onClick={onDelete}
                    className="px-5 py-2 rounded-full font-semibold bg-primary-light text-white hover:bg-primary-dark hover:scale-105 transition-all shadow-md"
                >
                    {t("commerces.delete_commerce")}
                </button>
            </div>
        )
    }, [commerceId, onDelete, onClickCreateProduct, onClickEditCommerce]);

    return buttons;
});