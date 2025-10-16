import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CommerceProvider } from './core/commerce/CommerceContext.jsx';
import { ProductProvider } from './core/products/ProductContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { FavoritesProvider } from './contexts/FavoritesContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <CommerceProvider>
            <ProductProvider>
              <FavoritesProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </FavoritesProvider>
            </ProductProvider>
          </CommerceProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
