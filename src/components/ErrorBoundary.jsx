import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }


    static getDerivedStateFromError(error) {
        console.log("Error Boundary:", error);
        return { hasError: true };
    }


    componentDidCatch(error, info) {
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