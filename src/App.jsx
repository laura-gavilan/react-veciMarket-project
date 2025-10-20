import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { AboutUsPage } from './pages/AboutUsPage';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { Footer } from './components/Footer';
import { CommercePage } from './pages/CommercePage';
import { CreateCommercePage } from './pages/CreateCommercePage.jsx';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';
import { CommerceDetailPage } from './pages/CommerceDetailPage';
import { AdminDetailPage } from './pages/AdminDetailsPage';
import { CreateProductPage } from './pages/CreateProductPage.jsx';
import { EditProductPage } from './pages/EditProductPage.jsx';
import { EditCommercePage } from './pages/EditCommercePage.jsx';
import { UserPage } from './pages/UserPage.jsx';
import { EditUserPage } from './pages/EditUserPage.jsx';
import { FavoritesPage } from './pages/FavoritesPage.jsx';
import { ScrollToTop } from './components/ScrollToTop.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { OrdersPage } from './pages/OrdersPage.jsx';

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <ScrollToTop />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/commerce" element={<CommercePage />} />
          <Route path="/commerce/:commerceId" element={<CommerceDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/commerce/:commerceId" element={<AdminDetailPage />} />
            <Route path="/admin/commerce/:commerceId/edit" element={<EditCommercePage />} />
            <Route path="/admin/commerce/:commerceId/create" element={<CreateProductPage />} />
            <Route path="/admin/commerce/:commerceId/edit/:productId" element={<EditProductPage />} />

            <Route path="/user" element={<UserPage />} />
            <Route path="/user/edit" element={<EditUserPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />

            <Route path="/commerce/new" element={<CreateCommercePage />} />
          </Route>

          <Route path="*" element={<h2 className="text-center mt-10">Página no encontrada</h2>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

