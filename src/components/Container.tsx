import type { ChildrenProps } from "../types/types";

export const Container = ({ children, className = "" }: ChildrenProps) => {
    return <div className={`max-w-[1290px] mx-auto px-md ${className}`}>{children}</div>;
};