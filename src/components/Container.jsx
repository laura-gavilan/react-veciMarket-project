export const Container = ({ children, className = "" }) => {
    return <div className={`max-w-[1290px] mx-auto px-md ${className}`}>{children}</div>;
};