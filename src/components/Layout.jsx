

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* <header className="w-full sticky top-0 z-50 shadow-md">
                <NavBar />
            </header> */}

            <main className="flex-1 pt-24 md:pt-28">
                {children}
            </main>

            <footer className="w-full text-center py-4 text-gray-500 text-sm">
                © 2025 VeciMarket. Todos los derechos reservados.
            </footer>
        </div>
    );
};

