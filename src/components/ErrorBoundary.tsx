import React, { type ErrorInfo, type ReactNode } from "react";


export type ErrorBoundaryProps = {
    fallback: ReactNode;
    children: ReactNode;
};

export type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }


    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        console.log("Error Boundary:", error);
        return { hasError: true };
    }


    componentDidCatch(error:Error, info:ErrorInfo) {
        console.error("Error capturado por ErrorBoundary:", error, info);
    }

    render() {
        const { hasError } = this.state;
        const { fallback, children } = this.props;

        if (hasError) {
            if (fallback) {
                return fallback;
            }
            return <p>Ha ocurrido un error en esta sección.</p>;
        }

        return children;
    }
};