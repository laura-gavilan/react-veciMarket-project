import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { AboutUsPage } from './pages/AboutUsPage';
import { Register } from './pages/Register';
import { ProductsPage } from './pages/ProductsPage';
import { Login } from './pages/Login';

export const App = () => {
  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/aboutUs" element={<AboutUsPage />} />
          {/* <Route path="/commerce" element={<CommercePage />} /> */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />


        </Routes>
      </main>

      <footer></footer>


    </div>
  );
};


