import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { AboutUsPage } from './pages/AboutUsPage';
import { Register } from './pages/Register';

export const App = () => {
  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/aboutUs" element={<AboutUsPage />} />
          {/* <Route path="/commerce" element={<CommercePage />} /> */}
          {/* <Route path="/products" element={<ProductsPage />} /> */}
          <Route path="/register" element={<Register />} />


        </Routes>
      </main>

      <footer></footer>


    </div>
  );
};


