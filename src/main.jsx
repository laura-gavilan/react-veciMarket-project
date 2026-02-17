import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CommerceProvider } from './core/commerce/CommerceContext.jsx';
import { ProductProvider } from './core/products/ProductContext.js';
import { UserProvider } from './contexts/UserContext.jsx';
import { FavoritesProvider } from './contexts/FavoritesContext.jsx';
import { CartProvider } from './contexts/CartContext';
import { OrdersProvider } from './contexts/OrdersContext.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.js';
import { PageError } from './components/PageError.jsx';
import "./translations/i18n.js";

createRoot(document.getElementById('root')).render(
  <ErrorBoundary
    fallback={
      <PageError
        title="Error en la aplicación"
        message="Ha ocurrido un error. Por favor, recarga la página."
        onRetry={() => window.location.reload()}
        retryText="Recargar la página"
        fullPage />
    }>
      
    <StrictMode>
      <BrowserRouter>
        <UserProvider>
          <AuthProvider>
            <CommerceProvider>
              <ProductProvider>
                <OrdersProvider>
                  <CartProvider>
                    <FavoritesProvider>
                      <App />
                    </FavoritesProvider>
                  </CartProvider>
                </OrdersProvider>
              </ProductProvider>
            </CommerceProvider>
          </AuthProvider>
        </UserProvider>
      </BrowserRouter>
    </StrictMode>
  </ErrorBoundary>
);
