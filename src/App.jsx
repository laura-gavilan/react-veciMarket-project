import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { PrivateRoute } from './components/PrivateRoute';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop.jsx';
import { useAuth } from './core/auth/useAuth.jsx';
import { PageSpinner } from './components/PageSpinner.jsx';
import { AuthError } from './components/AuthError.jsx';
import { PageError } from './components/PageError.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.js';
import { lazy, Suspense } from 'react';



const Home = lazy(() => import("./pages/Home"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const CommercePage = lazy(() => import("./pages/CommercePage"));
const CommerceProductPage = lazy(() => import("./pages/CommerceProductPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage"));


const AdminPage = lazy(() => import("./pages/AdminPage"));
const CommerceDetailsAdminPage = lazy(() => import("./pages/CommerceDetailsAdminPage.jsx"));
const EditCommercePage = lazy(() => import("./pages/EditCommercePage.jsx"));
const CreateProductPage = lazy(() => import("./pages/CreateProductPage.jsx"));
const EditProductPage = lazy(() => import("./pages/EditProductPage.jsx"));


const UserPage = lazy(() => import("./pages/UserPage.jsx"));
const EditUserPage = lazy(() => import("./pages/EditUserPage.jsx"));
const CreateCommercePage = lazy(() => import("./pages/CreateCommercePage.jsx"));
const OrdersPage = lazy(() => import("./pages/OrdersPage.jsx"));



export const App = () => {
  const { isLoading, error, clearError } = useAuth();

  if (isLoading) {
    return <PageSpinner message="Cargando aplicación..." fullPage />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AuthError error={error} onClear={clearError} onRetry={() => window.location.reload()} />
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <ScrollToTop />

      <main className="flex-1">
        <ErrorBoundary
          fallback={
            <PageError
              title="Error en la navegación de la app"
              message="Ha ocurrido un error al cargar la página, Por favor, inténtelo de nuevo."
              onRetry={() => window.location.reload()}
              fullpage
            />
          }>
          <Suspense
            fallback={<PageSpinner
              message="Cargando página..."
              fullPage
            />
            }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutUs" element={<AboutUsPage />} />
              <Route path="/commerce" element={<CommercePage />} />
              <Route path="/commerce/:commerceId" element={<CommerceProductPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />

              <Route element={<PrivateRoute />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/commerce/:commerceId" element={<CommerceDetailsAdminPage />} />
                <Route path="/admin/commerce/:commerceId/edit" element={<EditCommercePage />} />
                <Route path="/admin/commerce/:commerceId/create" element={<CreateProductPage />} />
                <Route path="/admin/commerce/:commerceId/edit/:productId" element={<EditProductPage />} />

                <Route path="/user" element={<UserPage />} />
                <Route path="/user/edit" element={<EditUserPage />} />


                <Route path="/commerce/new" element={<CreateCommercePage />} />
                <Route path="/orders" element={<OrdersPage />} />

              </Route>

              <Route path="*" element={<h2 className="text-center mt-10">Página no encontrada</h2>} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};

