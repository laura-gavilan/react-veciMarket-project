import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { ProductsPage } from './pages/ProductsPage';
import { Home } from './pages/Home';
import { AboutUsPage } from './pages/AboutUsPage';
import { CommercePage } from './pages/CommercePage';

export const App = () => {
  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/commerce" element={<CommercePage />} />
          <Route path="/products" element={<ProductsPage />} />

        </Routes>
      </main>

      <footer></footer>


    </div>
  );
};


