import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CommerceProvider } from './contexts/CommerceContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CommerceProvider>
          <App />
        </CommerceProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
