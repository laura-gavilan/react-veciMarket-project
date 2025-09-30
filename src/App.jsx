import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { AboutUsPage } from './pages/AboutUsPage';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { Footer } from './components/Footer';
import { CommercePage } from './pages/CommercePage';
import { CreateCommercePage } from './components/CreateCommercePage';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';


export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/commerce" element={<CommercePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/commerce/new" element={<CreateCommercePage />} />
          </Route>

          <Route path="*" element={<h2 className="text-center mt-10">Página no encontrada</h2>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};


